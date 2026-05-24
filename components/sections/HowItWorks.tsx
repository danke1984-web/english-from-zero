"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    icon: "📝",
    title: "Làm Bài Kiểm Tra",
    desc: "Trả lời ~24 câu hỏi về 4 kỹ năng Nghe, Đọc, Viết, Nói. Chỉ mất khoảng 10–15 phút.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    step: "02",
    icon: "📊",
    title: "Xem Kết Quả",
    desc: "Hệ thống chấm điểm tức thì. Bạn biết ngay mình đang ở trình độ nào và kỹ năng nào cần cải thiện nhất.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    step: "03",
    icon: "🗺️",
    title: "Nhận Lộ Trình",
    desc: "Lộ trình được tạo riêng cho bạn với các giai đoạn học cụ thể, tài liệu gợi ý và thời gian ước tính.",
    color: "#059669",
    bg: "#ecfdf5",
  },
];

export function HowItWorks() {
  return (
    <section id="cach-hoat-dong" className="py-20 px-4 bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 space-y-3"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#2563eb]">
            Cách hoạt động
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0d0d0d]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Chỉ 3 Bước Đơn Giản
          </h2>
          <p className="text-[#52525b] max-w-md mx-auto text-base">
            Không cần đăng ký, không cần thẻ tín dụng. Bắt đầu ngay bây giờ.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl border border-[#e4e4e7] p-6 space-y-4 relative overflow-hidden"
            >
              {/* Step number watermark */}
              <div
                className="absolute top-4 right-5 text-5xl font-black opacity-5 select-none"
                style={{ fontFamily: "var(--font-bricolage)", color: s.color }}
              >
                {s.step}
              </div>

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: s.bg }}
              >
                {s.icon}
              </div>
              <div className="space-y-1.5">
                <h3
                  className="font-bold text-[#0d0d0d] text-lg"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-[#52525b] leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/kiem-tra"
            className="inline-flex px-8 py-4 bg-[#2563eb] text-white font-semibold rounded-xl hover:bg-[#1d4ed8] transition-all shadow-sm hover:shadow-md text-sm"
          >
            Bắt Đầu Ngay — Miễn Phí
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
