import type { Skill, Level } from "@/lib/types";
import { SKILL_META, LEVEL_META } from "@/lib/questions";

export function SkillBadge({ skill }: { skill: Skill }) {
  const meta = SKILL_META[skill];
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: meta.bgColor, color: meta.color }}
    >
      <span>{meta.icon}</span>
      {meta.label}
    </span>
  );
}

export function LevelBadge({ level }: { level: Level }) {
  const meta = LEVEL_META[level];
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
      style={{ backgroundColor: meta.bgColor, color: meta.color }}
    >
      <span>{meta.emoji}</span>
      {meta.label}
    </span>
  );
}
