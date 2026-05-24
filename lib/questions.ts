import type {
  MCQQuestion,
  FillQuestion,
  ListenMCQQuestion,
  SelfRateQuestion,
  Question,
} from "./types";

// ─── NGHE (Listening) — Text-to-Speech ───────────────────────────────────────

const ngheQuestions: (ListenMCQQuestion | MCQQuestion)[] = [
  {
    id: "nghe-1",
    skill: "nghe",
    type: "listen-mcq",
    text: 'Nghe đoạn audio và chọn câu trả lời đúng.',
    ttsText: "Hello! My name is Anna. I am a teacher.",
    options: [
      "Anna là học sinh.",
      "Anna là giáo viên.",
      "Anna là bác sĩ.",
      "Anna là kỹ sư.",
    ],
    correctIndex: 1,
    points: 10,
  },
  {
    id: "nghe-2",
    skill: "nghe",
    type: "listen-mcq",
    text: 'Nghe đoạn audio và chọn câu trả lời đúng.',
    ttsText: "I wake up at seven o'clock every morning.",
    options: [
      "Anh ấy thức dậy lúc 6 giờ.",
      "Anh ấy thức dậy lúc 7 giờ.",
      "Anh ấy thức dậy lúc 8 giờ.",
      "Anh ấy không bao giờ thức dậy sớm.",
    ],
    correctIndex: 1,
    points: 10,
  },
  {
    id: "nghe-3",
    skill: "nghe",
    type: "listen-mcq",
    text: 'Nghe và chọn nghĩa đúng.',
    ttsText: "Can you please open the window? It is very hot in here.",
    options: [
      "Anh ấy muốn đóng cửa sổ.",
      "Anh ấy cảm thấy lạnh.",
      "Anh ấy muốn mở cửa sổ vì trời nóng.",
      "Anh ấy muốn mở cửa ra vào.",
    ],
    correctIndex: 2,
    points: 10,
  },
  {
    id: "nghe-4",
    skill: "nghe",
    type: "listen-mcq",
    text: 'Nghe đoạn hội thoại và chọn thông tin đúng.',
    ttsText:
      "A: Excuse me, where is the nearest coffee shop? B: It is on the second street to the left.",
    options: [
      "Quán cà phê ở bên phải.",
      "Quán cà phê ở phố thứ hai bên trái.",
      "Quán cà phê ở tầng hai.",
      "Không có quán cà phê gần đây.",
    ],
    correctIndex: 1,
    points: 15,
  },
  {
    id: "nghe-5",
    skill: "nghe",
    type: "listen-mcq",
    text: 'Nghe và chọn từ bạn nghe được.',
    ttsText: "The children are playing in the park.",
    options: ["swimming", "running", "playing", "sleeping"],
    correctIndex: 2,
    points: 10,
  },
  {
    id: "nghe-6",
    skill: "nghe",
    type: "listen-mcq",
    text: 'Nghe đoạn giới thiệu và chọn thông tin đúng.',
    ttsText:
      "Hi everyone! My name is David. I am from Australia and I work as a software engineer. I love hiking and cooking in my free time.",
    options: [
      "David đến từ Mỹ và là giáo viên.",
      "David đến từ Úc và là kỹ sư phần mềm.",
      "David đến từ Anh và thích bơi lội.",
      "David là đầu bếp và thích leo núi.",
    ],
    correctIndex: 1,
    points: 15,
  },
];

// ─── ĐỌC (Reading) — MCQ & Fill ──────────────────────────────────────────────

const docQuestions: (MCQQuestion | FillQuestion)[] = [
  {
    id: "doc-1",
    skill: "doc",
    type: "mcq",
    text: 'Chọn nghĩa đúng của từ "beautiful":',
    options: ["Xấu xí", "Đẹp", "Buồn", "Nhanh"],
    correctIndex: 1,
    points: 5,
  },
  {
    id: "doc-2",
    skill: "doc",
    type: "fill",
    text: 'Điền từ thích hợp vào chỗ trống:',
    blank: "She ___ to school every day. (đi — dạng hiện tại đơn)",
    correctAnswers: ["goes", "walks", "rides"],
    points: 10,
  },
  {
    id: "doc-3",
    skill: "doc",
    type: "mcq",
    text: 'Đọc câu sau và chọn nghĩa đúng: "I haven\'t eaten anything since morning."',
    options: [
      "Tôi đã ăn sáng rồi.",
      "Tôi không ăn gì từ sáng đến giờ.",
      "Tôi sẽ ăn sáng.",
      "Tôi thường ăn vào buổi sáng.",
    ],
    correctIndex: 1,
    points: 10,
  },
  {
    id: "doc-4",
    skill: "doc",
    type: "mcq",
    text: `Đọc đoạn văn và chọn câu trả lời đúng:\n\n"Tom works at a hospital. He starts work at 8 am and finishes at 5 pm. He usually eats lunch at the hospital cafeteria."\n\nTom ăn trưa ở đâu?`,
    options: [
      "Ở nhà hàng gần bệnh viện.",
      "Ở căng-tin bệnh viện.",
      "Ở nhà.",
      "Không đề cập trong bài.",
    ],
    correctIndex: 1,
    points: 15,
  },
  {
    id: "doc-5",
    skill: "doc",
    type: "fill",
    text: 'Điền từ đúng vào chỗ trống:',
    blank: "There ___ three books on the table. (to be — số nhiều)",
    correctAnswers: ["are"],
    points: 10,
  },
  {
    id: "doc-6",
    skill: "doc",
    type: "mcq",
    text: `Đọc email sau và trả lời câu hỏi:\n\n"Dear Sarah, I'm writing to let you know that the meeting has been moved from Tuesday to Thursday at 3 PM. Please confirm if you can attend. Best, Mark"\n\nCuộc họp được dời sang ngày nào?`,
    options: [
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
    ],
    correctIndex: 3,
    points: 15,
  },
];

// ─── VIẾT (Writing) — Fill & MCQ ─────────────────────────────────────────────

const vietQuestions: (FillQuestion | MCQQuestion)[] = [
  {
    id: "viet-1",
    skill: "viet",
    type: "fill",
    text: 'Viết dạng quá khứ đơn của động từ "go":',
    blank: "Yesterday, I ___ to the market.",
    correctAnswers: ["went"],
    points: 10,
  },
  {
    id: "viet-2",
    skill: "viet",
    type: "mcq",
    text: 'Câu nào đúng về ngữ pháp?',
    options: [
      "She don't like coffee.",
      "She doesn't likes coffee.",
      "She doesn't like coffee.",
      "She not like coffee.",
    ],
    correctIndex: 2,
    points: 10,
  },
  {
    id: "viet-3",
    skill: "viet",
    type: "fill",
    text: 'Điền giới từ đúng:',
    blank: "I will meet you ___ Monday morning.",
    correctAnswers: ["on"],
    points: 10,
  },
  {
    id: "viet-4",
    skill: "viet",
    type: "mcq",
    text: 'Chọn câu dịch đúng nhất cho: "Tôi đang học tiếng Anh được 2 năm."',
    options: [
      "I learn English for 2 years.",
      "I have been learning English for 2 years.",
      "I was learning English for 2 years.",
      "I am learning English since 2 years.",
    ],
    correctIndex: 1,
    points: 15,
  },
  {
    id: "viet-5",
    skill: "viet",
    type: "fill",
    text: 'Điền từ nối phù hợp:',
    blank: "I wanted to go out, ___ it was raining. (nhưng/dù vậy)",
    correctAnswers: ["but", "however", "yet"],
    points: 10,
  },
  {
    id: "viet-6",
    skill: "viet",
    type: "mcq",
    text: 'Câu nào sắp xếp đúng thứ tự?',
    options: [
      "Always she is on time.",
      "She always is on time.",
      "She is always on time.",
      "She is on time always.",
    ],
    correctIndex: 2,
    points: 15,
  },
];

// ─── NÓI (Speaking) — Self-rate ──────────────────────────────────────────────

const noiQuestions: SelfRateQuestion[] = [
  {
    id: "noi-1",
    skill: "noi",
    type: "self-rate",
    text: 'Tự giới thiệu bản thân bằng tiếng Anh trong 30 giây (họ tên, quê quán, nghề nghiệp). Ghi âm và nghe lại, rồi tự đánh giá.',
    descriptions: {
      1: "Tôi không thể nói được câu nào hoàn chỉnh.",
      2: "Tôi nói được vài từ đơn lẻ nhưng không thành câu.",
      3: "Tôi nói được nhưng ngập ngừng nhiều và có lỗi ngữ pháp.",
      4: "Tôi nói được khá trơn tru, lỗi ít.",
      5: "Tôi nói tự nhiên, tự tin, ít dừng lại.",
    },
    points: 20,
  },
  {
    id: "noi-2",
    skill: "noi",
    type: "self-rate",
    text: 'Mô tả căn phòng của bạn bằng tiếng Anh trong 30 giây (có gì trong phòng, màu sắc, vị trí đồ vật). Ghi âm và nghe lại.',
    descriptions: {
      1: "Tôi không biết bắt đầu từ đâu.",
      2: "Tôi nói được tên một vài đồ vật nhưng không ghép thành câu.",
      3: "Tôi mô tả được nhưng thiếu từ vựng và ngập ngừng.",
      4: "Tôi mô tả được rõ ràng với ít lỗi.",
      5: "Tôi mô tả chi tiết, tự nhiên và dùng từ nối tốt.",
    },
    points: 20,
  },
  {
    id: "noi-3",
    skill: "noi",
    type: "self-rate",
    text: 'Kể về kế hoạch cuối tuần của bạn bằng tiếng Anh (sẽ làm gì, đi đâu, với ai). Ghi âm 30 giây.',
    descriptions: {
      1: "Tôi không thể nói về tương lai bằng tiếng Anh.",
      2: "Tôi nói được 1–2 câu đơn giản.",
      3: "Tôi kể được nhưng dùng sai thì tương lai.",
      4: "Tôi kể được rõ ràng, dùng đúng cấu trúc will/going to.",
      5: "Tôi kể tự nhiên, chi tiết và có thêm lý do/cảm xúc.",
    },
    points: 20,
  },
];

export const QUESTIONS: Question[] = [
  ...ngheQuestions,
  ...docQuestions,
  ...vietQuestions,
  ...noiQuestions,
];

export const SKILL_META = {
  nghe: {
    id: "nghe" as const,
    label: "Nghe",
    labelEn: "Listening",
    icon: "🎧",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    description: "Khả năng hiểu tiếng Anh qua âm thanh",
  },
  doc: {
    id: "doc" as const,
    label: "Đọc",
    labelEn: "Reading",
    icon: "📖",
    color: "#0891b2",
    bgColor: "#ecfeff",
    description: "Khả năng hiểu văn bản, đoạn hội thoại",
  },
  viet: {
    id: "viet" as const,
    label: "Viết",
    labelEn: "Writing",
    icon: "✍️",
    color: "#059669",
    bgColor: "#ecfdf5",
    description: "Khả năng dùng ngữ pháp và viết câu đúng",
  },
  noi: {
    id: "noi" as const,
    label: "Nói",
    labelEn: "Speaking",
    icon: "🎤",
    color: "#ea580c",
    bgColor: "#fff7ed",
    description: "Khả năng diễn đạt ý kiến bằng lời nói",
  },
};

export const LEVEL_META = {
  "so-cap": {
    label: "Sơ Cấp",
    labelEn: "Beginner",
    color: "#dc2626",
    bgColor: "#fef2f2",
    description: "Bạn đang ở giai đoạn đầu. Cần xây dựng nền tảng từ cơ bản nhất.",
    emoji: "🌱",
  },
  "co-ban": {
    label: "Cơ Bản",
    labelEn: "Elementary",
    color: "#d97706",
    bgColor: "#fffbeb",
    description: "Bạn đã có nền tảng nhất định. Cần củng cố và mở rộng thêm.",
    emoji: "🌿",
  },
  "trung-cap": {
    label: "Trung Cấp",
    labelEn: "Lower-Intermediate",
    color: "#16a34a",
    bgColor: "#f0fdf4",
    description: "Bạn đã giao tiếp được. Cần luyện sâu hơn về fluency và vocabulary.",
    emoji: "🌳",
  },
};
