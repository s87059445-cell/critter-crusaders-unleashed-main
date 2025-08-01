// Ambient sound generator using Web Audio API
export class AmbientSoundGenerator {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBufferSourceNode> = new Map();

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  // Generate forest ambient sounds
  private generateForestAmbient(): void {
    if (!this.audioContext) return;

    // Wind sound
    const windOsc = this.audioContext.createOscillator();
    const windGain = this.audioContext.createGain();
    const windFilter = this.audioContext.createBiquadFilter();

    windOsc.type = 'sine';
    windOsc.frequency.setValueAtTime(80, this.audioContext.currentTime);
    windOsc.frequency.exponentialRampToValueAtTime(120, this.audioContext.currentTime + 3);
    windOsc.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 6);

    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(200, this.audioContext.currentTime);

    windGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    windGain.gain.exponentialRampToValueAtTime(0.05, this.audioContext.currentTime + 2);
    windGain.gain.exponentialRampToValueAtTime(0.1, this.audioContext.currentTime + 4);

    windOsc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.audioContext.destination);

    windOsc.start();
    windOsc.stop(this.audioContext.currentTime + 6);

    this.sounds.set('wind', windOsc);
  }

  // Generate garden ambient sounds
  private generateGardenAmbient(): void {
    if (!this.audioContext) return;

    // Gentle buzzing sound
    const buzzOsc = this.audioContext.createOscillator();
    const buzzGain = this.audioContext.createGain();
    const buzzFilter = this.audioContext.createBiquadFilter();

    buzzOsc.type = 'sawtooth';
    buzzOsc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    buzzOsc.frequency.exponentialRampToValueAtTime(250, this.audioContext.currentTime + 1);
    buzzOsc.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 2);

    buzzFilter.type = 'bandpass';
    buzzFilter.frequency.setValueAtTime(300, this.audioContext.currentTime);
    buzzFilter.Q.setValueAtTime(5, this.audioContext.currentTime);

    buzzGain.gain.setValueAtTime(0.05, this.audioContext.currentTime);

    buzzOsc.connect(buzzFilter);
    buzzFilter.connect(buzzGain);
    buzzGain.connect(this.audioContext.destination);

    buzzOsc.start();
    this.sounds.set('buzz', buzzOsc);
  }

  // Generate meadow ambient sounds
  private generateMeadowAmbient(): void {
    if (!this.audioContext) return;

    // Gentle breeze
    const breezeOsc = this.audioContext.createOscillator();
    const breezeGain = this.audioContext.createGain();
    const breezeFilter = this.audioContext.createBiquadFilter();

    breezeOsc.type = 'sine';
    breezeOsc.frequency.setValueAtTime(60, this.audioContext.currentTime);
    breezeOsc.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 4);
    breezeOsc.frequency.exponentialRampToValueAtTime(60, this.audioContext.currentTime + 8);

    breezeFilter.type = 'highpass';
    breezeFilter.frequency.setValueAtTime(50, this.audioContext.currentTime);

    breezeGain.gain.setValueAtTime(0.08, this.audioContext.currentTime);

    breezeOsc.connect(breezeFilter);
    breezeFilter.connect(breezeGain);
    breezeGain.connect(this.audioContext.destination);

    breezeOsc.start();
    this.sounds.set('breeze', breezeOsc);
  }

  // Generate pond ambient sounds
  private generatePondAmbient(): void {
    if (!this.audioContext) return;

    // Water ripple effect
    const waterOsc = this.audioContext.createOscillator();
    const waterGain = this.audioContext.createGain();
    const waterFilter = this.audioContext.createBiquadFilter();

    waterOsc.type = 'triangle';
    waterOsc.frequency.setValueAtTime(100, this.audioContext.currentTime);
    waterOsc.frequency.exponentialRampToValueAtTime(120, this.audioContext.currentTime + 2);
    waterOsc.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 4);

    waterFilter.type = 'lowpass';
    waterFilter.frequency.setValueAtTime(150, this.audioContext.currentTime);

    waterGain.gain.setValueAtTime(0.06, this.audioContext.currentTime);

    waterOsc.connect(waterFilter);
    waterFilter.connect(waterGain);
    waterGain.connect(this.audioContext.destination);

    waterOsc.start();
    this.sounds.set('water', waterOsc);
  }

  // Generate night ambient sounds
  private generateNightAmbient(): void {
    if (!this.audioContext) return;

    // Cricket sounds
    const cricketOsc = this.audioContext.createOscillator();
    const cricketGain = this.audioContext.createGain();
    const cricketFilter = this.audioContext.createBiquadFilter();

    cricketOsc.type = 'square';
    cricketOsc.frequency.setValueAtTime(800, this.audioContext.currentTime);
    cricketOsc.frequency.exponentialRampToValueAtTime(1000, this.audioContext.currentTime + 0.5);
    cricketOsc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 1);

    cricketFilter.type = 'bandpass';
    cricketFilter.frequency.setValueAtTime(900, this.audioContext.currentTime);
    cricketFilter.Q.setValueAtTime(10, this.audioContext.currentTime);

    cricketGain.gain.setValueAtTime(0.03, this.audioContext.currentTime);

    cricketOsc.connect(cricketFilter);
    cricketFilter.connect(cricketGain);
    cricketGain.connect(this.audioContext.destination);

    cricketOsc.start();
    this.sounds.set('cricket', cricketOsc);
  }

  // Generate field ambient sounds
  private generateFieldAmbient(): void {
    if (!this.audioContext) return;

    // Grass rustling
    const grassOsc = this.audioContext.createOscillator();
    const grassGain = this.audioContext.createGain();
    const grassFilter = this.audioContext.createBiquadFilter();

    grassOsc.type = 'noise';
    grassOsc.frequency.setValueAtTime(2000, this.audioContext.currentTime);

    grassFilter.type = 'highpass';
    grassFilter.frequency.setValueAtTime(1000, this.audioContext.currentTime);

    grassGain.gain.setValueAtTime(0.04, this.audioContext.currentTime);

    grassOsc.connect(grassFilter);
    grassFilter.connect(grassGain);
    grassGain.connect(this.audioContext.destination);

    grassOsc.start();
    this.sounds.set('grass', grassOsc);
  }

  // Generate summer night ambient sounds
  private generateSummerNightAmbient(): void {
    if (!this.audioContext) return;

    // Firefly-like sounds
    const fireflyOsc = this.audioContext.createOscillator();
    const fireflyGain = this.audioContext.createGain();
    const fireflyFilter = this.audioContext.createBiquadFilter();

    fireflyOsc.type = 'sine';
    fireflyOsc.frequency.setValueAtTime(400, this.audioContext.currentTime);
    fireflyOsc.frequency.exponentialRampToValueAtTime(500, this.audioContext.currentTime + 0.3);
    fireflyOsc.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.6);

    fireflyFilter.type = 'lowpass';
    fireflyFilter.frequency.setValueAtTime(600, this.audioContext.currentTime);

    fireflyGain.gain.setValueAtTime(0.02, this.audioContext.currentTime);
    fireflyGain.gain.exponentialRampToValueAtTime(0.05, this.audioContext.currentTime + 0.3);
    fireflyGain.gain.exponentialRampToValueAtTime(0.02, this.audioContext.currentTime + 0.6);

    fireflyOsc.connect(fireflyFilter);
    fireflyFilter.connect(fireflyGain);
    fireflyGain.connect(this.audioContext.destination);

    fireflyOsc.start();
    this.sounds.set('firefly', fireflyOsc);
  }

  // Start ambient sounds based on insect type
  startAmbientSound(insectType: string): void {
    this.stopAllSounds();

    switch (insectType.toLowerCase()) {
      case 'ant':
        this.generateForestAmbient();
        break;
      case 'bee':
        this.generateGardenAmbient();
        break;
      case 'butterfly':
        this.generateMeadowAmbient();
        break;
      case 'ladybug':
        this.generateGardenAmbient();
        break;
      case 'dragonfly':
        this.generatePondAmbient();
        break;
      case 'spider':
        this.generateNightAmbient();
        break;
      case 'grasshopper':
        this.generateFieldAmbient();
        break;
      case 'firefly':
        this.generateSummerNightAmbient();
        break;
      default:
        this.generateMeadowAmbient();
    }
  }

  // Stop all ambient sounds
  stopAllSounds(): void {
    this.sounds.forEach((sound) => {
      try {
        sound.stop();
      } catch (error) {
        // Sound might already be stopped
      }
    });
    this.sounds.clear();
  }

  // Resume audio context if suspended
  resume(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// Create a singleton instance
export const ambientSoundGenerator = new AmbientSoundGenerator(); 