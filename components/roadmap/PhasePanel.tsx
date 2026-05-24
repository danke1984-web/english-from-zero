"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { RoadmapPhase, Skill } from "@/lib/types";
import { SKILL_META } from "@/lib/questions";
import { SkillBadge } from "@/components/ui/Badge";
import { ExternalLink, Clock, CheckCircle2, X } from "lucide-react";

interface Props {
  phase: RoadmapPhase;
  onClose: () => void;
}

export function PhasePanel({ phase, onClose }: Props) {
  const primarySkill = phase.skills[0] as Skill;
  const meta = SKILL_META[primarySkill];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl border border-[#e4e4e7] shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-start justify-between gap-3"
          style={{ backgroundColor: meta.bgColor }}
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ backgroundColor: meta.color, color: "#fff" }}
              >
                Bước {phase.order}
              </span>
              {phase.skills.map((s) => (
                <SkillBadge key={s} skill={s as Skill} />
              ))}
            </div>
            <h3
              className="text-lg font-bold leading-tight"
              style={{ fontFamily: "var(--font-bricolage)", color: meta.color }}
            >
              {phase.title}
            </h3>
            <p className="text-sm" style={{ color: meta.color, opacity: 0.8 }}>
              {phase.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-black/10 transition-colors"
          >
            <X size={16} style={{ color: meta.color }} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-5">
          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-[#52525b]">
            <Clock size={14} className="text-[#a1a1aa]" />
            <span>Thời gian ước tính: <strong className="text-[#0d0d0d]">{phase.duration}</strong></span>
          </div>

          {/* Topics */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#a1a1aa]">
              Nội dung học
            </h4>
            <ul className="space-y-2">
              {phase.topics.map((topic, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-2.5 text-sm text-[#0d0d0d]"
                >
                  <CheckCircle2
                    size={15}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: meta.color }}
                  />
                  {topic}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#a1a1aa]">
              Tài liệu gợi ý
            </h4>
            <div className="space-y-2">
              {phase.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#e4e4e7] hover:border-current transition-colors text-sm group"
                  style={{ color: meta.color }}
                >
                  <span className="text-[#0d0d0d] group-hover:text-[#0d0d0d] truncate">
                    {res.label}
                  </span>
                  <ExternalLink size={13} className="flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
