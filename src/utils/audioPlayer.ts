/**
 * Audio Ambient Flute Synthesizer
 * Uses Web Audio API to generate a tranquil Indian classical Bansuri (Bamboo Flute)
 * ambient pentatonic melody in Raag Bhupali (peaceful, meditative evening raga).
 * 
 * Complies strictly with master prompt:
 * 1. NEVER autoplays on load.
 * 2. Only triggered by explicit user interaction (click Play).
 * 3. Fully functional without audio.
 * 4. Zero external network asset dependency.
 */

class BansuriSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private listeners: ((playing: boolean) => void)[] = [];

  // Frequencies for Raag Bhupali / Mohanam (Sa, Re, Ga, Pa, Dha):
  // C4=261.63, D4=293.66, E4=329.63, G4=392.00, A4=440.00, C5=523.25, D5=587.33
  private melodyNotes: number[] = [
    329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63, 293.66,
    329.63, 392.00, 523.25, 587.33, 523.25, 440.00, 392.00, 329.63
  ];
  private noteIndex: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime); // Gentle soothing volume
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public subscribe(callback: (playing: boolean) => void) {
    this.listeners.push(callback);
    callback(this.isPlaying);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isPlaying));
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public play() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.isPlaying = true;
      this.notify();
      this.playNextNote();
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private playNextNote() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const freq = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
    this.noteIndex++;

    const now = this.ctx.currentTime;
    const duration = 2.4; // Long, meditative breath duration

    // Dual oscillator to simulate the warm acoustic resonance of hollow bamboo flute
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Subtle breath vibrato LFO
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(4.8, now); // 4.8 Hz gentle natural vibrato
    vibratoGain.gain.setValueAtTime(3.0, now);
    vibrato.connect(osc1.frequency);
    vibrato.connect(osc2.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration);

    // Warm triangle + sine wave combination
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // Gentle octave harmonic

    // Flute breath envelope: soft attack, sustained body, gentle decay
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.09, now + 0.4); // soft breath attack
    noteGain.gain.exponentialRampToValueAtTime(0.06, now + duration * 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.02, now);

    osc1.connect(noteGain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);

    // Schedule next note with a gentle pause between notes
    const delay = (duration - 0.2) * 1000;
    this.timerId = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playNextNote();
      }
    }, delay);
  }
}

export const bansuriPlayer = new BansuriSynthesizer();
