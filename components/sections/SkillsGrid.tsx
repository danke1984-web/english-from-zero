"use client";

import { motion } from "framer-motion";

const SKILLS = [
  {
    icon: "🎧",
    label: "Nghe",
    labelEn: "Listening",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    desc: "Nghe và hiểu người bản ngữ nói, xem phim/podcast không cần phụ đề.",
    questions: "6 câu · TTS audio",
    tips: ["Nghe câu hoàn chỉnh", "Nhận diện giọng Anh-Mỹ", "Hiểu hội thoại ngắn"],
  },
  {
    icon: "📖",
    label: "Đọc",
    labelEn: "Reading",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    desc: "Đọc hiểu email, tin tức, đoạn hội thoại và tài liệu tiếng Anh.",
    questions: "6 câu · MCQ & Fill",
    tips: ["Hiểu ý chính đoạn văn", "Đọc email công việc", "Nhận biết từ khóa"],
  },
  {
    icon: "✍️",
    label: "Viết",
    labelEn: "Writing",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    desc: "Viết câu đúng ngữ pháp, email chuyên nghiệp và diễn đạt ý kiến bằng văn bản.",
    questions: "6 câu · Fill & MCQ",
    tips: ["Dùng đúng thì động từ", "Viết câu hoàn chỉnh", "Ngữ pháp cơ bản"],
  },
  {
    icon: "🎤",
    label: "Nói",
    labelEn: "Speaking",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fdba74",
    desc: "Tự tin giao tiếp, phát âm chuẩn và diễn đạt ý tưởng bằng lời nói.",
    questions: "3 tình huống · Ghi âm",
    tips: ["Tự giới thiệu bản thân", "Mô tả đồ vật/địa điểm", "Kể kế hoạch tương lai"],
  },
];

export function SkillsGrid() {
  return (
    <section className="py-20 px-4 bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 space-y-3"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#2563eb]">
            4 kỹ năng được kiểm tra
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0d0d0d]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Đánh Giá Toàn Diện<br className="hidden sm:block" /> Cả 4 Kỹ Năng
          </h2>
          <p className="text-[#52525b] max-w-sm mx-auto text-base">
            Chỉ kiểm tra 1–2 kỹ năng không đủ. Bạn cần biết điểm mạnh và điểm yếu của cả 4.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border p-6 space-y-4"
              style={{ borderColor: s.border }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: s.bg }}
                >
                  {s.icon}
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: s.bg, color: s.color }}
                >
                  {s.questions}
                </span>
              </div>
              <div className="space-y-1">
                <h3
                  className="font-bold text-[#0d0d0d] text-lg"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  {s.label}{" "}
                  <span className="text-sm font-normal text-[#a1a1aa]">({s.labelEn})</span>
                </h3>
                <p className="text-sm text-[#52525b] leading-relaxed">{s.desc}</p>
              </div>
              <ul className="space-y-1.5">
                {s.tips.map((tip) => (
                  <li key={tip} className="flex items-center gap-2 text-xs text-[#52525b]">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
