import { test, expect, type Page } from "@playwright/test";

async function demo(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("arabic-coach-locale-v1", "en");
    localStorage.setItem("arabic-coach-tour-v1:local-demo", "completed");
  });
  await page.goto("/");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await page.getByRole("button", { name: /Explore as demo learner/ }).click();
  await expect(page.getByRole("heading", { name: /let’s make Arabic yours/ })).toBeVisible();
}

test("local demo retains drafts and never fabricates a score", async ({ page }) => {
  const calls: string[] = [];
  page.on("request", request => { if (/\/api\/tutor|\/rest\/v1\//.test(request.url())) calls.push(request.url()); });
  await demo(page);
  await page.getByRole("button", { name: "Start your diagnostic" }).click();
  await expect(page.getByText("15–20 min core", { exact: true })).toBeVisible();
  await expect(page.locator(".exerciseCard")).toHaveCount(0);
  await page.getByRole("button", { name: "Show extended lesson & AI review" }).click();
  const answer = page.locator("#exercise-1-0");
  await answer.fill("أريد أن أتعلم العربية");
  await page.getByRole("button", { name: "Submit to my teacher" }).click();
  await expect(page.getByText("No AI grading in demo", { exact: true })).toBeVisible();
  await expect(page.locator(".scoreCircle")).toHaveCount(0);
  await page.reload();
  await page.getByRole("button", { name: "Start your diagnostic" }).click();
  await page.getByRole("button", { name: "Show extended lesson & AI review" }).click();
  await expect(answer).toHaveValue("أريد أن أتعلم العربية");
  expect(calls).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("recall gives item-specific feedback and no mastery score", async ({ page }) => {
  await demo(page);
  const practice = page.getByRole("region", { name: "Quick recall practice" });
  await practice.getByRole("button", { name: "Start practice", exact: true }).click();
  await practice.getByLabel("Arabic answer", { exact: true }).fill("خطأ");
  await practice.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(practice.getByText(/Not yet/)).toBeVisible();
  const reviews = await page.evaluate(() => JSON.parse(localStorage.getItem("arabic-coach-recall-v1:local-demo") ?? "{}"));
  expect(Object.values(reviews)).toHaveLength(1);
  expect(Object.values(reviews)[0]).toMatchObject({ incorrect: 1, correct: 0 });
});

test("Bangla preview and microphone denial are understandable", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("arabic-coach-tour-v1:local-demo", "completed");
    if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = async () => { throw new DOMException("denied", "NotAllowedError"); };
  });
  await page.goto("/");
  await page.getByRole("button", { name: /আগে ডেমোটি দেখে নিন/ }).click();
  await page.getByRole("button", { name: "চলুন শুরু করি", exact: true }).click();
  await expect(page.getByText("১৫–২০ মিনিট: মূল session", { exact: true })).toBeVisible();
  await page.locator(".speakingPractice summary").click();
  await page.getByRole("button", { name: "রেকর্ড করুন", exact: true }).click();
  await expect(page.getByText(/মাইক্রোফোন পাওয়া যায়নি বা অনুমতি নেই/)).toBeVisible();
});

test("listening transcript stays hidden until explicitly revealed", async ({ page }) => {
  await demo(page);
  if (await page.getByRole("button", { name: "Open course menu", exact: true }).isVisible()) await page.getByRole("button", { name: "Open course menu", exact: true }).click();
  await page.locator(".phaseGroupHead").nth(1).click();
  await page.locator(".dayLink").filter({ hasText: "Listening clinic" }).click();
  await expect(page.locator(".passageLines")).toHaveCount(0);
  await page.getByRole("button", { name: "Listen first, then reveal transcript", exact: true }).click();
  await expect(page.locator(".passageLines")).toBeVisible();
});

test("onboarding supports keyboard Escape and focus containment", async ({ page }) => {
  await page.addInitScript(() => { localStorage.setItem("arabic-coach-locale-v1", "en"); });
  await page.goto("/");
  await page.getByRole("button", { name: /Explore as demo learner/ }).click();
  const dialog = page.getByRole("dialog", { name: "Arabic Coach guided tour" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  expect(await dialog.evaluate(node => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});

test("local check advances only after matching answers and survives reload", async ({page})=>{
 await demo(page);await page.getByRole('button',{name:'Start your diagnostic',exact:true}).click();
 const check=page.locator('.lessonCheckpoint');await check.getByRole('button',{name:'Start lesson check',exact:true}).click();
 await expect(check.getByRole('button',{name:'Check lesson answers',exact:true})).toBeDisabled();
 await check.getByRole('radio').nth(1).check();await check.getByRole('button',{name:'Check lesson answers',exact:true}).click();
 await expect(page.getByRole('button',{name:'Repair lesson 1 first',exact:true})).toBeVisible();
 await check.getByRole('button',{name:'Study then retry',exact:true}).click();await check.getByRole('radio').first().check();await check.getByRole('button',{name:'Check lesson answers',exact:true}).click();
 await expect(check.getByText(/All answers match/)).toBeVisible();await page.reload();await expect(page.getByText('1 of 400 days',{exact:true})).toBeVisible();
});

test("Quran path cites verses and freezes answers after checking",async({page})=>{
 await demo(page);await page.getByRole('button',{name:'Quran language',exact:true}).click();
 await expect(page.getByRole('link',{name:'Quran 1:1 ↗'})).toHaveAttribute('href','https://quran.com/1/1');
 await page.getByRole('radio').first().check();await page.getByRole('button',{name:'Check answer',exact:true}).click();
 await expect(page.getByText(/Correct. Explain why/)).toBeVisible();await expect(page.getByRole('radio').first()).toBeDisabled();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test("backup export is portable and invalid import does not replace records",async({page})=>{
 await demo(page);await page.getByText('Back up / transfer learning progress',{exact:true}).click();
 const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download JSON backup',exact:true}).click()]);
 expect(download.suggestedFilename()).toBe('arabic-learning-backup.json');
 const prior=await page.evaluate(()=>localStorage.getItem('arabic-coach-progress-v1:local-demo'));
 await page.getByLabel('Import your backup').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"version":999}')});
 await expect(page.getByText(/Could not import/)).toBeVisible();expect(await page.evaluate(()=>localStorage.getItem('arabic-coach-progress-v1:local-demo'))).toBe(prior);
});

test("advanced phase reading gives source-grounded feedback",async({page})=>{
 await demo(page);
 if(await page.getByRole('button',{name:'Open course menu',exact:true}).isVisible())await page.getByRole('button',{name:'Open course menu',exact:true}).click();
 await page.locator('.phaseGroupHead').nth(4).click();await page.locator('.dayLink').filter({hasText:'Idafa chains'}).first().click();
 const reading=page.locator('.readingPractice');await reading.getByLabel('Where is the book now?').fill('على الطاولة');await reading.getByRole('button',{name:'Check reading answer',exact:true}).click();await expect(reading.getByText('Answer matches.',{exact:true})).toBeVisible();
});

test("migration-free tutor fails closed without upstream requests",async({request})=>{
 const response=await request.post('/api/tutor',{data:{}});expect(response.status()).toBe(503);expect((await response.json()).error).toContain('paused');
});

test("alphabet drill requires playback and reports audio failure", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => Promise.reject(new Error("test audio unavailable"));
    if (window.speechSynthesis) window.speechSynthesis.getVoices = () => [];
  });
  await page.route("**/api/tts?**", route => route.fulfill({ status: 501, body: "unavailable" }));
  await demo(page);
  await page.getByRole("button", { name: "Start your diagnostic" }).click();
  await page.getByRole("button", { name: "Next lesson", exact: true }).click();
  const options = page.locator(".drillOption");
  await expect(options).toHaveCount(2);
  await expect(options.first()).toBeDisabled();
  await page.getByRole("button", { name: "Play sound", exact: true }).click();
  await expect(page.getByText(/Audio unavailable\. Retry when ready/)).toBeVisible();
  await expect(options.first()).toBeDisabled();
});
