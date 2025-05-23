import React, { useState, useEffect } from "react";

// 음표별 색상 정의 (기존 Fretboard와 동일)
const NOTE_COLORS = {
  A: "#FF5252", // Red
  B: "#FF9800", // Orange
  C: "#FFEB3B", // Yellow
  D: "#4CAF50", // Green
  E: "#2196F3", // Blue
  F: "#673AB7", // Purple
  G: "#E91E63", // Pink
};

const MelodyNotes = ({ melody, playedCount, onPlayMelody }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!melody || melody.length === 0) {
    return (
      <div className="text-white text-center p-2">
        멜로디를 불러올 수 없습니다.
      </div>
    );
  }

  // 동적 크기 계산 함수
  const calculateOptimalSize = (melodyLength, screenWidth) => {
    // 기본 크기 정의 (가장 큰 크기)
    const sizes = [
      {
        noteSize: "w-16 h-16",
        textSize: "text-lg",
        gap: 12,
        padding: 24,
        name: "xl",
      }, // gap-3=12px, p-3=24px
      {
        noteSize: "w-14 h-14",
        textSize: "text-base",
        gap: 8,
        padding: 16,
        name: "lg",
      }, // gap-2=8px, p-2=16px
      {
        noteSize: "w-12 h-12",
        textSize: "text-sm",
        gap: 6,
        padding: 16,
        name: "md",
      }, // gap-1.5=6px, p-2=16px
      {
        noteSize: "w-10 h-10",
        textSize: "text-xs",
        gap: 4,
        padding: 8,
        name: "sm",
      }, // gap-1=4px, p-1=8px
    ];

    // 사용 가능한 width (컨테이너 패딩 제외)
    const availableWidth = screenWidth - 32; // px-2 = 16px 양쪽, 여유분 16px

    // 각 크기별로 필요한 총 width 계산
    for (let size of sizes) {
      const noteWidth = size.noteSize.includes("16")
        ? 64
        : size.noteSize.includes("14")
        ? 56
        : size.noteSize.includes("12")
        ? 48
        : 40;

      const totalWidth =
        noteWidth * melodyLength +
        size.gap * (melodyLength - 1) +
        size.padding * 2;

      // 이 크기로 한 줄에 들어간다면 사용
      if (totalWidth <= availableWidth) {
        return {
          noteSize: size.noteSize,
          textSize: size.textSize,
          gap:
            size.gap === 12
              ? "gap-3"
              : size.gap === 8
              ? "gap-2"
              : size.gap === 6
              ? "gap-1.5"
              : "gap-1",
          padding:
            size.padding === 24 ? "p-3" : size.padding === 16 ? "p-2" : "p-1",
        };
      }
    }

    // 가장 작은 크기도 안 된다면 가장 작은 크기 반환
    return {
      noteSize: "w-10 h-10",
      textSize: "text-xs",
      gap: "gap-1",
      padding: "p-1",
    };
  };

  const { noteSize, textSize, gap, padding } = calculateOptimalSize(
    melody.length,
    windowWidth
  );

  return (
    <div className="w-full">
      {/* 멜로디 음표들 */}
      <div
        className={`flex justify-center items-center flex-wrap ${gap} ${padding} bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors duration-200`}
        onClick={onPlayMelody}
      >
        {melody.map((note, index) => {
          const isPlayed = index < playedCount;

          return (
            <div
              key={`melody-note-${index}`}
              className={`
                ${noteSize} rounded-full flex items-center justify-center font-bold ${textSize}
                transition-all duration-300 transform relative
                ${
                  isPlayed
                    ? "bg-green-500 text-white shadow-lg scale-110"
                    : "bg-slate-600 text-slate-300 shadow-md hover:scale-105"
                }
              `}
              style={{
                border: isPlayed ? "2px solid #065F46" : "2px solid #475569",
              }}
            >
              {/* 음표 이름 */}
              <span className="text-center leading-tight">{note.noteName}</span>

              {/* 줄 번호 (우측 하단에 작게) */}
              <span
                className={`
                  absolute bottom-0 right-0.5 text-xs font-normal
                  ${isPlayed ? "text-green-200" : "text-slate-400"}
                `}
                style={{ fontSize: noteSize.includes("10") ? "6px" : "10px" }}
              >
                {note.string + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MelodyNotes;
