import React from 'react';

const Fretboard = ({ onNoteSelect, highlightCorrectAnswer, selectedNote: propSelectedNote }) => {
  // --- Constants ---
  const numStrings = 6;
  const numFrets = 12; // 0 (open) to 12

  // --- Dimensions (Horizontal Layout) ---
  const svgViewBoxWidth = 1250; // Slightly increased for better proportion with increased height
  const svgViewBoxHeight = 550; // Increased height for a fuller look, was 300 then 600, trying 550

  const neckInitialStartX = 25; // Reduced start X for the neck to use more width, was 50
  const neckWidthRatio = 0.95; // Percentage of SVG width for the neck itself (excluding 0-fret area)
  const neckPlayableWidth = (svgViewBoxWidth - neckInitialStartX) * neckWidthRatio; // Playable fretboard width (nut to 12th fret end)
  
  const neckHeight = svgViewBoxHeight * 0.9; // Neck uses 90% of SVG height, was 0.95 of 600, now 0.9 of 550
  const neckStartY = (svgViewBoxHeight - neckHeight) / 2; // Center neck vertically

  const nutWidth = 12; // Slightly thicker nut, was 10
  const fretWireWidth = 4;
  const stringSpacing = neckHeight / (numStrings + 0.5); // Adjusted for tighter packing, was numStrings + 1
  const fretMarkerRadius = Math.min(stringSpacing / 3.5, 10); // Adjusted, was /3, 8
  const noteMarkerRadius = Math.min(stringSpacing / 2.8, 12); // Adjusted, was /2.5, 10
  const correctAnswerMarkerRadius = Math.min(stringSpacing / 2.5, 14); // Adjusted, was /2.2, 11

  // --- String Thicknesses (1st string (thin) at top, 6th string (thick) at bottom) ---
  const baseStringThickness = Math.max(1.5, neckHeight / 120); // Adjusted for new neckHeight
  const stringThicknesses = [
    baseStringThickness * 0.65, // 1st string (high E)
    baseStringThickness * 0.75, // 2nd string (B)
    baseStringThickness * 0.88, // 3rd string (G)
    baseStringThickness * 1.00, // 4th string (D)
    baseStringThickness * 1.18, // 5th string (A)
    baseStringThickness * 1.35, // 6th string (low E)
  ];

  // --- Fret Spacing (Horizontal) ---
  const scaleLength = neckPlayableWidth * 1.5; 
  const distNutTo12thFretWire = scaleLength - (scaleLength / Math.pow(2, 12 / 12));

  const fretPositionsFromNut = []; 
  for (let i = 1; i <= numFrets; i++) {
    let dist = scaleLength - (scaleLength / Math.pow(2, i / 12));
    fretPositionsFromNut.push((dist / distNutTo12thFretWire) * neckPlayableWidth);
  }
  
  // Define a minimal width for the 0-fret clickable area, conceptually before the nut visually
  // Or, make it part of the nut area. For simplicity, let's make it very small or integrate with nut.
  const zeroFretClickableZoneWidth = fretPositionsFromNut[0] * 0.3; // Small area to the left of the nut for open strings
  const neckVisualStartActualX = neckInitialStartX;
  const nutXPosition = neckVisualStartActualX + zeroFretClickableZoneWidth + (nutWidth / 2);
  const fretboardVisualStartX = nutXPosition + nutWidth / 2; // Fret 1 starts after the nut

  const fretWireXPositions = fretPositionsFromNut.map(p => fretboardVisualStartX + p);

  // --- Fret Markers ---
  const fretMarkerPositions = [3, 5, 7, 9, 12];
  const doubleDotFret = 12;

  const handleNoteClick = (stringIndex, fretNum) => {
    if (onNoteSelect) {
      onNoteSelect(stringIndex, fretNum);
    }
  };

  const renderNeckBackground = () => (
    <rect 
      x={neckVisualStartActualX} 
      y={neckStartY} 
      width={zeroFretClickableZoneWidth + nutWidth + neckPlayableWidth + 10} // Extend slightly for visual completeness
      height={neckHeight} 
      fill="#503018" // Darker, richer wood color like Rosewood/Ebony from image
      className="rounded-sm shadow-lg"
    />
  );

  const renderNut = () => (
    <rect 
      x={nutXPosition - nutWidth/2} 
      y={neckStartY} 
      width={nutWidth} 
      height={neckHeight} 
      fill="#F0E68C" // Khaki/Aged Bone color for nut
      className="shadow-sm"
    />
  );

  const renderFrets = () => fretWireXPositions.map((fretX, index) => (
    <line 
      key={`fret-${index + 1}`} 
      x1={fretX} 
      y1={neckStartY} 
      x2={fretX} 
      y2={neckStartY + neckHeight} 
      stroke="#C0C0C0" // Brighter silver for frets
      strokeWidth={fretWireWidth} 
      className="shadow-xs"
    />
  ));

  const renderStrings = () => stringThicknesses.map((thickness, index) => {
    const stringY = neckStartY + (index + 0.75) * stringSpacing; // Adjusted for new stringSpacing logic
    return (
      <line 
        key={`string-${index}`}
        x1={neckVisualStartActualX + zeroFretClickableZoneWidth / 2} // Start from within 0-fret area or nut
        y1={stringY} 
        x2={fretboardVisualStartX + neckPlayableWidth + 5} // Extend slightly past last fret
        y2={stringY} 
        stroke="#EAEAEA" // Light steel color for strings
        strokeWidth={thickness} 
        opacity="0.85"
      />
    );
  });

  const renderFretMarkers = () => {
    const markers = [];
    fretMarkerPositions.forEach(fretNum => {
      const xPrevFretWire = fretNum === 1 ? fretboardVisualStartX : fretWireXPositions[fretNum - 2];
      const xCurrFretWire = fretWireXPositions[fretNum - 1];
      const markerX = xPrevFretWire + (xCurrFretWire - xPrevFretWire) / 2;

      if (fretNum === doubleDotFret) {
        markers.push(
          <circle key={`marker-double-${fretNum}-1`} cx={markerX} cy={neckStartY + neckHeight * 0.30} r={fretMarkerRadius * 1.1} fill="#D0C8B0" opacity="0.95" />,
          <circle key={`marker-double-${fretNum}-2`} cx={markerX} cy={neckStartY + neckHeight * 0.70} r={fretMarkerRadius * 1.1} fill="#D0C8B0" opacity="0.95" />
        );
      } else {
        markers.push(
          <circle key={`marker-${fretNum}`} cx={markerX} cy={neckStartY + neckHeight / 2} r={fretMarkerRadius} fill="#D0C8B0" opacity="0.95" />
        );
      }
    });
    return markers;
  };

  const renderClickableNotes = () => {
    const notes = [];
    const clickableFretWidthRatio = 0.85;

    for (let stringIdx = 0; stringIdx < numStrings; stringIdx++) {
      const stringY = neckStartY + (stringIdx + 0.75) * stringSpacing;
      const clickableStringHeight = stringSpacing * 0.95;

      // Fret 0 (Open string)
      const openStringXCenter = neckVisualStartActualX + zeroFretClickableZoneWidth / 2;
      const openStringClickableWidth = zeroFretClickableZoneWidth * 0.9;
      notes.push(
        <rect
          key={`note-${stringIdx}-0`}
          x={openStringXCenter - openStringClickableWidth / 2}
          y={stringY - clickableStringHeight / 2}
          width={openStringClickableWidth}
          height={clickableStringHeight}
          fill="transparent"
          onClick={() => handleNoteClick(stringIdx, 0)}
          className="cursor-pointer hover:bg-white/5 transition-colors duration-100 ease-in-out"
        />
      );

      for (let fretIdx = 1; fretIdx <= numFrets; fretIdx++) {
        const prevFretWireX = fretIdx === 1 ? fretboardVisualStartX : fretWireXPositions[fretIdx - 2];
        const currentFretWireX = fretWireXPositions[fretIdx - 1];
        const fretSpaceWidth = currentFretWireX - prevFretWireX;
        const clickableWidth = fretSpaceWidth * clickableFretWidthRatio;
        const xCenter = prevFretWireX + fretSpaceWidth / 2;

        notes.push(
          <rect
            key={`note-${stringIdx}-${fretIdx}`}
            x={xCenter - clickableWidth / 2}
            y={stringY - clickableStringHeight / 2}
            width={clickableWidth}
            height={clickableStringHeight}
            fill="transparent"
            onClick={() => handleNoteClick(stringIdx, fretIdx)}
            className="cursor-pointer hover:bg-white/5 transition-colors duration-100 ease-in-out"
          />
        );
      }
    }
    return notes;
  };

  const renderUserSelectionMarker = () => {
    if (!propSelectedNote) return null;
    const { string, fret } = propSelectedNote;
    const stringY = neckStartY + (string + 0.75) * stringSpacing;
    let noteX;

    if (fret === 0) {
      noteX = neckVisualStartActualX + zeroFretClickableZoneWidth / 2;
    } else {
      const prevFretWireX = fret === 1 ? fretboardVisualStartX : fretWireXPositions[fret - 2];
      const currentFretWireX = fretWireXPositions[fret - 1];
      noteX = prevFretWireX + (currentFretWireX - prevFretWireX) / 2;
    }
    return (
      <circle cx={noteX} cy={stringY} r={noteMarkerRadius} fill="rgba(239, 68, 68, 0.75)" stroke="#FFFFFF" strokeWidth="2" style={{ pointerEvents: "none" }} className="transition-all duration-150" />
    );
  };

  const renderCorrectAnswerHighlightMarker = () => {
    if (!highlightCorrectAnswer) return null;
    const { string, fret } = highlightCorrectAnswer;
    const stringY = neckStartY + (string + 0.75) * stringSpacing;
    let noteX;
    if (fret === 0) {
      noteX = neckVisualStartActualX + zeroFretClickableZoneWidth / 2;
    } else {
      const prevFretWireX = fret === 1 ? fretboardVisualStartX : fretWireXPositions[fret - 2];
      const currentFretWireX = fretWireXPositions[fret - 1];
      noteX = prevFretWireX + (currentFretWireX - prevFretWireX) / 2;
    }
    return (
      <circle cx={noteX} cy={stringY} r={correctAnswerMarkerRadius} fill="none" stroke="rgba(52, 211, 153, 0.9)" strokeWidth="3.5" style={{ pointerEvents: "none" }} className="transition-all duration-150" />
    );
  };

  return (
    // This div should take full height from parent in App.jsx
    <div className="w-full h-full flex justify-center items-center">
      <svg 
        viewBox={`0 0 ${svgViewBoxWidth} ${svgViewBoxHeight}`} 
        preserveAspectRatio="xMidYMid meet" 
        // className should allow it to fill the parent div from App.jsx
        className="w-full h-full shadow-2xl bg-slate-900 overflow-visible" // Removed max-w, changed bg to match App.jsx for seamlessness
      >
        {renderNeckBackground()}
        {renderNut()}
        {renderFrets()}
        {renderStrings()}
        {renderFretMarkers()}
        {renderClickableNotes()}
        {renderUserSelectionMarker()}
        {renderCorrectAnswerHighlightMarker()}
      </svg>
    </div>
  );
};

export default Fretboard;

