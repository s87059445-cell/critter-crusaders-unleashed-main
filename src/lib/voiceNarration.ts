// Voice narration service using Web Speech API
export class VoiceNarrator {
  private isSpeaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    // Initialize voices when they become available
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        console.log('Voices loaded:', window.speechSynthesis.getVoices().length);
      };
    }
  }

  speak(text: string, onStart?: () => void, onEnd?: () => void): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        console.error('Speech synthesis not supported');
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Stop any current speech
      this.stop();

      // Create utterance
      this.currentUtterance = new SpeechSynthesisUtterance(text);
      
      // Configure deep, forest-appropriate voice characteristics
      this.currentUtterance.rate = 0.7; // Slower, more deliberate speech
      this.currentUtterance.pitch = 0.3; // Deep voice for forest setting
      this.currentUtterance.volume = 1.0;

      // Try to find a deep male voice
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices.map(v => v.name));
      
      const deepVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('deep') || 
        voice.name.toLowerCase().includes('male') ||
        voice.name.toLowerCase().includes('bass') ||
        voice.name.toLowerCase().includes('david') ||
        voice.name.toLowerCase().includes('james') ||
        voice.name.toLowerCase().includes('mark') ||
        voice.name.toLowerCase().includes('peter')
      );
      
      if (deepVoice) {
        console.log('Using deep voice:', deepVoice.name);
        this.currentUtterance.voice = deepVoice;
      } else {
        console.log('No deep voice found, using default');
      }

      // Event handlers
      this.currentUtterance.onstart = () => {
        console.log('Voice narration started');
        this.isSpeaking = true;
        onStart?.();
      };

      this.currentUtterance.onend = () => {
        console.log('Voice narration ended');
        this.isSpeaking = false;
        this.currentUtterance = null;
        onEnd?.();
        resolve();
      };

      this.currentUtterance.onerror = (event) => {
        console.error('Voice narration error:', event);
        this.isSpeaking = false;
        this.currentUtterance = null;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      // Start speaking
      try {
        window.speechSynthesis.speak(this.currentUtterance);
        console.log('Speech synthesis speak called');
      } catch (error) {
        console.error('Error starting speech:', error);
        reject(error);
      }
    });
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

  // Forest-appropriate narration with pauses and emphasis
  speakForestStyle(text: string, onStart?: () => void, onEnd?: () => void): Promise<void> {
    // Add forest-appropriate pauses and emphasis
    const processedText = this.processTextForForestNarration(text);
    return this.speak(processedText, onStart, onEnd);
  }

  private processTextForForestNarration(text: string): string {
    // Add dramatic pauses for forest storytelling
    let processedText = text;
    
    // Add pauses after important phrases
    processedText = processedText.replace(/([.!?])\s+/g, '$1... ');
    
    // Add emphasis to key words
    const emphasisWords = ['hero', 'power', 'forest', 'ancient', 'magic', 'courage', 'destiny'];
    emphasisWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      processedText = processedText.replace(regex, `*${word}*`);
    });

    return processedText;
  }

  // Test function to check if voice narration is working
  testVoice(): Promise<void> {
    return this.speak("Hello, this is a test of the voice narration system.", 
      () => console.log('Test started'),
      () => console.log('Test completed')
    );
  }
}

export const voiceNarrator = new VoiceNarrator(); 