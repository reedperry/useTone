interface Note {
  // Index on a full <Piano />
  keyIndex: number;
  // Starting step
  step: number;
  // Duration in sequence steps
  duration: number;
}

export interface Measure {
  // How many beats (quarter notes) are in this measure
  beats: number;
  // How many steps we divide each beat into
  steps: number;
  // The list of notes to be played in the measure
  notes: Note[];
}

enum NoteEventType {
  START,
  STOP
}

export interface NoteEvent {
  type: NoteEventType;
  keyIndex: number;
}

/**
 * Experimental...
 */
export class Schedulerx {
  private scheduled: number[] = [];
  private tempoBPM: number = 120;
  private events: Map<number, NoteEvent[]> = new Map();

  scheduleMeasure(measure: Measure): Map<number, NoteEvent[]> {
    const stepDuration = this.getDurationOfStep(measure);

    for (const note of measure.notes) {
      const noteStartEvent: NoteEvent = {
        keyIndex: note.keyIndex,
        type: NoteEventType.START
      };

      const noteStopEvent: NoteEvent = {
        keyIndex: note.keyIndex,
        type: NoteEventType.STOP
      };

      const noteStart: number = note.step * stepDuration;
      const noteStop: number = noteStart + note.duration * stepDuration;

      const eventsAtNoteStart = this.events.get(noteStart);
      if (!eventsAtNoteStart) {
        this.events.set(noteStart, [noteStartEvent]);
      } else {
        eventsAtNoteStart.push(noteStartEvent);
      }

      const eventsAtNoteStop = this.events.get(noteStop);
      if (!eventsAtNoteStop) {
        this.events.set(noteStop, [noteStopEvent]);
      } else {
        eventsAtNoteStop.push(noteStopEvent);
      }
    }

    for (const eventEntry of Array.from(this.events.entries())) {
      const timerId = window.setTimeout(() => {
        console.log('---', eventEntry[0], '---');
        for (const e of eventEntry[1]) {
          console.log(e.type === NoteEventType.START ? 'Starting' : 'Stopping', e.keyIndex);
        }
      }, eventEntry[0]);

      this.scheduled.push(timerId);
    }

    return this.events;
  }

  cancelAllScheduledNotes(): void {
    for (const scheduledNote of Array.from(this.scheduled)) {
      clearTimeout(scheduledNote);
    }
  }

  getStepsInMeasure(measure: Measure): number {
    return measure.beats * measure.steps;
  }

  getDurationOfStep(measure: Measure): number {
    const quarterNotesPerSecond = this.tempoBPM / 60;
    const stepsPerSecond = quarterNotesPerSecond * (measure.steps / 4);
    return 1000 / stepsPerSecond;
  }
}
