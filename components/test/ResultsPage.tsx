"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTestStore } from "@/store/testStore";
import { SKILL_META, LEVEL_META } from "@/lib/questions";
import { LevelBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Skill } from "@/lib/types";

const SKILLS: Skill[] = ["nghe", "doc", "viet", "noi"];

export function ResultsPage() {
  const router = useRouter();
  const { result, reset } = useTestStore();

  useEffect(() => {
    if (!result) router.replace("/kiem-tra");
  }, [result, router]);

  if (!result) return null;

  const { scores, overallLevel } = result;
  const levelMeta = LEVEL_META[overallLevel];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-[#e4e4e7] px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <a href="/" className="text-sm font-semibold text-[#0d0d0d]" style={{ fontFamily: "var(--font-bricolage)" }}>
            English<span className="text-[#2563eb]">FromZero</span>
          </a>
        </div>
      </header>

      <main className="px-4 py-10 max-w-2xl mx-auto space-y-6">
        {/* Overall result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-[#e4e4e7] p-6 text-center space-y-4 shadow-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-6xl"
          >
            {levelMeta.emoji}
          </motion.div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#a1a1aa]">
              Trình độ hiện tại của bạn
            </p>
            <LevelBadge level={overallLevel} />
            <p className="text-sm text-[#52525b] leading-relaxed max-w-sm mx-auto">
              {levelMeta.description}
            </p>
          </div>
        </motion.div>

        {/* Skill breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-2xl border border-[#e4e4e7] p-6 shadow-sm space-y-5"
        >
          <h2 className="text-base font-semibold text-[#0d0d0d]" style={{ fontFamily: "var(--font-bricolage)" }}>
            Chi tiết từng kỹ năng
          </h2>

          <div className="space-y-4">
            {SKILLS.map((skill, i) => {
              const score = scores[skill];
              const meta = SKILL_META[skill];
              const levelM = LEVEL_META[score.level];

              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{meta.icon}</span>
                      <span className="text-sm font-medium text-[#0d0d0d]">
                        {meta.label}
                        <span className="text-[#a1a1aa] font-normal ml-1 text-xs">
                          ({meta.labelEn})
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold" style={{ color: meta.color }}>
                        {score.pct}%
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: levelM.bgColor, color: levelM.color }}
                      >
                        {levelM.label}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2.5 bg-[#f1f3f5] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score.pct}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                  </div>

                  <p className="text-xs text-[#a1a1aa]">
                    {score.raw} / {score.total} điểm
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#eff6ff] rounded-2xl border border-[#bfdbfe] p-6 space-y-3"
        >
          <h2 className="text-base font-semibold text-[#1e40af]" style={{ fontFamily: "var(--font-bricolage)" }}>
            💡 Gợi ý cho bạn
          </h2>
          <RecommendationList scores={scores} overallLevel={overallLevel} />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button href="/lo-trinh" size="lg" fullWidth>
            Xem Lộ Trình Của Tôi →
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => {
              reset();
              router.push("/kiem-tra");
            }}
          >
            Làm Lại Bài Test
          </Button>
        </motion.div>
      </main>
    </div>
  );
}

function RecommendationList({
  scores,
  overallLevel,
}: {
  scores: ReturnType<typeof useTestStore.getState>["result"] extends null
    ? never
    : NonNullable<ReturnType<typeof useTestStore.getState>["result"]>["scores"];
  overallLevel: string;
}) {
  const weakSkills = SKILLS.filter((s) => (scores as Record<Skill, { pct: number }>)[s].pct < 50);
  const tips: string[] = [];

  if (weakSkills.includes("nghe")) {
    tips.push("Luyện nghe mỗi ngày 15 phút với podcast hoặc video YouTube có phụ đề.");
  }
  if (weakSkills.includes("doc")) {
    tips.push("Đọc 1 đoạn văn ngắn tiếng Anh mỗi ngày, tra từ mới và ghi chép.");
  }
  if (weakSkills.includes("viet")) {
    tips.push("Viết nhật ký tiếng Anh 3–5 câu mỗi ngày để luyện ngữ pháp.");
  }
  if (weakSkills.includes("noi")) {
    tips.push("Luyện nói một mình trước gương 10 phút/ngày với chủ đề quen thuộc.");
  }

  if (tips.length === 0) {
    tips.push("Bạn có nền tảng tốt! Tập trung vào luyện fluency và mở rộng từ vựng nâng cao.");
  }

  return (
    <ul className="space-y-2">
      {tips.map((tip, i) => (
        <li key={i} className="flex gap-2 text-sm text-[#1e40af]">
          <span className="mt-0.5 flex-shrink-0">→</span>
          <span>{tip}</span>
        </li>
      ))}
    </ul>
  );
}
