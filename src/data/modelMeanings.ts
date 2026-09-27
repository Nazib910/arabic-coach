/**
 * modelMeanings.ts
 * English and Bengali translations for model sentences (Days 21–80)
 * Directly aligned to handcraftedRaw[day-1][5].split('|')
 * 60 days × 3 models = 180 translations
 */

export type ModelMeaning = {
  bn: string;  // Bengali translation
  en: string;  // English translation
};

export const modelMeanings: Record<number, ModelMeaning[]> = {
  // ========== Day 21: Present tense: I & you ==========
  21: [
    { en: "I study Arabic.", bn: "আমি আরবি পড়ি।" },
    { en: "You work at the school.", bn: "আপনি স্কুলে কাজ করেন।" },
    { en: "You (fem.) live here.", bn: "আপনি (মহিলা) এখানে থাকেন।" },
  ],
  // ========== Day 22: Present tense: he, she, they ==========
  22: [
    { en: "He works and she studies.", bn: "তিনি (পুরুষ) কাজ করেন এবং তিনি (মহিলা) পড়েন।" },
    { en: "They live in the city.", bn: "তারা শহরে বাস করে।" },
    { en: "The students read a lot.", bn: "শিক্ষার্থীরা অনেক পড়ে।" },
  ],
  // ========== Day 23: Present negation ==========
  23: [
    { en: "I never drink coffee.", bn: "আমি কখনো কফি পান করি না।" },
    { en: "She doesn't work on Friday.", bn: "তিনি শুক্রবার কাজ করেন না।" },
    { en: "Sometimes I study at night.", bn: "কখনো কখনো আমি রাতে পড়ি।" },
  ],
  // ========== Day 24: Question words ==========
  24: [
    { en: "Where do you live? — I live in…", bn: "আপনি কোথায় থাকেন? — আমি... এ থাকি।" },
    { en: "Why do you learn Arabic?", bn: "আপনি কেন আরবি শিখছেন?" },
    { en: "Do you drink tea? — Yes.", bn: "আপনি চা পান করেন কি? — হাঁ।" },
  ],
  // ========== Day 25: Daily routine ==========
  25: [
    { en: "I wake up at six o'clock.", bn: "আমি ছয়টায় জেগে উঠি।" },
    { en: "I have breakfast then I go.", bn: "আমি নাস্তা করি তারপর যাই।" },
    { en: "I sleep early usually.", bn: "আমি সাধারণত তাড়াতাড়ি ঘুমাই।" },
  ],
  // ========== Day 26: Week 3 checkpoint ==========
  26: [
    { en: "Describe your day in 8 sentences.", bn: "আপনার দিন 8টি বাক্যে বর্ণনা করুন।" },
    { en: "Write 6 questions and answers.", bn: "6টি প্রশ্ন এবং উত্তর লিখুন।" },
    { en: "Speak for a minute about your work.", bn: "আপনার কাজ সম্পর্কে এক মিনিট কথা বলুন।" },
  ],
  // ========== Day 27: Possession with iḍāfa ==========
  27: [
    { en: "This is the student's book.", bn: "এটি শিক্ষার্থীর বই।" },
    { en: "The door of the room is open.", bn: "ঘরের দরজা খোলা আছে।" },
    { en: "What is the name of your city?", bn: "আপনার শহরের নাম কি?" },
  ],
  // ========== Day 28: Places & my neighbourhood ==========
  28: [
    { en: "I go to the market on Saturday.", bn: "আমি শনিবার বাজারে যাই।" },
    { en: "The library is beside the garden.", bn: "লাইব্রেরি বাগানের পাশে আছে।" },
    { en: "There is a restaurant near my house.", bn: "আমার বাড়ির কাছে একটি রেস্তোরাঁ আছে।" },
  ],
  // ========== Day 29: Likes & preferences ==========
  29: [
    { en: "I love reading because it's useful.", bn: "আমি পড়া ভালোবাসি কারণ এটি উপকারী।" },
    { en: "I prefer tea over coffee.", bn: "আমি কফির চেয়ে চা বেশি পছন্দ করি।" },
    { en: "I don't like crowds.", bn: "আমি ভিড় পছন্দ করি না।" },
  ],
  // ========== Day 30: Family ==========
  30: [
    { en: "This is my father and his name is Karim.", bn: "এটি আমার পিতা এবং তার নাম করিম।" },
    { en: "My sister is a student at university.", bn: "আমার বোন বিশ্ববিদ্যালয়ের শিক্ষার্থী।" },
    { en: "My grandmother lives with us.", bn: "আমার দাদি আমাদের সাথে থাকেন।" },
  ],
  // ========== Day 31: Days & the weekend ==========
  31: [
    { en: "On Friday I rest.", bn: "শুক্রবার আমি বিশ্রাম করি।" },
    { en: "During the vacation I visit my friends.", bn: "ছুটির সময় আমি আমার বন্ধুদের দেখতে যাই।" },
    { en: "Sometimes I play football.", bn: "কখনো কখনো আমি ফুটবল খেলি।" },
  ],
  // ========== Day 32: Week 4 checkpoint ==========
  32: [
    { en: "Describe your family and your neighbourhood.", bn: "আপনার পরিবার এবং পাড়া বর্ণনা করুন।" },
    { en: "Say what you like and why.", bn: "আপনি কি পছন্দ করেন এবং কেন তা বলুন।" },
    { en: "Write 90 words about your week.", bn: "আপনার সপ্তাহ সম্পর্কে 90টি শব্দ লিখুন।" },
  ],
  // ========== Day 33: Shopping & prices ==========
  33: [
    { en: "How much is this?", bn: "এটি কত দামের?" },
    { en: "I want a kilo of apples.", bn: "আমি এক কিলো আপেল চাই।" },
    { en: "This is expensive, do you have something cheaper?", bn: "এটি দামি, আপনার কাছে কিছু সস্তা আছে?" },
  ],
  // ========== Day 34: Describing people ==========
  34: [
    { en: "My friend is tall and kind.", bn: "আমার বন্ধু লম্বা এবং দয়ালু।" },
    { en: "My teacher is intelligent and quiet.", bn: "আমার শিক্ষক বুদ্ধিমান এবং শান্ত।" },
    { en: "My brother is busy always.", bn: "আমার ভাই সবসময় ব্যস্ত থাকেন।" },
  ],
  // ========== Day 35: Feelings & states ==========
  35: [
    { en: "I am happy today.", bn: "আজ আমি খুশি।" },
    { en: "I feel tired a little.", bn: "আমি একটু ক্লান্ত অনুভব করছি।" },
    { en: "Are you hungry now?", bn: "আপনি এখন ক্ষুধার্ত?" },
  ],
  // ========== Day 36: Food & the restaurant ==========
  36: [
    { en: "I want a cup of tea.", bn: "আমি একটি কাপ চা চাই।" },
    { en: "Do you have rice?", bn: "আপনার কাছে চাল আছে?" },
    { en: "The bill, please.", bn: "বিল, অনুগ্রহ করে।" },
  ],
  // ========== Day 37: Listening clinic ==========
  37: [
    { en: "Listen to the idea first.", bn: "প্রথমে ধারণাটি শুনুন।" },
    { en: "Don't understand every word.", bn: "প্রতিটি শব্দ বুঝবেন না।" },
    { en: "Listen again then check.", bn: "আবার শুনুন তারপর যাচাই করুন।" },
  ],
  // ========== Day 38: Week 5 checkpoint ==========
  38: [
    { en: "Perform a dialogue in the market.", bn: "বাজারে একটি সংলাপ পরিবেশন করুন।" },
    { en: "Describe a person and their feelings.", bn: "একজন ব্যক্তি এবং তাদের অনুভূতি বর্ণনা করুন।" },
    { en: "Write a dialogue in a restaurant.", bn: "একটি রেস্তোরাঁয় একটি সংলাপ লিখুন।" },
  ],
  // ========== Day 39: Conversation management ==========
  39: [
    { en: "Can you repeat, please?", bn: "আপনি পুনরাবৃত্তি করতে পারেন, অনুগ্রহ করে?" },
    { en: "What do you mean?", bn: "আপনার মানে কি?" },
    { en: "I mean that the idea is useful.", bn: "আমার মানে হল ধারণাটি দরকারি।" },
  ],
  // ========== Day 40: Phase 2 checkpoint ==========
  40: [
    { en: "Speak for two minutes about your life.", bn: "আপনার জীবন সম্পর্কে দুই মিনিট কথা বলুন।" },
    { en: "Write 120 words about your day.", bn: "আপনার দিন সম্পর্কে 120টি শব্দ লিখুন।" },
    { en: "Have a real conversation.", bn: "একটি বাস্তব কথোপকথন করুন।" },
  ],
  // ========== Day 41: Past tense: I, you, he ==========
  41: [
    { en: "I went to work yesterday.", bn: "আমি গতকাল কাজে গিয়েছিলাম।" },
    { en: "You studied a lot.", bn: "আপনি অনেক পড়েছিলেন।" },
    { en: "He wrote a letter.", bn: "তিনি একটি চিঠি লিখেছিলেন।" },
  ],
  // ========== Day 42: Past tense: she, we, they ==========
  42: [
    { en: "Mariam studied Arabic.", bn: "মরিয়াম আরবি পড়েছিলেন।" },
    { en: "We went to the market.", bn: "আমরা বাজারে গিয়েছিলাম।" },
    { en: "The students left early.", bn: "শিক্ষার্থীরা তাড়াতাড়ি চলে গিয়েছিল।" },
  ],
  // ========== Day 43: Present ↔ past bridge ==========
  43: [
    { en: "Today I study, and yesterday I studied.", bn: "আজ আমি পড়ি, গতকাল আমি পড়েছিলাম।" },
    { en: "Now I work, and before I worked there.", bn: "এখন আমি কাজ করি, আগে আমি সেখানে কাজ করেছিলাম।" },
    { en: "Every day I read; yesterday I read a book.", bn: "প্রতিদিন আমি পড়ি; গতকাল আমি একটি বই পড়েছিলাম।" },
  ],
  // ========== Day 44: Past agreement ==========
  44: [
    { en: "The boy played.", bn: "ছেলেটি খেলেছিল।" },
    { en: "The girl played.", bn: "মেয়েটি খেলেছিল।" },
    { en: "The children played in the garden.", bn: "শিশুরা বাগানে খেলেছিল।" },
  ],
  // ========== Day 45: Past negation ==========
  45: [
    { en: "I didn't go to work yesterday.", bn: "গতকাল আমি কাজে যাইনি।" },
    { en: "I didn't see my friend this week.", bn: "এই সপ্তাহে আমি আমার বন্ধুকে দেখিনি।" },
    { en: "I didn't understand the lesson well.", bn: "আমি পাঠটি ভালোভাবে বুঝিনি।" },
  ],
  // ========== Day 46: Sequence & connectors ==========
  46: [
    { en: "First I woke up, then I had breakfast.", bn: "প্রথমে আমি জেগে উঠেছিলাম, তারপর আমি নাস্তা করেছিলাম।" },
    { en: "When I arrived, the lesson began.", bn: "যখন আমি পৌঁছেছিলাম, পাঠ শুরু হয়েছিল।" },
    { en: "Finally I returned home.", bn: "অবশেষে আমি বাড়িতে ফিরেছিলাম।" },
  ],
  // ========== Day 47: Broken plurals ==========
  47: [
    { en: "Man — men, book — books.", bn: "পুরুষ — পুরুষরা, বই — বইগুলি।" },
    { en: "City — cities, house — houses.", bn: "শহর — শহরগুলি, ঘর — ঘরগুলি।" },
    { en: "Road — roads, friend — friends.", bn: "রাস্তা — রাস্তাগুলি, বন্ধু — বন্ধুরা।" },
  ],
  // ========== Day 48: Weak & irregular past verbs ==========
  48: [
    { en: "The teacher said: study.", bn: "শিক্ষক বলেছেন: পড়ুন।" },
    { en: "I saw a beautiful film.", bn: "আমি একটি সুন্দর ছবি দেখেছিলাম।" },
    { en: "My friend came and gave me a book.", bn: "আমার বন্ধু এসেছিল এবং আমাকে একটি বই দিয়েছিল।" },
  ],
  // ========== Day 49: 'Used to': كان + مضارع ==========
  49: [
    { en: "I used to play every day when I was young.", bn: "আমি ছোটবেলায় প্রতিদিন খেলতাম।" },
    { en: "My grandfather used to live in the village.", bn: "আমার দাদু গ্রামে থাকতেন।" },
    { en: "They used to study together.", bn: "তারা একসাথে পড়তেন।" },
  ],
  // ========== Day 50: Week 7 checkpoint ==========
  50: [
    { en: "Tell a short story with connectors.", bn: "সংযোগ সহ একটি ছোট গল্প বলুন।" },
    { en: "Use 3 irregular verbs.", bn: "3টি অনিয়মিত ক্রিয়া ব্যবহার করুন।" },
    { en: "Describe an old habit.", bn: "একটি পুরানো অভ্যাস বর্ণনা করুন।" },
  ],
  // ========== Day 51: Time expressions (past) ==========
  51: [
    { en: "I visited my grandmother two days ago.", bn: "আমি দুই দিন আগে আমার দাদিকে দেখতে গিয়েছিলাম।" },
    { en: "A year ago I started work.", bn: "এক বছর আগে আমি কাজ শুরু করেছিলাম।" },
    { en: "One day I traveled alone.", bn: "এক দিন আমি একা ভ্রমণ করেছিলাম।" },
  ],
  // ========== Day 52: Family biography ==========
  52: [
    { en: "My father was born in a small village.", bn: "আমার পিতা একটি ছোট গ্রামে জন্মেছিলেন।" },
    { en: "My grandmother lived there for years.", bn: "আমার দাদি সেখানে বছরের পর বছর বাস করেছিলেন।" },
    { en: "My family moved to the city.", bn: "আমার পরিবার শহরে চলে গিয়েছিল।" },
  ],
  // ========== Day 53: My own story ==========
  53: [
    { en: "I was born in... and lived there.", bn: "আমি... এ জন্মেছিলাম এবং সেখানে বাস করেছিলাম।" },
    { en: "I started school and loved reading.", bn: "আমি স্কুল শুরু করেছিলাম এবং পড়া ভালোবাসতাম।" },
    { en: "I decided to learn Arabic.", bn: "আমি আরবি শিখার সিদ্ধান্ত নিয়েছিলাম।" },
  ],
  // ========== Day 54: Connected narration ==========
  54: [
    { en: "At first it was difficult.", bn: "প্রথমে এটি কঠিন ছিল।" },
    { en: "But I practiced a lot.", bn: "কিন্তু আমি অনেক অনুশীলন করেছিলাম।" },
    { en: "Therefore I improved in the end.", bn: "তাই শেষে আমি উন্নত হয়েছিলাম।" },
  ],
  // ========== Day 55: Reading a short story ==========
  55: [
    { en: "Read the title and predict the event.", bn: "শিরোনাম পড়ুন এবং ঘটনা পূর্বাভাস করুন।" },
    { en: "Guess the meaning from context.", bn: "প্রসঙ্গ থেকে অর্থ অনুমান করুন।" },
    { en: "Summarize the story in two sentences.", bn: "গল্পটি দুটি বাক্যে সংক্ষিপ্ত করুন।" },
  ],
  // ========== Day 56: Listening: a past account ==========
  56: [
    { en: "Listen to someone telling their day.", bn: "কেউ তাদের দিন বলতে শুনুন।" },
    { en: "Write what happened in order.", bn: "কি ঘটেছে তা ক্রমে লিখুন।" },
    { en: "Notice the past tense verbs.", bn: "অতীত কাল ক্রিয়াগুলি লক্ষ্য করুন।" },
  ],
  // ========== Day 57: Week 8 checkpoint ==========
  57: [
    { en: "Tell a story from your life.", bn: "আপনার জীবন থেকে একটি গল্প বলুন।" },
    { en: "Read a text and extract the events.", bn: "একটি পাঠ পড়ুন এবং ঘটনা বের করুন।" },
    { en: "Listen and summarize.", bn: "শুনুন এবং সংক্ষিপ্ত করুন।" },
  ],
  // ========== Day 58: Narration capstone prep ==========
  58: [
    { en: "I learned a lot in this phase.", bn: "আমি এই পর্যায়ে অনেক কিছু শিখেছি।" },
    { en: "The hardest challenge was…", bn: "সবচেয়ে কঠিন চ্যালেঞ্জ ছিল…" },
    { en: "My best memory was…", bn: "আমার সেরা স্মৃতি ছিল…" },
  ],
  // ========== Day 59: Phase 3 assessment ==========
  59: [
    { en: "Tell a past event in 8–10 sentences.", bn: "একটি অতীত ঘটনা 8–10টি বাক্যে বলুন।" },
    { en: "Read and listen and answer.", bn: "পড়ুন এবং শুনুন এবং উত্তর দিন।" },
    { en: "Write a story of 150 words.", bn: "150টি শব্দের একটি গল্প লিখুন।" },
  ],
  // ========== Day 60: Future with سـ and سوف ==========
  60: [
    { en: "I will study Arabic tomorrow.", bn: "আমি আগামীকাল আরবি পড়ব।" },
    { en: "I will visit my friend next week.", bn: "আমি পরের সপ্তাহে আমার বন্ধুকে দেখতে যাব।" },
    { en: "What will you do later?", bn: "আপনি পরে কি করবেন?" },
  ],
  // ========== Day 61: Making plans together ==========
  61: [
    { en: "Let's go to the garden tomorrow.", bn: "আসুন আগামীকাল বাগানে যাই।" },
    { en: "What if we meet at five o'clock?", bn: "যদি আমরা পাঁচটায় মিলি তবে কেমন হবে?" },
    { en: "Agreed, see you there.", bn: "ঠিক আছে, সেখানে দেখা হবে।" },
  ],
  // ========== Day 62: The imperative ==========
  62: [
    { en: "Write the homework, please.", bn: "অনুগ্রহ করে গৃহপাঠ লিখুন।" },
    { en: "Go to the right then stop.", bn: "ডানে যান তারপর থামুন।" },
    { en: "Wait here a little.", bn: "এখানে একটু অপেক্ষা করুন।" },
  ],
  // ========== Day 63: Directions in the city ==========
  63: [
    { en: "Go straight then turn right.", bn: "সোজা যান তারপর ডানে ঘুরুন।" },
    { en: "Where is the nearest pharmacy?", bn: "নিকটতম ফার্মেসি কোথায়?" },
    { en: "It is near the traffic light.", bn: "এটি ট্রাফিক লাইটের কাছে আছে।" },
  ],
  // ========== Day 64: Reading a schedule ==========
  64: [
    { en: "The shop opens at nine o'clock.", bn: "দোকানটি নয়টায় খোলে।" },
    { en: "The museum is closed on Monday.", bn: "জাদুঘরটি সোমবার বন্ধ থাকে।" },
    { en: "The show starts in the evening.", bn: "অনুষ্ঠানটি সন্ধ্যায় শুরু হয়।" },
  ],
  // ========== Day 65: Week 9 checkpoint ==========
  65: [
    { en: "Make a plan with a friend.", bn: "একজন বন্ধুর সাথে একটি পরিকল্পনা করুন।" },
    { en: "Give directions to a place.", bn: "কোনো জায়গায় দিকনির্দেশনা দিন।" },
    { en: "Read a schedule and answer.", bn: "একটি সময়সূচী পড়ুন এবং উত্তর দিন।" },
  ],
  // ========== Day 66: Shopping & services ==========
  66: [
    { en: "I need help, please.", bn: "আমার সাহায্য দরকার, অনুগ্রহ করে।" },
    { en: "Can I pay in cash?", bn: "আমি নগদ অর্থ প্রদান করতে পারি কি?" },
    { en: "The bill, if you please.", bn: "বিল, যদি আপনি দয়া করেন।" },
  ],
  // ========== Day 67: At the restaurant (extended) ==========
  67: [
    { en: "Give me the menu, please.", bn: "অনুগ্রহ করে আমাকে মেনু দিন।" },
    { en: "I order rice without meat.", bn: "আমি মাংস ছাড়া চাল অর্ডার করছি।" },
    { en: "Do you have dessert?", bn: "আপনার কাছে মিষ্টি আছে?" },
  ],
  // ========== Day 68: Phone & messages ==========
  68: [
    { en: "Hello, who is speaking?", bn: "হ্যালো, কে কথা বলছেন?" },
    { en: "He is busy now, leave a message.", bn: "তিনি এখন ব্যস্ত, একটি বার্তা রেখে যান।" },
    { en: "I will call you later.", bn: "আমি পরে আপনাকে ডাকব।" },
  ],
  // ========== Day 69: Multi-step listening ==========
  69: [
    { en: "First open the app, then press here.", bn: "প্রথমে অ্যাপটি খুলুন, তারপর এখানে চাপুন।" },
    { en: "Then confirm the number.", bn: "তারপর সংখ্যা নিশ্চিত করুন।" },
    { en: "Finally save the change.", bn: "অবশেষে পরিবর্তন সংরক্ষণ করুন।" },
  ],
  // ========== Day 70: Week 10 checkpoint ==========
  70: [
    { en: "Perform a service visit.", bn: "একটি পরিষেবা পরিদর্শন পরিবেশন করুন।" },
    { en: "Follow multi-step instructions.", bn: "বহু-পদক্ষেপ নির্দেশনা অনুসরণ করুন।" },
    { en: "Write a phone dialogue.", bn: "একটি টেলিফোন সংলাপ লিখুন।" },
  ],
  // ========== Day 71: Travel & transport ==========
  71: [
    { en: "I want a ticket to the capital.", bn: "আমি রাজধানীতে একটি টিকিট চাই।" },
    { en: "When will the train arrive?", bn: "ট্রেনটি কখন পৌঁছাবে?" },
    { en: "Where is the bus station?", bn: "বাস স্টেশন কোথায়?" },
  ],
  // ========== Day 72: Health & the doctor ==========
  72: [
    { en: "I feel pain in my head.", bn: "আমি আমার মাথায় ব্যথা অনুভব করছি।" },
    { en: "I have a fever since yesterday.", bn: "গতকাল থেকে আমার জ্বর আছে।" },
    { en: "Take the medicine and rest.", bn: "ওষুধ খান এবং বিশ্রাম নিন।" },
  ],
  // ========== Day 73: Invitations & apologies ==========
  73: [
    { en: "I invite you to dinner on Friday.", bn: "আমি আপনাকে শুক্রবার রাতের খাবারে আমন্ত্রণ জানাচ্ছি।" },
    { en: "With great pleasure, thank you.", bn: "বড় আনন্দের সাথে, ধন্যবাদ।" },
    { en: "Sorry, I can't come.", bn: "দুঃখিত, আমি আসতে পারি না।" },
  ],
  // ========== Day 74: Reading: notices & ads ==========
  74: [
    { en: "For sale: a car in excellent condition.", bn: "বিক্রয়ের জন্য: চমৎকার অবস্থার একটি গাড়ি।" },
    { en: "Wanted: an employee to work.", bn: "চাওয়া: কাজ করার জন্য একজন কর্মচারী।" },
    { en: "Special offer this week.", bn: "এই সপ্তাহে বিশেষ অফার।" },
  ],
  // ========== Day 75: Week 11 checkpoint ==========
  75: [
    { en: "Perform a travel or clinic situation.", bn: "একটি ভ্রমণ বা ক্লিনিক পরিস্থিতি পরিবেশন করুন।" },
    { en: "Read an ad and answer.", bn: "একটি বিজ্ঞাপন পড়ুন এবং উত্তর দিন।" },
    { en: "Write an invitation and apology.", bn: "একটি আমন্ত্রণ এবং ক্ষমা লিখুন।" },
  ],
  // ========== Day 76: Complaints & solutions ==========
  76: [
    { en: "There is a problem with the order.", bn: "অর্ডারে একটি সমস্যা আছে।" },
    { en: "This doesn't work unfortunately.", bn: "দুর্ভাগ্যবশত এটি কাজ করে না।" },
    { en: "I request a solution or a refund.", bn: "আমি একটি সমাধান বা অর্থ ফেরত চাই।" },
  ],
  // ========== Day 77: Opinions in conversation ==========
  77: [
    { en: "I think the idea is good.", bn: "আমি মনে করি ধারণাটি ভাল।" },
    { en: "Right, I agree with you.", bn: "সঠিক, আমি আপনার সাথে একমত।" },
    { en: "I don't think so, frankly.", bn: "আমি তা মনে করি না, সৎভাবে বলতে।" },
  ],
  // ========== Day 78: Interaction capstone prep ==========
  78: [
    { en: "Choose a realistic situation.", bn: "একটি বাস্তবসম্মত পরিস্থিতি বেছে নিন।" },
    { en: "Prepare your role and responses.", bn: "আপনার ভূমিকা এবং প্রতিক্রিয়া প্রস্তুত করুন।" },
    { en: "Practice polite closing.", bn: "বিনয়ী সমাপ্তির অনুশীলন করুন।" },
  ],
  // ========== Day 79: Phase 4 assessment ==========
  79: [
    { en: "Perform a complete practical situation.", bn: "একটি সম্পূর্ণ ব্যবহারিক পরিস্থিতি পরিবেশন করুন।" },
    { en: "Follow multi-step instructions.", bn: "বহু-পদক্ষেপ নির্দেশনা অনুসরণ করুন।" },
    { en: "Read and listen and answer.", bn: "পড়ুন এবং শুনুন এবং উত্তর দিন।" },
  ],
  // ========== Day 80: Phase 4 assessment continued ==========
  80: [
    { en: "Perform a complete practical role-play.", bn: "একটি সম্পূর্ণ ব্যবহারিক ভূমিকা পরিবেশন করুন।" },
    { en: "Follow multi-step instructions.", bn: "বহু-পদক্ষেপ নির্দেশনা অনুসরণ করুন।" },
    { en: "Read and listen and answer.", bn: "পড়ুন এবং শুনুন এবং উত্তর দিন।" },
  ],
};
