"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Skill, Answer, TestResult, SkillScore, Level } from "@/lib/types";
import { QUESTIONS } from "@/lib/questions";

interface TestStore {
  // Progress
  currentSkillIndex: number;
  currentQuestionIndex: number;
  answers: Record<string, Answer>; // questionId → answer

  // Result
  result: TestResult | null;

  // Actions
  setAnswer: (questionId: string, answer: Answer) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitSkill: () => void;
  computeResult: () => void;
  reset: () => void;

  // Derived
  getCurrentSkill: () => Skill;
  getCurrentQuestions: () => typeof QUESTIONS;
  getProgress: () => { skill: number; question: number; totalSkills: number; totalQuestions: number };
}

const SKILLS: Skill[] = ["nghe", "doc", "viet", "noi"];

function scoreSkill(skill: Skill, answers: Record<string, Answer>): SkillScore {
  const qs = QUESTIONS.filter((q) => q.skill === skill);
  let raw = 0;
  const total = qs.reduce((s, q) => s + q.points, 0);

  for (const q of qs) {
    const ans = answers[q.id];
    if (!ans) continue;

    if ((q.type === "mcq" || q.type === "listen-mcq") && ans.type === q.type) {
      if (ans.selectedIndex === (q as { correctIndex: number }).correctIndex) raw += q.points;
    } else if (q.type === "fill" && ans.type === "fill") {
      const correct = (q as { correctAnswers: string[] }).correctAnswers.map((a) =>
        a.toLowerCase().trim()
      );
      if (correct.includes(ans.value.toLowerCase().trim())) raw += q.points;
    } else if (q.type === "self-rate" && ans.type === "self-rate") {
      // 1→0pts, 2→25%, 3→50%, 4→75%, 5→100%
      raw += Math.round(((ans.rating - 1) / 4) * q.points);
    }
  }

  const pct = total > 0 ? Math.round((raw / total) * 100) : 0;
  const level: Level = pct <= 40 ? "so-cap" : pct <= 70 ? "co-ban" : "trung-cap";

  return { skill, raw, total, pct, level };
}

export const useTestStore = create<TestStore>()(
  persist(
    (set, get) => ({
      currentSkillIndex: 0,
      currentQuestionIndex: 0,
      answers: {},
      result: null,

      setAnswer: (questionId, answer) =>
        set((s) => ({ answers: { ...s.answers, [questionId]: answer } })),

      nextQuestion: () => {
        const { currentSkillIndex, currentQuestionIndex } = get();
        const skillQs = QUESTIONS.filter((q) => q.skill === SKILLS[currentSkillIndex]);
        if (currentQuestionIndex < skillQs.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
      },

      prevQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
      },

      submitSkill: () => {
        const { currentSkillIndex } = get();
        if (currentSkillIndex < SKILLS.length - 1) {
          set({ currentSkillIndex: currentSkillIndex + 1, currentQuestionIndex: 0 });
        } else {
          get().computeResult();
        }
      },

      computeResult: () => {
        const { answers } = get();
        const scores = {} as Record<Skill, SkillScore>;
        for (const skill of SKILLS) {
          scores[skill] = scoreSkill(skill, answers);
        }
        const avgPct = Math.round(
          SKILLS.reduce((s, sk) => s + scores[sk].pct, 0) / SKILLS.length
        );
        const overallLevel: Level = avgPct <= 40 ? "so-cap" : avgPct <= 70 ? "co-ban" : "trung-cap";
        set({
          result: { scores, overallLevel, completedAt: new Date().toISOString() },
        });
      },

      reset: () =>
        set({ currentSkillIndex: 0, currentQuestionIndex: 0, answers: {}, result: null }),

      getCurrentSkill: () => SKILLS[get().currentSkillIndex],

      getCurrentQuestions: () => {
        const skill = SKILLS[get().currentSkillIndex];
        return QUESTIONS.filter((q) => q.skill === skill);
      },

      getProgress: () => {
        const { currentSkillIndex, currentQuestionIndex } = get();
        const skillQs = QUESTIONS.filter((q) => q.skill === SKILLS[currentSkillIndex]);
        return {
          skill: currentSkillIndex,
          question: currentQuestionIndex,
          totalSkills: SKILLS.length,
          totalQuestions: skillQs.length,
        };
      },
    }),
    {
      name: "efz-test-state",
      storage: {
        getItem: (k) => {
          if (typeof window === "undefined") return null;
          const v = sessionStorage.getItem(k);
          return v ? JSON.parse(v) : null;
        },
        setItem: (k, v) => sessionStorage.setItem(k, JSON.stringify(v)),
        removeItem: (k) => sessionStorage.removeItem(k),
      },
    }
  )
);
