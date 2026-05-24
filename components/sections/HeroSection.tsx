"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SKILLS = [
  { icon: "🎧", label: "Nghe", color: "#7c3aed", bg: "#f5f3ff" },
  { icon: "📖", label: "Đọc", color: "#0891b2", bg: "#ecfeff" },
  { icon: "✍️", label: "Viết", color: "#059669", bg: "#ecfdf5" },
  { icon: "🎤", label: "Nói", color: "#ea580c", bg: "#fff7ed" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-white overflow-hidden">
      {/* Background grid decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#0d0d0d 1px, transparent 1px), linear-gradient(90deg, #0d0d0d 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#eff6ff] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#f5f3ff] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center space-y-8">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eff6ff] text-[#2563eb] text-xs font-semibold uppercase tracking-widest border border-[#bfdbfe]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
            Miễn phí · Cá nhân hóa · Cho người mất gốc
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0d0d0d] leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          Học Tiếng Anh<br />
          <span className="text-[#2563eb]">Từ Đầu</span> — Đúng Cách
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#52525b] leading-relaxed max-w-xl mx-auto"
        >
          Kiểm tra trình độ <strong className="text-[#0d0d0d]">4 kỹ năng</strong> trong 10 phút.
          Nhận lộ trình học <strong className="text-[#0d0d0d]">cá nhân hóa</strong> hoàn toàn miễn phí.
        </motion.p>

        {/* Skill badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          {SKILLS.map((s, i) => (
            <motion.span
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 200 }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border"
              style={{ backgroundColor: s.bg, color: s.color, borderColor: s.color + "30" }}
            >
              <span className="text-base">{s.icon}</span>
              {s.label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/kiem-tra"
            className="px-8 py-4 bg-[#2563eb] text-white font-semibold rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
          >
            Bắt Đầu Kiểm Tra Ngay →
          </Link>
          <a
            href="#cach-hoat-dong"
            className="px-6 py-4 text-sm text-[#52525b] hover:text-[#0d0d0d] transition-colors"
          >
            Tìm hiểu thêm ↓
          </a>
        </motion.div>

        {/* Social proof numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-8 pt-4 border-t border-[#e4e4e7]"
        >
          {[
            { num: "10 phút", label: "làm bài test" },
            { num: "4 kỹ năng", label: "đánh giá toàn diện" },
            { num: "100%", label: "miễn phí" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-bold text-[#0d0d0d]" style={{ fontFamily: "var(--font-bricolage)" }}>
                {stat.num}
              </div>
              <div className="text-xs text-[#a1a1aa]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
