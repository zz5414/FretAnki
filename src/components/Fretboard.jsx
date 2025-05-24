import React from "react";
import { getNote } from "../utils/guitarLogic";

// Define colors for each note (A through G)
const NOTE_COLORS = {
  A: "#FF5252", // Red
  B: "#FF9800", // Orange
  C: "#FFEB3B", // Yellow
  D: "#4CAF50", // Green
  E: "#2196F3", // Blue
  F: "#673AB7", // Purple
  G: "#E91E63", // Pink
};

const Fretboard = ({
  onNoteSelect,
  highlightCorrectAnswer,
  selectedNote: propSelectedNote,
  showAnswerLabel,
  tutorialMode,
  showAllNotes,
  tutorialNotes,
  showLocationHints = false,
  hintLocations = [],
}) => {
  const numStrings = 6;
  const numFrets = 12;

  // 프렛 마커가 있는 프렛들
  const fretMarkers = [3, 5, 7, 9, 12];
  const doubleDotFret = 12;

  const handleNoteClick = (stringIndex, fretNum) => {
    if (onNoteSelect) {
      onNoteSelect(stringIndex, fretNum);
    }
  };

  // 노트를 표시할지 결정하는 함수
  const shouldShowNote = (stringIdx, fretIdx) => {
    if (tutorialMode) {
      if (tutorialNotes && tutorialNotes.length > 0) {
        return tutorialNotes.some(
          (note) => note.string === stringIdx && note.fret === fretIdx
        );
      }
      return false;
    }

    if (showAllNotes) return true;

    if (
      showAnswerLabel &&
      highlightCorrectAnswer &&
      highlightCorrectAnswer.string === stringIdx &&
      highlightCorrectAnswer.fret === fretIdx
    ) {
      return true;
    }

    return false;
  };

  // 위치 힌트를 표시할지 확인
  const shouldShowHint = (stringIdx, fretIdx) => {
    if (!showLocationHints || !hintLocations || hintLocations.length === 0) {
      return false;
    }
    return hintLocations.some(
      (location) => location.string === stringIdx && location.fret === fretIdx
    );
  };

  // 선택된 노트인지 확인
  const isSelectedNote = (stringIdx, fretIdx) => {
    return (
      propSelectedNote &&
      propSelectedNote.string === stringIdx &&
      propSelectedNote.fret === fretIdx
    );
  };

  // 정답 하이라이트인지 확인
  const isCorrectAnswer = (stringIdx, fretIdx) => {
    return (
      highlightCorrectAnswer &&
      highlightCorrectAnswer.string === stringIdx &&
      highlightCorrectAnswer.fret === fretIdx
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-start py-4">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* 프렛보드 메인 컨테이너 */}
        <div className="relative bg-amber-800 rounded-lg shadow-2xl overflow-hidden">
          {/* 프렛보드 배경 (기타 넥) */}
          <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-b from-amber-800 to-amber-900">
            {/* 기타 줄들 */}
            {Array.from({ length: numStrings }, (_, stringIndex) => (
              <div
                key={`string-${stringIndex}`}
                className="absolute left-0 right-0 bg-gray-300 z-30"
                style={{
                  top: `${((stringIndex + 0.5) / numStrings) * 100}%`,
                  height: `${1.5 + stringIndex * 0.5}px`,
                  transform: "translateY(-50%)",
                  boxShadow:
                    "0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)",
                  background:
                    "linear-gradient(to bottom, #d1d5db, #9ca3af, #6b7280)",
                }}
              ></div>
            ))}

            {/* 너트 (0프렛과 1프렛 사이의 굵은 선) */}
            <div
              className="absolute top-0 bottom-0 w-4 bg-yellow-50 z-20"
              style={{
                left: "7%",
                boxShadow:
                  "2px 0 4px rgba(0, 0, 0, 0.4), inset -2px 0 3px rgba(0, 0, 0, 0.2)",
                background:
                  "linear-gradient(to right, #fefce8, #fef3c7, #fefce8)",
              }}
            ></div>

            {/* 프렛 와이어들 (1-12프렛) - 더 선명하고 밝은 은색 */}
            {Array.from({ length: numFrets }, (_, fretIndex) => (
              <div
                key={`fret-wire-${fretIndex + 1}`}
                className="absolute top-0 bottom-0 w-1 bg-gray-50 z-25"
                style={{
                  left: `${7 + ((fretIndex + 1) / numFrets) * 86}%`,
                  boxShadow:
                    "inset 1px 0 2px rgba(0, 0, 0, 0.3), inset -1px 0 2px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 255, 255, 0.9)",
                  background:
                    "linear-gradient(to right, #f8fafc, #e2e8f0, #f8fafc)",
                }}
              ></div>
            ))}

            {/* 프렛 마커들 */}
            {fretMarkers.map((fretNum) => (
              <div
                key={`fret-marker-${fretNum}`}
                className="absolute z-5"
                style={{
                  left: `${7 + ((fretNum - 0.5) / numFrets) * 86}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {fretNum === doubleDotFret ? (
                  <>
                    <div className="w-3 h-3 bg-yellow-200 rounded-full mb-3 opacity-60"></div>
                    <div className="w-3 h-3 bg-yellow-200 rounded-full opacity-60"></div>
                  </>
                ) : (
                  <div className="w-3 h-3 bg-yellow-200 rounded-full opacity-60"></div>
                )}
              </div>
            ))}

            {/* 클릭 가능한 영역들과 노트 표시 */}
            {Array.from({ length: numStrings }, (_, stringIndex) => (
              <div
                key={`string-row-${stringIndex}`}
                className="absolute w-full"
                style={{
                  top: `${(stringIndex / numStrings) * 100}%`,
                  height: `${100 / numStrings}%`,
                }}
              >
                {/* 0프렛 (오픈 스트링) - 너트 왼쪽 */}
                <div
                  className="absolute h-full cursor-pointer z-30"
                  style={{
                    left: "0%",
                    width: "7%",
                  }}
                  onClick={() => handleNoteClick(stringIndex, 0)}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* 위치 힌트 */}
                    {shouldShowHint(stringIndex, 0) && (
                      <div className="absolute w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-slate-400 bg-opacity-30 border border-slate-400 border-opacity-60 rounded-full"></div>
                    )}

                    {/* 선택된 노트 표시 */}
                    {isSelectedNote(stringIndex, 0) && (
                      <div
                        className={`absolute w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full ${
                          propSelectedNote?.isCorrect
                            ? "bg-green-400 bg-opacity-75"
                            : "bg-red-400 bg-opacity-75"
                        } border-2 border-white z-40`}
                      ></div>
                    )}

                    {/* 정답 하이라이트 */}
                    {isCorrectAnswer(stringIndex, 0) && (
                      <div className="absolute w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 border-3 border-red-600 rounded-full z-40"></div>
                    )}

                    {/* 노트 표시 */}
                    {shouldShowNote(stringIndex, 0) && (
                      <div
                        className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg z-50"
                        style={{
                          backgroundColor:
                            NOTE_COLORS[getNote(stringIndex, 0)?.charAt(0)] ||
                            "#FFFFFF",
                          color:
                            getNote(stringIndex, 0)?.charAt(0) === "C"
                              ? "#000000"
                              : "#FFFFFF",
                        }}
                      >
                        {getNote(stringIndex, 0)}
                      </div>
                    )}
                  </div>
                </div>

                {/* 1-12프렛 */}
                {Array.from({ length: numFrets }, (_, fretIndex) => {
                  const fretNum = fretIndex + 1;
                  const note = getNote(stringIndex, fretNum);
                  const baseNote = note?.charAt(0);
                  const noteColor = NOTE_COLORS[baseNote] || "#FFFFFF";
                  const textColor = baseNote === "C" ? "#000000" : "#FFFFFF";

                  return (
                    <div
                      key={`fret-${stringIndex}-${fretNum}`}
                      className="absolute h-full cursor-pointer z-30"
                      style={{
                        left: `${7 + (fretIndex / numFrets) * 86}%`,
                        width: `${86 / numFrets}%`,
                      }}
                      onClick={() => handleNoteClick(stringIndex, fretNum)}
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* 위치 힌트 */}
                        {shouldShowHint(stringIndex, fretNum) && (
                          <div className="absolute w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-slate-400 bg-opacity-30 border border-slate-400 border-opacity-60 rounded-full"></div>
                        )}

                        {/* 선택된 노트 표시 */}
                        {isSelectedNote(stringIndex, fretNum) && (
                          <div
                            className={`absolute w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full ${
                              propSelectedNote?.isCorrect
                                ? "bg-green-400 bg-opacity-75"
                                : "bg-red-400 bg-opacity-75"
                            } border-2 border-white z-40`}
                          ></div>
                        )}

                        {/* 정답 하이라이트 */}
                        {isCorrectAnswer(stringIndex, fretNum) && (
                          <div className="absolute w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 border-3 border-red-600 rounded-full z-40"></div>
                        )}

                        {/* 노트 표시 */}
                        {shouldShowNote(stringIndex, fretNum) && (
                          <div
                            className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg z-50"
                            style={{
                              backgroundColor: noteColor,
                              color: textColor,
                            }}
                          >
                            {note}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fretboard;
