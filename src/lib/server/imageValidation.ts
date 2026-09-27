export function validImageData(image:{mimeType:string;dataUrl:string;byteSize:number}):boolean{
 const prefix=`data:${image.mimeType};base64,`;
 if(!image.dataUrl.startsWith(prefix))return false;
 const encoded=image.dataUrl.slice(prefix.length);
 if(!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded))return false;
 const bytes=Buffer.from(encoded,'base64');
 if(bytes.length!==image.byteSize||bytes.length>1_300_000||bytes.length<12)return false;
 switch(image.mimeType){
  case 'image/png':return bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  case 'image/jpeg':return bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
  case 'image/gif':return ['GIF87a','GIF89a'].includes(bytes.subarray(0,6).toString('ascii'));
  case 'image/webp':return bytes.subarray(0,4).toString('ascii')==='RIFF'&&bytes.subarray(8,12).toString('ascii')==='WEBP';
  default:return false;
 }
}
