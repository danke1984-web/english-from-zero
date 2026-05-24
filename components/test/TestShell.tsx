"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTestStore } from "@/store/testStore";
import { QUESTIONS, SKILL_META } from "@/lib/questions";
import { ProgressBar } from "./ProgressBar";
import {
  MCQRenderer,
  FillRenderer,
  ListenMCQRenderer,
  SelfRateRenderer,
} from "./QuestionRenderers";
import { Button } from "@/components/ui/Button";
import type { Skill, Question, Answer } from "@/lib/types";

const SKILLS: Skill[] = ["nghe", "doc", "viet", "noi"];

export function TestShell() {
  const router = useRouter();
  const {
    currentSkillIndex,
    currentQuestionIndex,
    answers,
    result,
    setAnswer,
    nextQuestion,
    prevQuestion,
    submitSkill,
    reset,
  } = useTestStore();

  const currentSkill = SKILLS[currentSkillIndex];
  const skillQs = QUESTIONS.filter((q) => q.skill === currentSkill);
  const currentQ = skillQs[currentQuestionIndex];
  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;
  const isLastQuestion = currentQuestionIndex === skillQs.length - 1;
  const isLastSkill = currentSkillIndex === SKILLS.length - 1;
  const meta = SKILL_META[currentSkill];

  useEffect(() => {
    if (result) {
      router.push("/ket-qua");
    }
  }, [result, router]);

  const handleAnswerChange = (ans: Answer) => {
    if (currentQ) setAnswer(currentQ.id, ans);
  };

  const handleSkip = () => {
    // Mark as explicitly skipped (no answer stored) then advance
    if (isLastQuestion) {
      submitSkill();
    } else {
      nextQuestion();
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      submitSkill();
    } else {
      nextQuestion();
    }
  };

  const canProceed = currentAnswer !== undefined;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[#e4e4e7] px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <a href="/" className="text-sm font-semibold text-[#0d0d0d]" style={{ fontFamily: "var(--font-bricolage)" }}>
            English<span className="text-[#2563eb]">FromZero</span>
          </a>
          <button
            onClick={() => {
              if (confirm("Bạn có chắc muốn thoát? Kết quả sẽ bị mất.")) {
                reset();
                router.push("/");
              }
            }}
            className="text-sm text-[#a1a1aa] hover:text-[#0d0d0d] transition-colors"
          >
            Thoát ✕
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-[#e4e4e7] px-4 py-5 bg-[#f8f9fa]">
        <div className="max-w-2xl mx-auto">
          <ProgressBar
            currentSkillIndex={currentSkillIndex}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={skillQs.length}
          />
        </div>
      </div>

      {/* Question area */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Skill label */}
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: meta.bgColor, color: meta.color }}
            >
              {meta.icon} Kỹ năng {meta.label}
            </span>
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSkillIndex}-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="space-y-5"
            >
              {/* Question text */}
              <div className="space-y-1">
                <p className="text-xs text-[#a1a1aa] font-medium">
                  Câu {currentQuestionIndex + 1}
                </p>
                <h2 className="text-lg font-semibold text-[#0d0d0d] leading-snug whitespace-pre-line">
                  {currentQ?.text}
                </h2>
              </div>

              {/* Renderer */}
              {currentQ && renderQuestion(currentQ, currentAnswer, handleAnswerChange)}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer nav */}
      <div className="border-t border-[#e4e4e7] px-4 py-4 bg-white sticky bottom-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0 && currentSkillIndex === 0}
          >
            ← Quay lại
          </Button>

          <div className="flex items-center gap-2">
            {!canProceed && (
              <Button
                variant="ghost"
                size="md"
                onClick={handleSkip}
                className="text-[#a1a1aa] hover:text-[#52525b]"
              >
                Bỏ qua
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              disabled={!canProceed}
            >
              {isLastQuestion && isLastSkill
                ? "Xem Kết Quả 🎉"
                : isLastQuestion
                ? `Tiếp theo: ${SKILL_META[SKILLS[currentSkillIndex + 1]]?.label} →`
                : "Câu tiếp theo →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderQuestion(q: Question, answer: Answer | undefined, onChange: (a: Answer) => void) {
  switch (q.type) {
    case "mcq":
      return <MCQRenderer question={q} answer={answer} onChange={onChange} />;
    case "fill":
      return <FillRenderer question={q} answer={answer} onChange={onChange} />;
    case "listen-mcq":
      return <ListenMCQRenderer question={q} answer={answer} onChange={onChange} />;
    case "self-rate":
      return <SelfRateRenderer question={q} answer={answer} onChange={onChange} />;
  }
}
