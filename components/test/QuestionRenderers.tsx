"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type {
  MCQQuestion,
  FillQuestion,
  ListenMCQQuestion,
  SelfRateQuestion,
  Answer,
} from "@/lib/types";

// ─── MCQ ─────────────────────────────────────────────────────────────────────

interface MCQProps {
  question: MCQQuestion;
  answer?: Answer;
  onChange: (ans: Answer) => void;
}

export function MCQRenderer({ question, answer, onChange }: MCQProps) {
  const selected = answer?.type === "mcq" ? answer.selectedIndex : null;

  return (
    <div className="space-y-3">
      {question.options.map((opt, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange({ type: "mcq", selectedIndex: i })}
          className={[
            "w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm transition-all duration-150",
            selected === i
              ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb] font-medium"
              : "border-[#e4e4e7] bg-white text-[#0d0d0d] hover:border-[#2563eb] hover:bg-[#f8f9ff]",
          ].join(" ")}
        >
          <span className="flex items-center gap-3">
            <span
              className={[
                "w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold",
                selected === i
                  ? "border-[#2563eb] bg-[#2563eb] text-white"
                  : "border-[#e4e4e7] text-[#a1a1aa]",
              ].join(" ")}
            >
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// ─── Fill in the blank ───────────────────────────────────────────────────────

interface FillProps {
  question: FillQuestion;
  answer?: Answer;
  onChange: (ans: Answer) => void;
}

export function FillRenderer({ question, answer, onChange }: FillProps) {
  const value = answer?.type === "fill" ? answer.value : "";
  const parts = question.blank.split("___");

  return (
    <div className="space-y-4">
      <div className="p-4 bg-[#f8f9fa] rounded-xl text-sm text-[#0d0d0d] leading-relaxed">
        {parts[0]}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange({ type: "fill", value: e.target.value })}
          placeholder="Nhập câu trả lời..."
          className="inline-block mx-1 px-3 py-1 border-b-2 border-[#2563eb] bg-transparent text-[#2563eb] font-medium focus:outline-none w-32 text-center"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {parts[1]}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange({ type: "fill", value: e.target.value })}
        placeholder="Nhập câu trả lời của bạn..."
        className="w-full px-4 py-3 rounded-xl border-2 border-[#e4e4e7] focus:border-[#2563eb] focus:outline-none text-sm transition-colors"
      />
    </div>
  );
}

// ─── Listen MCQ (TTS) ────────────────────────────────────────────────────────

interface ListenProps {
  question: ListenMCQQuestion;
  answer?: Answer;
  onChange: (ans: Answer) => void;
}

export function ListenMCQRenderer({ question, answer, onChange }: ListenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const selected = answer?.type === "listen-mcq" ? answer.selectedIndex : null;

  const speak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(question.ttsText);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      setHasPlayed(true);
    };
    window.speechSynthesis.speak(utterance);
  }, [question.ttsText]);

  return (
    <div className="space-y-5">
      {/* Audio player */}
      <div className="flex flex-col items-center gap-4 p-6 bg-[#f5f3ff] rounded-2xl border border-[#ddd6fe]">
        <button
          onClick={speak}
          disabled={isPlaying}
          className={[
            "w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-all",
            isPlaying
              ? "bg-[#7c3aed] recording-pulse cursor-not-allowed"
              : "bg-[#7c3aed] hover:bg-[#6d28d9] hover:scale-105",
          ].join(" ")}
          aria-label="Phát audio"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        {/* Waveform animation */}
        <div className="flex items-center gap-1 h-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={[
                "w-1.5 rounded-full",
                isPlaying ? "wave-bar bg-[#7c3aed]" : "bg-[#ddd6fe]",
              ].join(" ")}
              style={{ height: isPlaying ? "100%" : "30%" }}
            />
          ))}
        </div>

        <p className="text-xs text-[#7c3aed] font-medium">
          {isPlaying
            ? "Đang phát..."
            : hasPlayed
            ? "Nhấn để nghe lại"
            : "Nhấn để nghe"}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange({ type: "listen-mcq", selectedIndex: i })}
            className={[
              "w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm transition-all duration-150",
              selected === i
                ? "border-[#7c3aed] bg-[#f5f3ff] text-[#7c3aed] font-medium"
                : "border-[#e4e4e7] bg-white text-[#0d0d0d] hover:border-[#7c3aed] hover:bg-[#faf8ff]",
            ].join(" ")}
          >
            <span className="flex items-center gap-3">
              <span
                className={[
                  "w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold",
                  selected === i
                    ? "border-[#7c3aed] bg-[#7c3aed] text-white"
                    : "border-[#e4e4e7] text-[#a1a1aa]",
                ].join(" ")}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Self Rate (Speaking) ────────────────────────────────────────────────────

interface SelfRateProps {
  question: SelfRateQuestion;
  answer?: Answer;
  onChange: (ans: Answer) => void;
}

export function SelfRateRenderer({ question, answer, onChange }: SelfRateProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const rating = answer?.type === "self-rate" ? answer.rating : null;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setHasRecorded(true);
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);

      // Auto stop after 35 seconds
      setTimeout(() => {
        if (recorder.state === "recording") recorder.stop();
      }, 35000);
    } catch {
      alert("Không thể truy cập microphone. Vui lòng cho phép quyền truy cập.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder?.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Recording area */}
      <div className="p-5 bg-[#fff7ed] rounded-2xl border border-[#fed7aa] space-y-4">
        <p className="text-sm text-[#7c2d12] font-medium">Bước 1: Ghi âm bản thân</p>
        <div className="flex items-center gap-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={[
              "w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-md transition-all",
              isRecording
                ? "bg-[#dc2626] recording-pulse"
                : "bg-[#ea580c] hover:bg-[#c2410c] hover:scale-105",
            ].join(" ")}
          >
            {isRecording ? "⏹" : "🎤"}
          </button>
          <div>
            {isRecording ? (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
                <span className="text-sm text-[#dc2626] font-medium">Đang ghi âm...</span>
              </div>
            ) : hasRecorded ? (
              <span className="text-sm text-[#16a34a] font-medium">✓ Đã ghi âm</span>
            ) : (
              <span className="text-sm text-[#ea580c]">Nhấn để bắt đầu (tối đa 35 giây)</span>
            )}
          </div>
        </div>

        {audioUrl && (
          <div className="space-y-1">
            <p className="text-xs text-[#7c2d12] font-medium">Nghe lại:</p>
            <audio controls src={audioUrl} className="w-full h-8" />
          </div>
        )}
      </div>

      {/* Self rating */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-[#0d0d0d]">
          Bước 2: Tự đánh giá bản thân
        </p>
        {([1, 2, 3, 4, 5] as const).map((r) => (
          <motion.button
            key={r}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange({ type: "self-rate", rating: r })}
            className={[
              "w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm transition-all duration-150",
              rating === r
                ? "border-[#ea580c] bg-[#fff7ed] text-[#ea580c] font-medium"
                : "border-[#e4e4e7] bg-white text-[#0d0d0d] hover:border-[#ea580c]",
            ].join(" ")}
          >
            <span className="flex items-center gap-3">
              <span
                className={[
                  "w-7 h-7 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold",
                  rating === r
                    ? "border-[#ea580c] bg-[#ea580c] text-white"
                    : "border-[#e4e4e7] text-[#a1a1aa]",
                ].join(" ")}
              >
                {r}
              </span>
              <span>{question.descriptions[r]}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
