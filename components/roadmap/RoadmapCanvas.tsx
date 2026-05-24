"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { RoadmapPhase, Skill } from "@/lib/types";
import { SKILL_META } from "@/lib/questions";
import { PhasePanel } from "./PhasePanel";

interface Props {
  phases: RoadmapPhase[];
  activePhaseId?: string;
}

// Winding path: nodes alternate left-center-right
// SVG viewBox: 0 0 320 (phases * 140)
const NODE_X = {
  left: 60,
  center: 160,
  right: 260,
};
const ROW_H = 140;
const NODE_R = 28;

type Column = "left" | "center" | "right";
const COLUMN_PATTERN: Column[] = ["center", "right", "center", "left", "center", "right"];

function getNodePositions(phases: RoadmapPhase[]) {
  return phases.map((phase, i) => ({
    phase,
    x: NODE_X[COLUMN_PATTERN[i % COLUMN_PATTERN.length]],
    y: 60 + i * ROW_H,
  }));
}

function buildPathD(nodes: { x: number; y: number }[]): string {
  if (nodes.length === 0) return "";
  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1];
    const cur = nodes[i];
    // Smooth cubic bezier curve
    const cpY = prev.y + (cur.y - prev.y) * 0.5;
    d += ` C ${prev.x} ${cpY}, ${cur.x} ${cpY}, ${cur.x} ${cur.y}`;
  }
  return d;
}

export function RoadmapCanvas({ phases, activePhaseId }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const nodes = getNodePositions(phases);
  const svgH = 60 + (phases.length - 1) * ROW_H + 60;
  const pathD = buildPathD(nodes);
  const selectedPhase = phases.find((p) => p.id === selectedId) ?? null;

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* SVG roadmap */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <svg
            viewBox={`0 0 320 ${svgH}`}
            width="100%"
            style={{ maxHeight: svgH }}
            aria-label="Lộ trình học tiếng Anh"
          >
            {/* Dashed background path */}
            <path
              d={pathD}
              fill="none"
              stroke="#e4e4e7"
              strokeWidth="3"
              strokeDasharray="8 6"
            />

            {/* Animated foreground path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Nodes */}
            {nodes.map(({ phase, x, y }, i) => {
              const isSelected = selectedId === phase.id;
              const isActive = activePhaseId === phase.id;
              const primarySkill = phase.skills[0] as Skill;
              const meta = SKILL_META[primarySkill];

              return (
                <g key={phase.id}>
                  {/* Outer ring animation for active */}
                  {isActive && (
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={NODE_R + 8}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: [0.4, 0], scale: [1, 1.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  {/* Node circle */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={NODE_R}
                    fill={isSelected ? meta.color : isActive ? "#2563eb" : "#fff"}
                    stroke={isSelected ? meta.color : isActive ? "#2563eb" : "#e4e4e7"}
                    strokeWidth="2.5"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 180 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(selectedId === phase.id ? null : phase.id)}
                    style={{ filter: isSelected ? `drop-shadow(0 0 8px ${meta.color}60)` : "none" }}
                  />

                  {/* Step number */}
                  <motion.text
                    x={x}
                    y={y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill={isSelected || isActive ? "#fff" : "#52525b"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="cursor-pointer select-none"
                    onClick={() => setSelectedId(selectedId === phase.id ? null : phase.id)}
                  >
                    {phase.order}
                  </motion.text>

                  {/* Label beside node */}
                  <motion.foreignObject
                    x={x < 160 ? x + NODE_R + 8 : 4}
                    y={y - 20}
                    width={x < 160 ? 320 - x - NODE_R - 12 : x - NODE_R - 12}
                    height={44}
                    initial={{ opacity: 0, x: x < 160 ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                  >
                    <div
                      className={`text-xs leading-tight cursor-pointer ${x < 160 ? "text-left" : "text-right"}`}
                      onClick={() => setSelectedId(selectedId === phase.id ? null : phase.id)}
                    >
                      <div className="font-semibold text-[#0d0d0d] truncate">{phase.title}</div>
                      <div className="text-[#a1a1aa] truncate">{phase.duration}</div>
                    </div>
                  </motion.foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Phase detail panel */}
        <div className="flex-1 w-full">
          {selectedPhase ? (
            <PhasePanel
              phase={selectedPhase}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-48 lg:h-64 rounded-2xl border-2 border-dashed border-[#e4e4e7] text-center p-6"
            >
              <span className="text-3xl mb-3">👆</span>
              <p className="text-sm text-[#a1a1aa]">
                Nhấn vào bất kỳ bước nào trên lộ trình để xem chi tiết
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
