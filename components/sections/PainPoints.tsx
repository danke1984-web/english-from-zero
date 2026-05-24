"use client";

import { motion } from "framer-motion";

const PAINS = [
  {
    icon: "😞",
    title: "Học mãi không nhớ",
    desc: "Học xong lại quên, từ vựng không vào đầu vì không có phương pháp và lộ trình rõ ràng.",
  },
  {
    icon: "😰",
    title: "Không biết bắt đầu từ đâu",
    desc: "Quá nhiều tài liệu, khóa học, ứng dụng — khiến bạn loay hoay không biết chọn cái nào.",
  },
  {
    icon: "🙈",
    title: "Ngại nói vì sợ sai",
    desc: "Biết từ nhưng không dám nói vì sợ phát âm sai, sợ người khác cười.",
  },
];

export function PainPoints() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 space-y-3"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#dc2626]">
            Vấn đề thường gặp
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#0d0d0d]"
            style={{ fontFamily: "var(--font-bricolage)" }}
          >
            Bạn Có Đang Gặp<br className="hidden sm:block" /> Những Vấn Đề Này?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {PAINS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border-2 border-[#fee2e2] bg-[#fff5f5] space-y-3"
            >
              <span className="text-3xl">{p.icon}</span>
              <h3 className="font-bold text-[#0d0d0d]" style={{ fontFamily: "var(--font-bricolage)" }}>
                {p.title}
              </h3>
              <p className="text-sm text-[#52525b] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 p-6 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] text-center space-y-2"
        >
          <p className="text-base font-semibold text-[#1e40af]">
            💡 EnglishFromZero giải quyết tất cả những vấn đề trên
          </p>
          <p className="text-sm text-[#3b82f6]">
            bằng cách xác định đúng trình độ của bạn và đưa ra lộ trình học phù hợp nhất.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
