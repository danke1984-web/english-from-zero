"use client";

import { motion } from "framer-motion";
import { SKILL_META } from "@/lib/questions";
import type { Skill } from "@/lib/types";

const SKILLS: Skill[] = ["nghe", "doc", "viet", "noi"];

interface Props {
  currentSkillIndex: number;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export function ProgressBar({ currentSkillIndex, currentQuestionIndex, totalQuestions }: Props) {
  const questionPct = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="w-full space-y-4">
      {/* Skill steps */}
      <div className="flex items-center justify-between">
        {SKILLS.map((skill, i) => {
          const meta = SKILL_META[skill];
          const isDone = i < currentSkillIndex;
          const isCurrent = i === currentSkillIndex;

          return (
            <div key={skill} className="flex items-center flex-1">
              {/* Step circle */}
              <div className="flex flex-col items-center gap-1">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isDone ? "#16a34a" : isCurrent ? meta.color : "#e4e4e7",
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm"
                  style={{ color: isCurrent || isDone ? "#fff" : "#a1a1aa" }}
                >
                  {isDone ? "✓" : meta.icon}
                </motion.div>
                <span
                  className="text-xs font-medium"
                  style={{ color: isCurrent ? meta.color : isDone ? "#16a34a" : "#a1a1aa" }}
                >
                  {meta.label}
                </span>
              </div>

              {/* Connector line (not after last) */}
              {i < SKILLS.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 rounded-full overflow-hidden bg-[#e4e4e7]">
                  <motion.div
                    initial={false}
                    animate={{ width: isDone ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="h-full bg-[#16a34a] rounded-full"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Question progress within current skill */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-[#a1a1aa]">
          <span>
            Câu {currentQuestionIndex + 1} / {totalQuestions}
          </span>
          <span>{questionPct}%</span>
        </div>
        <div className="h-1.5 bg-[#f1f3f5] rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${questionPct}%` }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-full"
            style={{ backgroundColor: SKILL_META[SKILLS[currentSkillIndex]].color }}
          />
        </div>
      </div>
    </div>
  );
}
