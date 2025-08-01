// Melody generator using Web Audio API
export class MelodyGenerator {
  private audioContext: AudioContext | null = null;
  private melodyInterval: NodeJS.Timeout | null = null;
  private isPlaying: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  // Generate a gentle, peaceful melody
  private playNote(frequency: number, duration: number, startTime: number, volume: number = 0.1): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    // Configure oscillator
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime + startTime);

    // Configure filter for softer sound
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.audioContext.currentTime + startTime);
    filter.Q.setValueAtTime(1, this.audioContext.currentTime + startTime);

    // Configure gain for volume control
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + startTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + startTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + startTime + duration);

    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Start and stop
    oscillator.start(this.audioContext.currentTime + startTime);
    oscillator.stop(this.audioContext.currentTime + startTime + duration);
  }

  // Create a forest-like melody sequence for Groot
  private createMelodySequence(): void {
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    const noteDuration = 3; // 3 seconds per note for more deliberate pace
    const sequence = [
      { freq: 110, vol: 0.03 }, // A2 - very deep and soft
      { freq: 146.83, vol: 0.03 }, // D3
      { freq: 174.61, vol: 0.03 }, // F3
      { freq: 196, vol: 0.03 }, // G3
      { freq: 174.61, vol: 0.03 }, // F3
      { freq: 146.83, vol: 0.03 }, // D3
      { freq: 110, vol: 0.03 }, // A2
      { freq: 98, vol: 0.03 }, // G2 - very deep
    ];

    sequence.forEach((note, index) => {
      this.playNote(note.freq, noteDuration, now + (index * noteDuration), note.vol);
    });
  }

  // Start playing the gentle melody
  startMelody(): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.resume();

    // Play initial sequence
    this.createMelodySequence();

    // Continue playing the melody in a loop
    this.melodyInterval = setInterval(() => {
      if (this.isPlaying) {
        this.createMelodySequence();
      }
    }, 24000); // 24 seconds (8 notes * 3 seconds each)
  }

  // Stop the melody
  stopMelody(): void {
    this.isPlaying = false;
    
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
  }

  // Resume audio context if suspended
  resume(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Check if melody is playing
  isMelodyPlaying(): boolean {
    return this.isPlaying;
  }
}

// Create a singleton instance
export const melodyGenerator = new MelodyGenerator(); 