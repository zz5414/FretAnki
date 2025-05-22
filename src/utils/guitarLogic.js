// src/utils/guitarLogic.js

import GUITAR_NOTES_MAP from "../data/fretMap";

// String 0 is High E (1st string, top of UI), String 5 is Low E (6th string, bottom of UI)
export const STRING_TUNINGS_NOTES = ["E", "B", "G", "D", "A", "E"]; // High E to Low E
const STRING_TUNINGS_OCTAVES = [4, 3, 3, 3, 2, 2]; // Octaves for open strings (High E4, B3, G3, D3, A2, E2)
const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

// Pre-generate all notes with octaves for faster lookup if possible
const ALL_NOTES_WITH_OCTAVES = [];
for (let octave = 0; octave < 8; octave++) {
  // Generate notes from A0 to G#7 (standard piano range-ish)
  NOTES.forEach((note) => ALL_NOTES_WITH_OCTAVES.push(note + octave));
}

/**
 * Gets the note name for a given string and fret.
 * @param {number} stringIndex - 0 (High E) to 5 (Low E).
 * @param {number} fret - 0 (open) to 12.
 * @returns {string} The note name (e.g., "A", "C#").
 */
export const getNote = (stringIndex, fret) => {
  if (
    stringIndex < 0 ||
    stringIndex >= STRING_TUNINGS_NOTES.length ||
    fret < 0
  ) {
    return null; // Invalid input
  }
  const openNote = STRING_TUNINGS_NOTES[stringIndex];
  const openNoteIndex = NOTES.indexOf(openNote.toUpperCase());
  if (openNoteIndex === -1) {
    return null; // Should not happen
  }
  const noteIndex = (openNoteIndex + fret) % NOTES.length;
  return NOTES[noteIndex];
};

/**
 * Gets the note name with octave for a given string and fret.
 * @param {number} stringIndex - 0 (High E) to 5 (Low E).
 * @param {number} fret - 0 (open) to 12.
 * @returns {string} The note name with octave (e.g., "E4", "C#3").
 */
export const getNoteWithOctave = (stringIndex, fret) => {
  if (
    stringIndex < 0 ||
    stringIndex >= GUITAR_NOTES_MAP.length ||
    fret < 0 ||
    fret >= GUITAR_NOTES_MAP[0].length
  ) {
    return null;
  }

  // 2차원 배열에서 바로 값을 가져옴
  return GUITAR_NOTES_MAP[stringIndex][fret];
};

/**
 * Generates a random quiz question.
 * @returns {object} An object with { string: number, fret: number, noteName: string, noteNameWithOctave: string, questionText: string }.
 */
export const generateQuiz = () => {
  let targetStringIndex, targetFret, targetNoteName, targetNoteNameWithOctave;
  let found = false;
  let attempts = 0;

  while (!found && attempts < 200) {
    // Add attempt limit to prevent infinite loops
    attempts++;
    // Pick a random string index (0 for 1st string/High E, 5 for 6th string/Low E)
    targetStringIndex = Math.floor(Math.random() * STRING_TUNINGS_NOTES.length);
    // Pick a random note name
    targetNoteName = NOTES[Math.floor(Math.random() * NOTES.length)];

    // Find if this note exists on the chosen string within frets 0-12
    for (let f = 0; f <= 12; f++) {
      if (getNote(targetStringIndex, f) === targetNoteName) {
        const noteWithOct = getNoteWithOctave(targetStringIndex, f);
        // Ensure the generated noteWithOctave's base name matches targetNoteName
        // This is a sanity check because getNoteWithOctave could be complex
        if (noteWithOct && noteWithOct.startsWith(targetNoteName)) {
          targetFret = f;
          targetNoteNameWithOctave = noteWithOct;
          found = true;
          break;
        }
      }
    }
  }
  if (!found) {
    // Fallback if a suitable random quiz couldn't be generated easily (e.g. pick a fixed one)
    console.warn("Could not generate a random quiz easily, using fallback.");
    targetStringIndex = 0; // 1st string (High E)
    targetFret = 1; // F note
    targetNoteName = getNote(targetStringIndex, targetFret);
    targetNoteNameWithOctave = getNoteWithOctave(targetStringIndex, targetFret);
  }

  // User-friendly string number (1 for High E, 6 for Low E)
  const userFriendlyTargetStringNum = targetStringIndex + 1;
  const quizQuestionText = `${userFriendlyTargetStringNum}${getOrdinalSuffix(
    userFriendlyTargetStringNum
  )} string, ${targetNoteName}`;

  return {
    string: targetStringIndex, // 0-indexed, 0 = 1st string (High E)
    fret: targetFret,
    noteName: targetNoteName,
    noteNameWithOctave: targetNoteNameWithOctave, // e.g., E4, C#3
    questionText: quizQuestionText,
  };
};

const getOrdinalSuffix = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};
