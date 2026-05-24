"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2563eb] rounded-3xl p-10 text-center space-y-6 relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />

          <div className="relative space-y-4">
            <span className="text-4xl">🚀</span>
            <h2
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              Sẵn Sàng Bắt Đầu Chưa?
            </h2>
            <p className="text-[#bfdbfe] text-base leading-relaxed max-w-md mx-auto">
              Chỉ mất 10 phút để biết chính xác trình độ của bạn và nhận lộ trình học phù hợp.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/kiem-tra"
              className="px-8 py-4 bg-white text-[#2563eb] font-bold rounded-xl hover:bg-[#eff6ff] transition-colors shadow-md text-sm sm:text-base"
            >
              Làm Bài Kiểm Tra Ngay →
            </Link>
          </div>

          <p className="relative text-xs text-[#93c5fd]">
            Miễn phí · Không cần đăng ký · Kết quả ngay lập tức
          </p>
        </motion.div>
      </div>
    </section>
  );
}
