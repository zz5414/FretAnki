import React from "react";

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
  if (!melody || melody.length === 0) {
    return (
      <div className="text-white text-center p-4">
        멜로디를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {/* 멜로디 음표들 */}
      <div
        className="flex justify-center items-center flex-wrap gap-3 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors duration-200"
        onClick={onPlayMelody}
      >
        {melody.map((note, index) => {
          const isPlayed = index < playedCount;

          return (
            <div
              key={`melody-note-${index}`}
              className={`
                w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg
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
                  absolute bottom-0 right-1 text-xs font-normal
                  ${isPlayed ? "text-green-200" : "text-slate-400"}
                `}
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
