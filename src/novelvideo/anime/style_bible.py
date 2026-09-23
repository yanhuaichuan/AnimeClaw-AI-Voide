# SPDX-License-Identifier: Elastic-2.0
# Copyright (c) 2026 yanhuaichuan
"""Style lock — one look from episode 1 to episode 100."""

from __future__ import annotations

from novelvideo.anime.models import StyleBible

DEFAULT_NEGATIVES = [
    "wrong anatomy",
    "extra fingers",
    "different hair color",
    "different clothes",
    "inconsistent face",
    "wrong weapon hand",
    "western comic shading",
    "photorealistic skin",
    "text artifacts",
]


def default_style() -> StyleBible:
    return StyleBible(
        art_style="modern anime, sci-tech cyan-violet contrast, cinematic manga framing",
        line_style="clean ink, confident contours",
        color_palette=["#00d2ff", "#7042ff", "#07091a", "#e8f4ff", "#ff00e5"],
        lighting="cool cyan rim, violet bounce fill",
        character_rendering="stable face, signature accessories always visible",
        background_rendering="readable manga backgrounds, depth without noise",
        face_style="anime face, same bone structure every shot",
        eye_style="detailed iris, consistent eye color",
        shadow_style="cel shadow, two-tone with deep navy dusk",
        negative_profile=list(DEFAULT_NEGATIVES),
    )


def style_lock_lines(style: StyleBible) -> list[str]:
    palette = ", ".join(style.color_palette) if style.color_palette else ""
    return [
        line
        for line in (
            style.art_style,
            style.line_style,
            palette and f"palette: {palette}",
            style.lighting,
            style.character_rendering,
            style.face_style,
            style.eye_style,
            style.shadow_style,
        )
        if line
    ]


def negative_prompt(style: StyleBible) -> str:
    profile = style.negative_profile or DEFAULT_NEGATIVES
    return ", ".join(profile)
