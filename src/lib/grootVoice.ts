class GrootVoice {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private isSpeaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.initAudioContext();
  }

  private async initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.8;
    } catch (error) {
      console.log('Audio context not available for Groot voice');
    }
  }

  speak(text: string, onStart?: () => void, onEnd?: () => void): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Stop any current speech
      this.stop();

      // Create utterance
      this.currentUtterance = new SpeechSynthesisUtterance(text);
      
      // Configure Groot's voice characteristics
      this.currentUtterance.rate = 0.7; // Slower speech
      this.currentUtterance.pitch = 0.3; // Very deep voice
      this.currentUtterance.volume = 1.0;

      // Try to find a deep male voice
      const voices = window.speechSynthesis.getVoices();
      const deepVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('deep') || 
        voice.name.toLowerCase().includes('male') ||
        voice.name.toLowerCase().includes('bass')
      );
      
      if (deepVoice) {
        this.currentUtterance.voice = deepVoice;
      }

      // Apply audio filters if available
      if (this.audioContext && this.gainNode) {
        this.applyGrootFilters();
      }

      // Event handlers
      this.currentUtterance.onstart = () => {
        this.isSpeaking = true;
        onStart?.();
      };

      this.currentUtterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        onEnd?.();
        resolve();
      };

      this.currentUtterance.onerror = (event) => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      // Start speaking
      window.speechSynthesis.speak(this.currentUtterance);
    });
  }

  private applyGrootFilters() {
    if (!this.audioContext || !this.gainNode) return;

    // Create audio processing chain for Groot's voice
    const source = this.audioContext.createMediaStreamSource(new MediaStream());
    const lowpassFilter = this.audioContext.createBiquadFilter();
    const highpassFilter = this.audioContext.createBiquadFilter();
    const delay = this.audioContext.createDelay();
    const reverbGain = this.audioContext.createGain();
    const distortion = this.audioContext.createWaveShaper();

    // Configure filters for woody, deep voice
    lowpassFilter.type = 'lowpass';
    lowpassFilter.frequency.value = 800; // Cut high frequencies
    lowpassFilter.Q.value = 1.5;

    highpassFilter.type = 'highpass';
    highpassFilter.frequency.value = 80; // Cut very low frequencies
    highpassFilter.Q.value = 1.0;

    // Echo effect
    delay.delayTime.value = 0.3;
    reverbGain.gain.value = 0.3;

    // Distortion for woody texture
    distortion.curve = this.makeDistortionCurve(50);

    // Connect the audio chain
    source.connect(lowpassFilter);
    lowpassFilter.connect(highpassFilter);
    highpassFilter.connect(delay);
    delay.connect(reverbGain);
    reverbGain.connect(distortion);
    distortion.connect(this.gainNode);
  }

  private makeDistortionCurve(amount: number): Float32Array {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  stop() {
    if (this.currentUtterance) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
    this.isSpeaking = false;
  }

  isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  // Groot's signature phrases
  static readonly PHRASES = {
    INTRO: "I am Groot...",
    MYSTERIOUS: "In the ancient forest...",
    SHOCKED: "Oh no!",
    PROUD: "Well done, little one!",
    VICTORY: "The hero has triumphed!",
    OUTRO: "I am Groot."
  };

  // Speak with Groot's signature style
  speakGrootStyle(phrase: string, onStart?: () => void, onEnd?: () => void): Promise<void> {
    const grootText = `I am Groot. ${phrase} I am Groot.`;
    return this.speak(grootText, onStart, onEnd);
  }
}

export const grootVoice = new GrootVoice(); 