import * as React from 'react';

import { Arpeggio } from 'arpeggiator';
import { keys } from './Piano';

/**
 * ArpeggioViewer draws a very simple visual representation of a provided
 * arpeggio
 */
const ArpeggioViewer: React.FunctionComponent<{ arp: Arpeggio }> = props => {
  const arp = props.arp;
  const arpNotesDisplay = arp.map(noteIndex => keys[noteIndex].name).join(' ');

  const lowNote = props.arp.reduce((lowestYet, note) => {
    return Math.min(lowestYet, note);
  }, Number.MAX_SAFE_INTEGER);
  const highNote = props.arp.reduce((highestYet, note) => {
    return Math.max(highestYet, note);
  }, -1);
  const range = highNote - lowNote + 1;
  const rows: any[][] = new Array(range).fill(new Array(arp.length).fill(0));

  const adjustedArp = arp.map(note => note - lowNote);

  return (
    <div className="arpeggio-viewer">
    <div className="buffer-small">Current arpeggio: {arpNotesDisplay}</div>
      {rows.map((noteRow, noteIndex) => {
        return (
          <div key={`${noteIndex}`} className="arpeggio-viewer-row">
            {noteRow.map((_, stepIndex) => {
              if (adjustedArp[stepIndex] === rows.length - 1 - noteIndex) {
                return (
                  <div
                    key={`${stepIndex}-${stepIndex}`}
                    className="arpeggio-viewer-box arpeggio-viewer-note"
                  />
                );
              }
              return (
                <div
                  key={`${stepIndex}-${stepIndex}`}
                  className="arpeggio-viewer-box"
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ArpeggioViewer;
