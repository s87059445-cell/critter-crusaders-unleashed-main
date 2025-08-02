class ForestAmbiance {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;
  private currentMood: string = 'peaceful';

  constructor() {
    this.initAudioContext();
  }

  private async initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.3;
    } catch (error) {
      console.log('Audio context not available');
    }
  }

  startAmbiance(mood: 'peaceful' | 'stormy' | 'magical' | 'triumphant' = 'peaceful') {
    if (!this.audioContext || this.isPlaying) return;
    
    this.currentMood = mood;
    this.isPlaying = true;

    switch (mood) {
      case 'peaceful':
        this.createPeacefulForest();
        break;
      case 'stormy':
        this.createStormyForest();
        break;
      case 'magical':
        this.createMagicalForest();
        break;
      case 'triumphant':
        this.createTriumphantForest();
        break;
    }
  }

  private createPeacefulForest() {
    if (!this.audioContext || !this.gainNode) return;

    // Gentle wind
    const windOsc = this.audioContext.createOscillator();
    const windGain = this.audioContext.createGain();
    const windFilter = this.audioContext.createBiquadFilter();

    windOsc.frequency.value = 0.1;
    windGain.gain.value = 0.05;
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 200;

    windOsc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.gainNode);
    windOsc.start();

    // Bird chirps
    this.createBirdSounds();

    // Rustling leaves
    this.createLeafRustle();
  }

  private createStormyForest() {
    if (!this.audioContext || !this.gainNode) return;

    // Thunder
    const thunderOsc = this.audioContext.createOscillator();
    const thunderGain = this.audioContext.createGain();
    const thunderFilter = this.audioContext.createBiquadFilter();

    thunderOsc.frequency.value = 60;
    thunderGain.gain.value = 0.1;
    thunderFilter.type = 'lowpass';
    thunderFilter.frequency.value = 100;

    thunderOsc.connect(thunderFilter);
    thunderFilter.connect(thunderGain);
    thunderGain.connect(this.gainNode);
    thunderOsc.start();

    // Rain
    this.createRainSound();

    // Strong wind
    const windOsc = this.audioContext.createOscillator();
    const windGain = this.audioContext.createGain();
    windOsc.frequency.value = 0.2;
    windGain.gain.value = 0.08;
    windOsc.connect(windGain);
    windGain.connect(this.gainNode);
    windOsc.start();
  }

  private createMagicalForest() {
    if (!this.audioContext || !this.gainNode) return;

    // Magical chimes
    const chimeOsc = this.audioContext.createOscillator();
    const chimeGain = this.audioContext.createGain();
    const chimeFilter = this.audioContext.createBiquadFilter();

    chimeOsc.frequency.value = 800;
    chimeGain.gain.value = 0.03;
    chimeFilter.type = 'bandpass';
    chimeFilter.frequency.value = 800;
    chimeFilter.Q.value = 10;

    chimeOsc.connect(chimeFilter);
    chimeFilter.connect(chimeGain);
    chimeGain.connect(this.gainNode);
    chimeOsc.start();

    // Fireflies
    this.createFireflySounds();

    // Mystical hum
    const humOsc = this.audioContext.createOscillator();
    const humGain = this.audioContext.createGain();
    humOsc.frequency.value = 120;
    humGain.gain.value = 0.02;
    humOsc.connect(humGain);
    humGain.connect(this.gainNode);
    humOsc.start();
  }

  private createTriumphantForest() {
    if (!this.audioContext || !this.gainNode) return;

    // Victory fanfare
    const fanfareOsc = this.audioContext.createOscillator();
    const fanfareGain = this.audioContext.createGain();
    fanfareOsc.frequency.value = 440;
    fanfareGain.gain.value = 0.05;
    fanfareOsc.connect(fanfareGain);
    fanfareGain.connect(this.gainNode);
    fanfareOsc.start();

    // Cheering birds
    this.createBirdSounds(0.08);

    // Gentle breeze
    const breezeOsc = this.audioContext.createOscillator();
    const breezeGain = this.audioContext.createGain();
    breezeOsc.frequency.value = 0.15;
    breezeGain.gain.value = 0.03;
    breezeOsc.connect(breezeGain);
    breezeGain.connect(this.gainNode);
    breezeOsc.start();
  }

  private createBirdSounds(volume: number = 0.03) {
    if (!this.audioContext || !this.gainNode) return;

    setInterval(() => {
      const birdOsc = this.audioContext!.createOscillator();
      const birdGain = this.audioContext!.createGain();
      
      birdOsc.frequency.value = 800 + Math.random() * 400;
      birdGain.gain.value = volume;
      
      birdOsc.connect(birdGain);
      birdGain.connect(this.gainNode!);
      
      birdOsc.start();
      birdOsc.stop(this.audioContext!.currentTime + 0.1);
    }, 3000 + Math.random() * 2000);
  }

  private createLeafRustle() {
    if (!this.audioContext || !this.gainNode) return;

    setInterval(() => {
      const leafOsc = this.audioContext!.createOscillator();
      const leafGain = this.audioContext!.createGain();
      const leafFilter = this.audioContext!.createBiquadFilter();
      
      leafOsc.frequency.value = 100 + Math.random() * 200;
      leafGain.gain.value = 0.02;
      leafFilter.type = 'highpass';
      leafFilter.frequency.value = 80;
      
      leafOsc.connect(leafFilter);
      leafFilter.connect(leafGain);
      leafGain.connect(this.gainNode!);
      
      leafOsc.start();
      leafOsc.stop(this.audioContext!.currentTime + 0.2);
    }, 2000 + Math.random() * 3000);
  }

  private createRainSound() {
    if (!this.audioContext || !this.gainNode) return;

    setInterval(() => {
      const rainOsc = this.audioContext!.createOscillator();
      const rainGain = this.audioContext!.createGain();
      
      rainOsc.frequency.value = 200 + Math.random() * 300;
      rainGain.gain.value = 0.01;
      
      rainOsc.connect(rainGain);
      rainGain.connect(this.gainNode!);
      
      rainOsc.start();
      rainOsc.stop(this.audioContext!.currentTime + 0.05);
    }, 100 + Math.random() * 200);
  }

  private createFireflySounds() {
    if (!this.audioContext || !this.gainNode) return;

    setInterval(() => {
      const fireflyOsc = this.audioContext!.createOscillator();
      const fireflyGain = this.audioContext!.createGain();
      
      fireflyOsc.frequency.value = 600 + Math.random() * 200;
      fireflyGain.gain.value = 0.01;
      
      fireflyOsc.connect(fireflyGain);
      fireflyGain.connect(this.gainNode!);
      
      fireflyOsc.start();
      fireflyOsc.stop(this.audioContext!.currentTime + 0.05);
    }, 500 + Math.random() * 1000);
  }

  changeMood(mood: 'peaceful' | 'stormy' | 'magical' | 'triumphant') {
    this.stopAmbiance();
    setTimeout(() => {
      this.startAmbiance(mood);
    }, 500);
  }

  stopAmbiance() {
    this.isPlaying = false;
    if (this.audioContext) {
      this.audioContext.close();
      this.initAudioContext();
    }
  }

  setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }
}

export const forestAmbiance = new ForestAmbiance(); 