// src/components/auth/CommentCarousel.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function CommentCarousel({ items, interval = 6000, auto = true }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!auto || paused || items.length <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [auto, paused, interval, items.length]);

  return (
    <>
      {/* Purple blurb */}
      <Box
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        sx={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 24,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          opacity: 0.9,
          p: 3,
          borderRadius: 3,
          marginBottom: 1,
        }}
      >
        <Box sx={{ position: "relative", minHeight: 96, }}>
          {items.map((m, idx) => (
            <Box
              key={idx}
              sx={{
                position: idx === i ? "relative" : "absolute",
                inset: 0,
                opacity: idx === i ? 1 : 0,
                transition: "opacity 400ms ease",
              }}
            >
              <Typography fontWeight={700} mb={1}>
                {m.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.95 }}>
                {m.body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 1,

        }}
      >
        {items.map((_, idx) => (
          <Box
            key={idx}
            role="button"
            aria-label={`Go to message ${idx + 1}`}
            onClick={() => setI(idx)}
            sx={{
              width: idx === i ? 10 : 8,
              height: idx === i ? 10 : 8,
              borderRadius: "50%",
              bgcolor: idx === i ? "#fff" : "rgba(255,255,255,0.6)",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </>
  );
}
