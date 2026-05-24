import type { RoadmapConfig, RoadmapPhase, Level, Skill, SkillScore } from "./types";

export function generateRoadmap(scores: Record<Skill, SkillScore>): RoadmapConfig {
  const avgPct = Math.round(
    (scores.nghe.pct + scores.doc.pct + scores.viet.pct + scores.noi.pct) / 4
  );
  const level: Level = avgPct <= 40 ? "so-cap" : avgPct <= 70 ? "co-ban" : "trung-cap";

  return {
    level,
    totalWeeks: level === "so-cap" ? "16–20 tuần" : level === "co-ban" ? "12–16 tuần" : "8–12 tuần",
    phases: ROADMAP_PHASES[level],
  };
}

const ROADMAP_PHASES: Record<Level, RoadmapPhase[]> = {
  "so-cap": [
    {
      id: "sc-1",
      order: 1,
      title: "Bảng Chữ Cái & Phát Âm",
      subtitle: "Nền tảng đầu tiên",
      duration: "2–3 tuần",
      skills: ["nghe", "noi"],
      topics: [
        "26 chữ cái và cách đọc",
        "Nguyên âm & phụ âm",
        "Âm cuối câu (intonation cơ bản)",
        "Luyện nghe từ đơn lẻ",
      ],
      resources: [
        { label: "BBC Learning English — Pronunciation", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation" },
        { label: "Sounds: Pronunciation App (IPA)", url: "https://www.soundspronunciationapp.com" },
      ],
      targetLevel: "so-cap",
    },
    {
      id: "sc-2",
      order: 2,
      title: "Từ Vựng Cơ Bản 500 Từ",
      subtitle: "Từ vựng giao tiếp hằng ngày",
      duration: "3–4 tuần",
      skills: ["doc", "viet"],
      topics: [
        "Số đếm, màu sắc, ngày tháng",
        "Gia đình, nhà cửa, đồ vật",
        "Thức ăn, thức uống",
        "Nghề nghiệp, địa điểm",
        "Flashcard Anki mỗi ngày 20 từ",
      ],
      resources: [
        { label: "Anki — Spaced Repetition Flashcards", url: "https://apps.ankiweb.net" },
        { label: "Quizlet — English Vocabulary Sets", url: "https://quizlet.com" },
      ],
      targetLevel: "so-cap",
    },
    {
      id: "sc-3",
      order: 3,
      title: "Ngữ Pháp Nền Tảng",
      subtitle: "Cấu trúc câu cơ bản",
      duration: "3–4 tuần",
      skills: ["viet", "doc"],
      topics: [
        "Chủ ngữ + động từ + tân ngữ",
        "To be: am / is / are",
        "Thì hiện tại đơn (Present Simple)",
        "Câu hỏi Yes/No và Wh-",
        "Số nhiều của danh từ",
      ],
      resources: [
        { label: "English Grammar in Use (Raymond Murphy)", url: "https://www.cambridge.org/elt/catalogue/subject/item2701760" },
        { label: "GrammarlyBlog — Grammar Basics", url: "https://www.grammarly.com/blog/category/handbook" },
      ],
      targetLevel: "so-cap",
    },
    {
      id: "sc-4",
      order: 4,
      title: "Hội Thoại Đơn Giản",
      subtitle: "Chào hỏi, giới thiệu bản thân",
      duration: "2–3 tuần",
      skills: ["noi", "nghe"],
      topics: [
        "Chào hỏi và tạm biệt",
        "Giới thiệu tên, tuổi, nghề nghiệp",
        "Hỏi đường, mua sắm",
        "Hội thoại tại nhà hàng, quán cà phê",
        "Luyện shadowing với video",
      ],
      resources: [
        { label: "EnglishClass101 — Absolute Beginner", url: "https://www.englishclass101.com" },
        { label: "YouTube: English with Lucy", url: "https://www.youtube.com/@EnglishwithLucy" },
      ],
      targetLevel: "so-cap",
    },
    {
      id: "sc-5",
      order: 5,
      title: "Luyện Đọc Văn Bản Ngắn",
      subtitle: "Đọc hiểu câu và đoạn đơn giản",
      duration: "2–3 tuần",
      skills: ["doc"],
      topics: [
        "Đọc biển hiệu, menu, tin nhắn",
        "Đọc đoạn văn 50–100 từ",
        "Nhận biết từ khóa và ý chính",
        "Tra từ điển và ghi chép",
      ],
      resources: [
        { label: "News in Levels — Level 1", url: "https://www.newsinlevels.com" },
        { label: "Oxford Learner's Dictionaries", url: "https://www.oxfordlearnersdictionaries.com" },
      ],
      targetLevel: "so-cap",
    },
    {
      id: "sc-6",
      order: 6,
      title: "Viết Câu Hoàn Chỉnh",
      subtitle: "Ghép từ thành câu đúng ngữ pháp",
      duration: "2 tuần",
      skills: ["viet"],
      topics: [
        "Viết câu mô tả bản thân",
        "Viết email ngắn giới thiệu",
        "Nhật ký tiếng Anh 3–5 câu/ngày",
        "Sửa lỗi với ChatGPT hoặc Grammarly",
      ],
      resources: [
        { label: "Grammarly — Free Writing Assistant", url: "https://www.grammarly.com" },
        { label: "Lang-8 — Native Speaker Corrections", url: "https://lang-8.com" },
      ],
      targetLevel: "so-cap",
    },
  ],

  "co-ban": [
    {
      id: "cb-1",
      order: 1,
      title: "Củng Cố Ngữ Pháp",
      subtitle: "Các thì cơ bản và nâng cao",
      duration: "3 tuần",
      skills: ["viet", "doc"],
      topics: [
        "Thì hiện tại tiếp diễn (Present Continuous)",
        "Thì quá khứ đơn (Past Simple)",
        "Thì tương lai (will / going to)",
        "So sánh hơn và nhất",
        "Modal verbs: can, should, must",
      ],
      resources: [
        { label: "British Council — Grammar Reference", url: "https://learnenglish.britishcouncil.org/grammar" },
        { label: "Perfect English Grammar", url: "https://www.perfect-english-grammar.com" },
      ],
      targetLevel: "co-ban",
    },
    {
      id: "cb-2",
      order: 2,
      title: "Mở Rộng Từ Vựng 1500 Từ",
      subtitle: "Chủ đề công việc, xã hội, cảm xúc",
      duration: "3–4 tuần",
      skills: ["doc", "viet"],
      topics: [
        "Từ vựng công sở và công việc",
        "Mô tả cảm xúc và trạng thái",
        "Chủ đề sức khỏe và y tế",
        "Phrasal verbs thông dụng (Top 50)",
        "Collocations: make/do/have/take",
      ],
      resources: [
        { label: "Vocabulary.com — Adaptive Learning", url: "https://www.vocabulary.com" },
        { label: "Magoosh Vocabulary Builder", url: "https://magoosh.com/vocabulary" },
      ],
      targetLevel: "co-ban",
    },
    {
      id: "cb-3",
      order: 3,
      title: "Luyện Nghe Hội Thoại Thật",
      subtitle: "Nghe người bản ngữ nói chuyện",
      duration: "3 tuần",
      skills: ["nghe"],
      topics: [
        "Podcast chậm cho người học (ESLPod)",
        "Nghe và điền vào chỗ trống (dictation)",
        "Shadowing với hội thoại ngắn",
        "Nhận biết giọng Anh-Mỹ vs Anh-Anh",
      ],
      resources: [
        { label: "ESL Pod — English as a Second Language Podcast", url: "https://www.eslpod.com" },
        { label: "TED-Ed — Subtitled Talks", url: "https://ed.ted.com" },
      ],
      targetLevel: "co-ban",
    },
    {
      id: "cb-4",
      order: 4,
      title: "Giao Tiếp Tình Huống",
      subtitle: "Xử lý tình huống hằng ngày bằng tiếng Anh",
      duration: "3 tuần",
      skills: ["noi", "nghe"],
      topics: [
        "Gọi điện và đặt lịch hẹn",
        "Phỏng vấn xin việc cơ bản",
        "Diễn đạt ý kiến và phản đối",
        "Kể chuyện và mô tả sự kiện",
        "Luyện với AI (ChatGPT roleplay)",
      ],
      resources: [
        { label: "Speeko — Public Speaking App", url: "https://www.speeko.co" },
        { label: "Cambly — Luyện nói với người bản ngữ", url: "https://www.cambly.com" },
      ],
      targetLevel: "co-ban",
    },
    {
      id: "cb-5",
      order: 5,
      title: "Đọc Hiểu Trung Cấp",
      subtitle: "Đọc bài báo và truyện ngắn",
      duration: "2 tuần",
      skills: ["doc"],
      topics: [
        "Đọc tin tức từ BBC Learning English",
        "Nhận biết ý chính và ý phụ",
        "Đoán nghĩa từ từ ngữ cảnh",
        "Đọc truyện ngắn cấp độ A2-B1",
      ],
      resources: [
        { label: "News in Levels — Level 2 & 3", url: "https://www.newsinlevels.com" },
        { label: "Penguin Readers — Graded Readers", url: "https://www.penguinreaders.co.uk" },
      ],
      targetLevel: "co-ban",
    },
  ],

  "trung-cap": [
    {
      id: "tc-1",
      order: 1,
      title: "Ngữ Pháp Nâng Cao",
      subtitle: "Các thì hoàn thành và câu phức",
      duration: "2–3 tuần",
      skills: ["viet", "doc"],
      topics: [
        "Present Perfect & Past Perfect",
        "Câu điều kiện loại 1, 2, 3",
        "Passive voice",
        "Reported speech",
        "Relative clauses",
      ],
      resources: [
        { label: "Cambridge Grammar in Use — Intermediate", url: "https://www.cambridge.org" },
        { label: "ThoughtCo — Advanced Grammar", url: "https://www.thoughtco.com/english-grammar-4133049" },
      ],
      targetLevel: "trung-cap",
    },
    {
      id: "tc-2",
      order: 2,
      title: "Fluency & Natural Speech",
      subtitle: "Nói tự nhiên, trơn tru như người bản ngữ",
      duration: "3–4 tuần",
      skills: ["noi"],
      topics: [
        "Filler words và linking phrases",
        "Stress và rhythm trong câu",
        "Idioms và expressions thông dụng",
        "Thảo luận chủ đề trừu tượng",
        "Luyện thuyết trình ngắn 2–3 phút",
      ],
      resources: [
        { label: "Rachel's English — Accent Reduction", url: "https://rachelsenglish.com" },
        { label: "Toastmasters — Public Speaking", url: "https://www.toastmasters.org" },
      ],
      targetLevel: "trung-cap",
    },
    {
      id: "tc-3",
      order: 3,
      title: "Đọc & Nghe Tốc Độ Cao",
      subtitle: "Tiêu thụ nội dung tiếng Anh thật",
      duration: "2–3 tuần",
      skills: ["nghe", "doc"],
      topics: [
        "Nghe podcast không phụ đề (NPR, BBC)",
        "Đọc bài báo BBC, The Guardian",
        "Tốc độ đọc 150+ từ/phút",
        "Note-taking khi nghe lecture",
      ],
      resources: [
        { label: "BBC Podcasts", url: "https://www.bbc.co.uk/podcasts" },
        { label: "The Guardian — Simple English", url: "https://www.theguardian.com" },
      ],
      targetLevel: "trung-cap",
    },
    {
      id: "tc-4",
      order: 4,
      title: "Viết Học Thuật & Chuyên Nghiệp",
      subtitle: "Email công việc, báo cáo, luận điểm",
      duration: "2–3 tuần",
      skills: ["viet"],
      topics: [
        "Email chuyên nghiệp (formal/informal)",
        "Viết đoạn văn có lập luận",
        "Từ nối nâng cao (coherence & cohesion)",
        "Tự chỉnh sửa với Grammarly Premium",
      ],
      resources: [
        { label: "Purdue OWL — Academic Writing", url: "https://owl.purdue.edu" },
        { label: "Hemingway Editor — Clarity Check", url: "https://hemingwayapp.com" },
      ],
      targetLevel: "trung-cap",
    },
  ],
};
