"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Trash2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";

export type SubmissionImage = { id: string; name: string; mimeType: "image/jpeg"; dataUrl: string; byteSize: number };

const MAX_IMAGES = 3;
const MAX_IMAGE_BYTES = 1_200_000;
const MAX_TOTAL_BYTES = 3_200_000;
const MAX_DIMENSION = 1800;

function readDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.readAsDataURL(blob);
  });
}

async function prepareImage(file: File): Promise<SubmissionImage> {
  if (!(["image/jpeg", "image/png", "image/gif", "image/webp"] as string[]).includes(file.type)) throw new Error("unsupported");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("processing");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  let quality = 0.9;
  let blob: Blob | null = null;
  do {
    blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    quality -= 0.08;
  } while (blob && blob.size > MAX_IMAGE_BYTES && quality >= 0.5);
  if (!blob || blob.size > MAX_IMAGE_BYTES) throw new Error("large");
  return { id: crypto.randomUUID(), name: file.name.replace(/\.[^.]+$/, "") + ".jpg", mimeType: "image/jpeg", dataUrl: await readDataUrl(blob), byteSize: blob.size };
}

export default function ImageEvidenceUploader({ images, onChange, locale, onError }: { images: SubmissionImage[]; onChange: (images: SubmissionImage[]) => void; locale: Locale; onError: (message: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    if (images.length + files.length > MAX_IMAGES) { onError(pick(locale, { bn: "একসঙ্গে সর্বোচ্চ ৩টি ছবি দিতে পারবেন।", en: "You can attach up to 3 images." })); return; }
    setProcessing(true);
    try {
      const prepared: SubmissionImage[] = [];
      for (const file of Array.from(files)) prepared.push(await prepareImage(file));
      if ([...images, ...prepared].reduce((sum, image) => sum + image.byteSize, 0) > MAX_TOTAL_BYTES) throw new Error("total");
      onChange([...images, ...prepared]);
    } catch (error) {
      const code = error instanceof Error ? error.message : "processing";
      onError(code === "unsupported" ? pick(locale, { bn: "JPG, PNG, GIF বা WebP ছবি দিন।", en: "Please use a JPG, PNG, GIF, or WebP image." }) : code === "large" || code === "total" ? pick(locale, { bn: "ছবিগুলো একটু ছোট করে আবার দিন।", en: "Please use smaller images." }) : pick(locale, { bn: "ছবিটি প্রস্তুত করা যায়নি। আরেকটি ছবি চেষ্টা করুন।", en: "The image could not be prepared. Please try another one." }));
    } finally {
      setProcessing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return <div className="imageEvidence"><div className="imageEvidenceIntro"><div><ImagePlus/><span><b>{pick(locale,{bn:"খাতার ছবি দিতে চান?",en:"Add a photo of your work"})}</b><small>{pick(locale,{bn:"হাতে লেখা উত্তর বা ওয়ার্কশিটের পরিষ্কার ছবি দিন। AI শিক্ষক ছবির আরবিও দেখে মতামত দেবেন।",en:"Attach a clear photo of handwritten answers or a worksheet. Your AI teacher will evaluate the Arabic in the image too."})}</small></span></div><button type="button" disabled={processing || images.length >= MAX_IMAGES} onClick={() => inputRef.current?.click()}>{processing ? <><LoaderCircle className="spinnerIcon"/>{pick(locale,{bn:"ছবি তৈরি হচ্ছে…",en:"Preparing…"})}</> : <><ImagePlus/>{pick(locale,{bn:"ছবি যোগ করুন",en:"Add image"})}</>}</button><input ref={inputRef} hidden type="file" accept="image/jpeg,image/png,image/gif,image/webp" multiple onChange={(event) => void addFiles(event.target.files)}/></div>{images.length > 0 && <div className="imagePreviewGrid">{images.map((image) => <article key={image.id}><Image src={image.dataUrl} alt={image.name} width={360} height={240} unoptimized/><div><span>{image.name}</span><small>{(image.byteSize / 1024).toFixed(0)} KB</small></div><button type="button" onClick={() => onChange(images.filter((item) => item.id !== image.id))} aria-label={pick(locale,{bn:`${image.name} মুছুন`,en:`Remove ${image.name}`})}><Trash2/></button></article>)}</div>}<p className="imageEvidenceHint">{pick(locale,{bn:`সর্বোচ্চ ${images.length}/৩টি ছবি · পাঠানোর আগে ছবি ছোট করে নেওয়া হবে`,en:`${images.length}/3 images · images are optimized before upload`})}</p></div>;
}
