"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTestStore } from "@/store/testStore";
import { generateRoadmap } from "@/lib/generateRoadmap";
import { LEVEL_META, SKILL_META } from "@/lib/questions";
import { LevelBadge, SkillBadge } from "@/components/ui/Badge";
import { RoadmapCanvas } from "./RoadmapCanvas";
import { Button } from "@/components/ui/Button";
import type { Skill } from "@/lib/types";

export function RoadmapPageClient() {
  const router = useRouter();
  const { result } = useTestStore();

  useEffect(() => {
    if (!result) router.replace("/kiem-tra");
  }, [result, router]);

  const roadmap = useMemo(
    () => (result ? generateRoadmap(result.scores) : null),
    [result]
  );

  if (!result || !roadmap) return null;

  const levelMeta = LEVEL_META[roadmap.level];
  const weakSkills = (["nghe", "doc", "viet", "noi"] as Skill[]).filter(
    (s) => result.scores[s].pct < 50
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Navbar */}
      <header className="bg-white border-b border-[#e4e4e7] px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="text-sm font-bold text-[#0d0d0d]" style={{ fontFamily: "var(--font-bricolage)" }}>
            English<span className="text-[#2563eb]">FromZero</span>
          </a>
          <Button href="/ket-qua" variant="secondary" size="sm">
            ← Kết quả của tôi
          </Button>
        </div>
      </header>

      <main className="px-4 py-10 max-w-4xl mx-auto space-y-8">
        {/* Hero block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-[#e4e4e7] p-6 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#a1a1aa]">
                Lộ trình cá nhân hóa của bạn
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <h1
                  className="text-2xl font-bold text-[#0d0d0d]"
                  style={{ fontFamily: "var(--font-bricolage)" }}
                >
                  {levelMeta.emoji} Cấp độ {levelMeta.label}
                </h1>
                <LevelBadge level={roadmap.level} />
              </div>
              <p className="text-sm text-[#52525b]">{levelMeta.description}</p>
            </div>
            <div className="flex-shrink-0 text-right space-y-1">
              <p className="text-xs text-[#a1a1aa]">Thời gian ước tính</p>
              <p className="text-2xl font-bold text-[#2563eb]" style={{ fontFamily: "var(--font-bricolage)" }}>
                {roadmap.totalWeeks}
              </p>
              <p className="text-xs text-[#a1a1aa]">{roadmap.phases.length} giai đoạn</p>
            </div>
          </div>

          {/* Skill scores mini */}
          <div className="mt-5 pt-5 border-t border-[#e4e4e7] grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["nghe", "doc", "viet", "noi"] as Skill[]).map((skill) => {
              const score = result.scores[skill];
              const meta = SKILL_META[skill];
              return (
                <div key={skill} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <SkillBadge skill={skill} />
                    <span className="text-xs font-bold" style={{ color: meta.color }}>
                      {score.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#f1f3f5] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score.pct}%` }}
                      transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Focus areas */}
        {weakSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#fffbeb] rounded-2xl border border-[#fde68a] p-5"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">⚡</span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#92400e]">Ưu tiên luyện tập</p>
                <p className="text-sm text-[#78350f]">
                  Dựa trên kết quả của bạn, lộ trình ưu tiên các kỹ năng còn yếu:{" "}
                  {weakSkills.map((s) => SKILL_META[s].label).join(", ")}.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-[#e4e4e7] p-5 shadow-sm"
        >
          <div className="mb-6 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#a1a1aa]">
              Lộ trình học
            </p>
            <h2
              className="text-xl font-bold text-[#0d0d0d]"
              style={{ fontFamily: "var(--font-bricolage)" }}
            >
              {roadmap.phases.length} giai đoạn · {roadmap.totalWeeks}
            </h2>
            <p className="text-sm text-[#52525b]">
              Nhấn vào từng bước để xem nội dung và tài liệu chi tiết.
            </p>
          </div>

          <RoadmapCanvas phases={roadmap.phases} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 pb-10"
        >
          <Button href="/" variant="secondary" size="lg" fullWidth>
            ← Về trang chủ
          </Button>
          <Button href="/kiem-tra" size="lg" fullWidth>
            Làm lại bài kiểm tra
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
