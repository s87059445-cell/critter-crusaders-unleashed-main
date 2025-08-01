// Voice narration service using Web Speech API
export class VoiceNarrator {
  private speechSynthesis: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isSupported: boolean;

  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.isSupported = 'speechSynthesis' in window;
  }

  // Get available voices and find a deep, male voice for Groot
  private getGrootVoice(): SpeechSynthesisVoice | null {
    const voices = this.speechSynthesis.getVoices();
    
    // Try to find a deep male voice that sounds like Groot
    const deepVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('male') ||
      voice.name.toLowerCase().includes('man') ||
      voice.name.toLowerCase().includes('david') ||
      voice.name.toLowerCase().includes('james') ||
      voice.name.toLowerCase().includes('mark') ||
      voice.name.toLowerCase().includes('peter') ||
      voice.name.toLowerCase().includes('thomas') ||
      voice.name.toLowerCase().includes('daniel') ||
      voice.name.toLowerCase().includes('michael') ||
      voice.name.toLowerCase().includes('chris') ||
      voice.name.toLowerCase().includes('brian')
    );

    // If no specific deep voice found, use the first available voice
    return deepVoice || voices[0] || null;
  }

  // Transform text to sound more like Groot's speech pattern
  private transformToGrootSpeech(text: string): string {
    // Groot typically speaks in short, simple phrases
    // He often repeats "I am Groot" but can say other things
    const sentences = text.split('. ');
    const grootSentences = sentences.map(sentence => {
      // Make sentences shorter and more direct
      let grootSentence = sentence
        .replace(/Once a humble/, 'A humble')
        .replace(/was chosen by the ancient/, 'chosen by ancient')
        .replace(/emerged with the ability to/, 'can now')
        .replace(/blessed with incredible powers/, 'has great powers')
        .replace(/protect the miniature world/, 'protect the world')
        .replace(/threatens to destroy/, 'wants to destroy')
        .replace(/incredible powers/, 'great powers')
        .replace(/miraculous feat/, 'amazing feat')
        .replace(/single-handedly/, 'alone')
        .replace(/coordinate thousands of/, 'control many')
        .replace(/telepathic connection/, 'mind powers')
        .replace(/underground kingdom/, 'underground home')
        .replace(/breadcrumb 50 times their body weight/, 'heavy things')
        .replace(/colony's mightiest protector/, 'strongest protector')
        .replace(/ancient Queen/, 'old Queen')
        .replace(/sacred power of Unity/, 'power of Unity')
        .replace(/greatest threat/, 'big threat')
        .replace(/tiny hero/, 'small hero')
        .replace(/emerged as/, 'became')
        .replace(/chosen one/, 'special one')
        .replace(/able to communicate/, 'can talk to')
        .replace(/orchestrate the most beautiful/, 'make beautiful')
        .replace(/symphony of growth/, 'growth music')
        .replace(/renewal/, 'new life')
        .replace(/pollination crisis/, 'flower problem')
        .replace(/threatened all plant life/, 'hurt all plants')
        .replace(/golden fields/, 'yellow fields')
        .replace(/endless flowers/, 'many flowers')
        .replace(/Bee Goddess/, 'Flower Goddess')
        .replace(/power of Sweet Harmony/, 'sweet power')
        .replace(/not only nourishes but also heals/, 'feeds and heals')
        .replace(/wings carry the melody/, 'wings make music')
        .replace(/nature itself/, 'nature')
        .replace(/humble caterpillar's dream/, 'small caterpillar dream')
        .replace(/most beautiful transformation/, 'beautiful change')
        .replace(/wings carry the colors/, 'wings have colors')
        .replace(/power to bring hope/, 'power to give hope')
        .replace(/flutter/, 'fly')
        .replace(/darkest days/, 'bad days')
        .replace(/celebrations of life/, 'life party')
        .replace(/magical cocoon/, 'magic cocoon')
        .replace(/solar eclipse/, 'sun dark')
        .replace(/ability to change colors/, 'can change colors')
        .replace(/spread joy wherever/, 'make happy where')
        .replace(/turning even the darkest/, 'making even bad')
        .replace(/into celebrations/, 'into parties')
        .replace(/blessed by the ancient/, 'blessed by old')
        .replace(/garden spirits/, 'garden magic')
        .replace(/protector of all plants/, 'plant protector')
        .replace(/spots are actually magical/, 'spots are magic')
        .replace(/runes that ward off/, 'magic that stops')
        .replace(/evil pests/, 'bad bugs')
        .replace(/gentle touch/, 'soft touch')
        .replace(/heal any damaged/, 'fix any broken')
        .replace(/great aphid invasion/, 'big bug attack')
        .replace(/threatened to destroy/, 'wanted to destroy')
        .replace(/all gardens/, 'all plants')
        .replace(/Lady of Luck/, 'Luck Lady')
        .replace(/adorable yet powerful/, 'cute but strong')
        .replace(/defender of nature/, 'nature defender')
        .replace(/ancient and wise/, 'old and smart')
        .replace(/countless generations/, 'many years')
        .replace(/power of time manipulation/, 'time power')
        .replace(/compound eyes/, 'many eyes')
        .replace(/see into the past/, 'see past')
        .replace(/and future/, 'and future')
        .replace(/ultimate guardian/, 'best guardian')
        .replace(/natural timeline/, 'time line')
        .replace(/born during a thunderstorm/, 'born in storm')
        .replace(/struck by lightning/, 'hit by lightning')
        .replace(/ability to fly/, 'can fly')
        .replace(/incredible speeds/, 'very fast')
        .replace(/fastest creature/, 'fastest one')
        .replace(/insect kingdom/, 'bug world')
        .replace(/protector of the skies/, 'sky protector')
        .replace(/master of the web/, 'web master')
        .replace(/destiny/, 'fate')
        .replace(/weave not just silk/, 'make not just silk')
        .replace(/very fabric of reality/, 'reality itself')
        .replace(/webs are portals/, 'webs are doors')
        .replace(/other dimensions/, 'other worlds')
        .replace(/patience is legendary/, 'very patient')
        .replace(/among all heroes/, 'of all heroes')
        .replace(/great web of the universe/, 'universe web')
        .replace(/began to unravel/, 'started to break')
        .replace(/Spider Goddess/, 'Spider Lady')
        .replace(/guardian of cosmic balance/, 'space balance keeper')
        .replace(/sense danger from miles/, 'feel danger from far')
        .replace(/musical maestro/, 'music master')
        .replace(/meadows/, 'fields')
        .replace(/create symphonies/, 'make music')
        .replace(/so beautiful they can/, 'so pretty they can')
        .replace(/calm any storm/, 'stop storms')
        .replace(/jumping ability/, 'jump power')
        .replace(/reach incredible heights/, 'jump very high')
        .replace(/songs bring peace/, 'songs make peace')
        .replace(/all who hear them/, 'all who listen')
        .replace(/rhythm of the earth/, 'earth rhythm')
        .replace(/in their heart/, 'in heart')
        .replace(/gained the power/, 'got the power')
        .replace(/communicate with all/, 'talk to all')
        .replace(/living things/, 'living things')
        .replace(/enchanting melodies/, 'pretty songs')
        .replace(/voice of nature/, 'nature voice')
        .replace(/light in the darkness/, 'light in dark')
        .replace(/blessed by the stars/, 'blessed by stars')
        .replace(/power of eternal illumination/, 'light power')
        .replace(/glow can guide/, 'light can guide')
        .replace(/lost souls home/, 'lost ones home')
        .replace(/light can banish/, 'light can stop')
        .replace(/any shadow/, 'shadows')
        .replace(/great darkness/, 'big darkness')
        .replace(/threatened to consume/, 'wanted to eat')
        .replace(/emerged as the chosen/, 'became the chosen')
        .replace(/beacon of hope/, 'hope light')
        .replace(/light up entire forests/, 'light up forests')
        .replace(/bring warmth/, 'give warmth')
        .replace(/coldest hearts/, 'cold hearts');

      // Make sentences shorter and more direct
      if (grootSentence.length > 80) {
        grootSentence = grootSentence.substring(0, 80) + '...';
      }

      return grootSentence;
    });

    return grootSentences.join('. ');
  }

  // Speak the given text
  speak(text: string, onStart?: () => void, onEnd?: () => void): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported) {
        console.warn('Speech synthesis not supported');
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Cancel any ongoing speech
      this.stop();

      // Transform text to sound more like Groot
      const grootText = this.transformToGrootSpeech(text);
      
      // Create new utterance
      this.utterance = new SpeechSynthesisUtterance(grootText);
      
      // Configure voice
      const voice = this.getGrootVoice();
      if (voice) {
        this.utterance.voice = voice;
      }

      // Configure speech parameters for realistic Groot voice
      this.utterance.rate = 0.6; // Very slow, deliberate speech like Groot
      this.utterance.pitch = 0.6; // Very low pitch for deep, gravelly voice
      this.utterance.volume = 0.95; // High volume for clear Groot voice

      // Set up event handlers
      this.utterance.onstart = () => {
        console.log('Voice narration started');
        onStart?.();
      };

      this.utterance.onend = () => {
        console.log('Voice narration ended');
        this.utterance = null;
        onEnd?.();
        resolve();
      };

      this.utterance.onerror = (event) => {
        console.error('Voice narration error:', event);
        this.utterance = null;
        reject(new Error('Voice narration failed'));
      };

      // Start speaking
      this.speechSynthesis.speak(this.utterance);
    });
  }

  // Stop current speech
  stop(): void {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel();
    }
    this.utterance = null;
  }

  // Check if currently speaking
  isSpeaking(): boolean {
    return this.speechSynthesis.speaking;
  }

  // Check if speech synthesis is supported
  isSupported(): boolean {
    return this.isSupported;
  }
}

// Create a singleton instance
export const voiceNarrator = new VoiceNarrator(); 