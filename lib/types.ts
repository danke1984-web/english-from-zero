export type Skill = "nghe" | "doc" | "viet" | "noi";

export type Level = "so-cap" | "co-ban" | "trung-cap";

export interface SkillMeta {
  id: Skill;
  label: string;
  labelEn: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
}

// --- Question types ---

export interface BaseQuestion {
  id: string;
  skill: Skill;
  type: "mcq" | "fill" | "listen-mcq" | "self-rate";
  text: string;
  points: number;
}

export interface MCQQuestion extends BaseQuestion {
  type: "mcq";
  options: string[];
  correctIndex: number;
}

export interface FillQuestion extends BaseQuestion {
  type: "fill";
  blank: string; // sentence with ___ placeholder
  correctAnswers: string[]; // accepted variants
}

export interface ListenMCQQuestion extends BaseQuestion {
  type: "listen-mcq";
  ttsText: string; // text fed to Web Speech API
  options: string[];
  correctIndex: number;
}

export interface SelfRateQuestion extends BaseQuestion {
  type: "self-rate";
  descriptions: Record<1 | 2 | 3 | 4 | 5, string>;
}

export type Question =
  | MCQQuestion
  | FillQuestion
  | ListenMCQQuestion
  | SelfRateQuestion;

// --- Test state ---

export type Answer =
  | { type: "mcq" | "listen-mcq"; selectedIndex: number }
  | { type: "fill"; value: string }
  | { type: "self-rate"; rating: 1 | 2 | 3 | 4 | 5 };

export interface SkillScore {
  skill: Skill;
  raw: number;      // points earned
  total: number;    // points possible
  pct: number;      // 0–100
  level: Level;
}

export interface TestResult {
  scores: Record<Skill, SkillScore>;
  overallLevel: Level;
  completedAt: string; // ISO date
}

// --- Roadmap ---

export interface RoadmapPhase {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  duration: string;    // e.g. "2–3 tuần"
  skills: Skill[];
  topics: string[];
  resources: { label: string; url: string }[];
  targetLevel: Level;
}

export interface RoadmapConfig {
  level: Level;
  totalWeeks: string;
  phases: RoadmapPhase[];
}
