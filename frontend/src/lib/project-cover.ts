// SPDX-License-Identifier: Elastic-2.0
// Copyright (c) 2026 ClaymoreLab
// Deterministic cover art for projects — gradient + initial derived from the
// project name. Used until the backend API returns real thumbnail/genre data.

export interface CoverPaletteStop {
  gradient: string;
  name: string;
  primary: string;
}

// Sci-tech palette: indigo / violet / cyan — matches brand vortex.
export const PROJECT_COVER_PALETTE: CoverPaletteStop[] = [
  { name: "indigo", primary: "#4F46E5", gradient: "linear-gradient(145deg, #312E81 0%, #818CF8 100%)" },
  { name: "violet", primary: "#7C3AED", gradient: "linear-gradient(145deg, #4C1D95 0%, #C084FC 100%)" },
  { name: "cyan", primary: "#06B6D4", gradient: "linear-gradient(145deg, #0E7490 0%, #67E8F9 100%)" },
  { name: "magenta", primary: "#D946EF", gradient: "linear-gradient(145deg, #86198F 0%, #F0ABFC 100%)" },
  { name: "azure", primary: "#3B82F6", gradient: "linear-gradient(145deg, #1E3A8A 0%, #60A5FA 100%)" },
  { name: "plasma", primary: "#8B5CF6", gradient: "linear-gradient(145deg, #1E1B4B 0%, #A78BFA 55%, #22D3EE 100%)" },
  { name: "neon", primary: "#22D3EE", gradient: "linear-gradient(145deg, #164E63 0%, #22D3EE 100%)" },
  { name: "orbit", primary: "#6366F1", gradient: "linear-gradient(145deg, #312E81 0%, #F472B6 100%)" },
];

export const NOISE_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>` +
      `<filter id='n'>` +
      `<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>` +
      `<feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/>` +
      `</filter>` +
      `<rect width='100%' height='100%' filter='url(#n)' opacity='1'/>` +
    `</svg>`,
  );

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getProjectCover(name: string): {
  gradient: string;
  initial: string;
  paletteIndex: number;
  primary: string;
} {
  const trimmed = name.trim();
  const paletteIndex = hashString(trimmed) % PROJECT_COVER_PALETTE.length;
  const palette = PROJECT_COVER_PALETTE[paletteIndex];
  const initial = Array.from(trimmed)[0]?.toUpperCase() ?? "?";
  return { gradient: palette.gradient, initial, paletteIndex, primary: palette.primary };
}
