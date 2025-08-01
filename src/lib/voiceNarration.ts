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

  // Transform text to sound more like Groot's speech pattern with Gen Z slang
  private transformToGrootSpeech(text: string): string {
    // Groot typically speaks in short, simple phrases but now with Gen Z vibes
    const sentences = text.split('. ');
    const grootSentences = sentences.map(sentence => {
      // Make sentences shorter and more direct with Gen Z slang
      let grootSentence = sentence
        // Gen Z slang transformations
        .replace(/Once a humble/, 'So like, this humble')
        .replace(/was chosen by the ancient/, 'got chosen by the ancient ones, no cap')
        .replace(/emerged with the ability to/, 'now has the ability to, periodt')
        .replace(/blessed with incredible powers/, 'got blessed with some fire powers fr fr')
        .replace(/protect the miniature world/, 'protect the world, slay')
        .replace(/threatens to destroy/, 'wants to destroy everything, that\'s sus')
        .replace(/incredible powers/, 'some absolutely bussin powers')
        .replace(/miraculous feat/, 'absolute slay moment')
        .replace(/single-handedly/, 'all by themselves, no help needed')
        .replace(/coordinate thousands of/, 'control thousands of, literally')
        .replace(/telepathic connection/, 'mind powers, it\'s giving psychic')
        .replace(/underground kingdom/, 'underground kingdom, the vibes are immaculate')
        .replace(/breadcrumb 50 times their body weight/, 'carry heavy stuff, they\'re built different')
        .replace(/colony's mightiest protector/, 'the strongest protector, periodt')
        .replace(/ancient Queen/, 'ancient Queen, she\'s that girl')
        .replace(/sacred power of Unity/, 'sacred power of Unity, it\'s giving main character energy')
        .replace(/greatest threat/, 'biggest threat, no cap')
        .replace(/tiny hero/, 'small hero, but they\'re iconic')
        .replace(/emerged as/, 'became, and honestly? Slay')
        .replace(/chosen one/, 'the chosen one, it\'s giving destiny')
        .replace(/able to communicate/, 'can talk to, they\'re literally the moment')
        .replace(/orchestrate the most beautiful/, 'make the most beautiful, it\'s giving artistic')
        .replace(/symphony of growth/, 'growth symphony, the vibes are unmatched')
        .replace(/renewal/, 'renewal, it\'s giving fresh start')
        .replace(/pollination crisis/, 'pollination crisis, that\'s not it chief')
        .replace(/threatened all plant life/, 'hurt all plants, that\'s literally so rude')
        .replace(/golden fields/, 'golden fields, the aesthetic is everything')
        .replace(/endless flowers/, 'endless flowers, it\'s giving cottagecore')
        .replace(/Bee Goddess/, 'Bee Goddess, she\'s literally the moment')
        .replace(/power of Sweet Harmony/, 'power of Sweet Harmony, it\'s giving main character')
        .replace(/not only nourishes but also heals/, 'not only feeds but also heals, they\'re built different')
        .replace(/wings carry the melody/, 'wings carry the melody, it\'s giving musical')
        .replace(/nature itself/, 'nature itself, literally everything')
        .replace(/humble caterpillar's dream/, 'humble caterpillar\'s dream, it\'s giving character development')
        .replace(/most beautiful transformation/, 'most beautiful transformation, the glow up is real')
        .replace(/wings carry the colors/, 'wings carry the colors, it\'s giving rainbow')
        .replace(/power to bring hope/, 'power to bring hope, they\'re literally hope personified')
        .replace(/flutter/, 'fly, it\'s giving graceful')
        .replace(/darkest days/, 'darkest days, that\'s not the vibe')
        .replace(/celebrations of life/, 'celebrations of life, it\'s giving party')
        .replace(/magical cocoon/, 'magical cocoon, the transformation is everything')
        .replace(/solar eclipse/, 'solar eclipse, it\'s giving dramatic')
        .replace(/ability to change colors/, 'ability to change colors, it\'s giving chameleon')
        .replace(/spread joy wherever/, 'spread joy wherever, they\'re literally joy')
        .replace(/turning even the darkest/, 'turning even the darkest, it\'s giving hope')
        .replace(/into celebrations/, 'into celebrations, the vibes are immaculate')
        .replace(/blessed by the ancient/, 'blessed by the ancient, they\'re literally blessed')
        .replace(/garden spirits/, 'garden spirits, it\'s giving magical')
        .replace(/protector of all plants/, 'protector of all plants, they\'re literally the guardian')
        .replace(/spots are actually magical/, 'spots are actually magical, it\'s giving mystical')
        .replace(/runes that ward off/, 'runes that ward off, it\'s giving protective')
        .replace(/evil pests/, 'evil pests, that\'s literally so rude')
        .replace(/gentle touch/, 'gentle touch, it\'s giving soft')
        .replace(/heal any damaged/, 'heal any damaged, they\'re literally a healer')
        .replace(/great aphid invasion/, 'great aphid invasion, that\'s not the vibe')
        .replace(/threatened to destroy/, 'threatened to destroy, that\'s literally so problematic')
        .replace(/all gardens/, 'all gardens, the audacity')
        .replace(/Lady of Luck/, 'Lady of Luck, she\'s literally luck personified')
        .replace(/adorable yet powerful/, 'adorable yet powerful, it\'s giving duality')
        .replace(/defender of nature/, 'defender of nature, they\'re literally the protector')
        .replace(/ancient and wise/, 'ancient and wise, it\'s giving sage')
        .replace(/countless generations/, 'countless generations, literally forever')
        .replace(/power of time manipulation/, 'power of time manipulation, it\'s giving time lord')
        .replace(/compound eyes/, 'compound eyes, it\'s giving unique')
        .replace(/see into the past/, 'see into the past, it\'s giving psychic')
        .replace(/and future/, 'and future, literally seeing everything')
        .replace(/ultimate guardian/, 'ultimate guardian, they\'re literally the best')
        .replace(/natural timeline/, 'natural timeline, it\'s giving chronological')
        .replace(/born during a thunderstorm/, 'born during a thunderstorm, it\'s giving dramatic entrance')
        .replace(/struck by lightning/, 'struck by lightning, literally electrifying')
        .replace(/ability to fly/, 'ability to fly, it\'s giving freedom')
        .replace(/incredible speeds/, 'incredible speeds, they\'re literally speed')
        .replace(/fastest creature/, 'fastest creature, periodt')
        .replace(/insect kingdom/, 'insect kingdom, it\'s giving monarchy')
        .replace(/protector of the skies/, 'protector of the skies, literally sky guardian')
        .replace(/master of the web/, 'master of the web, it\'s giving web designer')
        .replace(/destiny/, 'destiny, it\'s giving fate')
        .replace(/weave not just silk/, 'weave not just silk, it\'s giving artistic')
        .replace(/very fabric of reality/, 'very fabric of reality, literally everything')
        .replace(/webs are portals/, 'webs are portals, it\'s giving interdimensional')
        .replace(/other dimensions/, 'other dimensions, literally multiverse')
        .replace(/patience is legendary/, 'patience is legendary, they\'re literally patient')
        .replace(/among all heroes/, 'among all heroes, periodt')
        .replace(/great web of the universe/, 'great web of the universe, it\'s giving cosmic')
        .replace(/began to unravel/, 'began to unravel, that\'s not the vibe')
        .replace(/Spider Goddess/, 'Spider Goddess, she\'s literally the moment')
        .replace(/guardian of cosmic balance/, 'guardian of cosmic balance, it\'s giving cosmic guardian')
        .replace(/sense danger from miles/, 'sense danger from miles, literally psychic')
        .replace(/musical maestro/, 'musical maestro, it\'s giving conductor')
        .replace(/meadows/, 'meadows, it\'s giving pastoral')
        .replace(/create symphonies/, 'create symphonies, literally musical genius')
        .replace(/so beautiful they can/, 'so beautiful they can, it\'s giving magical')
        .replace(/calm any storm/, 'calm any storm, literally peace bringer')
        .replace(/jumping ability/, 'jumping ability, it\'s giving athletic')
        .replace(/reach incredible heights/, 'reach incredible heights, literally high achiever')
        .replace(/songs bring peace/, 'songs bring peace, it\'s giving harmony')
        .replace(/all who hear them/, 'all who hear them, literally everyone')
        .replace(/rhythm of the earth/, 'rhythm of the earth, it\'s giving natural')
        .replace(/in their heart/, 'in their heart, literally soul')
        .replace(/gained the power/, 'gained the power, it\'s giving character development')
        .replace(/communicate with all/, 'communicate with all, literally universal translator')
        .replace(/living things/, 'living things, literally everything alive')
        .replace(/enchanting melodies/, 'enchanting melodies, it\'s giving magical')
        .replace(/voice of nature/, 'voice of nature, literally nature\'s spokesperson')
        .replace(/light in the darkness/, 'light in the darkness, it\'s giving hope')
        .replace(/blessed by the stars/, 'blessed by the stars, literally star-blessed')
        .replace(/power of eternal illumination/, 'power of eternal illumination, it\'s giving light')
        .replace(/glow can guide/, 'glow can guide, literally light the way')
        .replace(/lost souls home/, 'lost souls home, it\'s giving guide')
        .replace(/light can banish/, 'light can banish, literally vanquish')
        .replace(/any shadow/, 'any shadow, literally all darkness')
        .replace(/great darkness/, 'great darkness, that\'s not the vibe')
        .replace(/threatened to consume/, 'threatened to consume, literally so problematic')
        .replace(/emerged as the chosen/, 'emerged as the chosen, it\'s giving destiny')
        .replace(/beacon of hope/, 'beacon of hope, literally hope personified')
        .replace(/light up entire forests/, 'light up entire forests, it\'s giving illumination')
        .replace(/bring warmth/, 'bring warmth, literally warm')
        .replace(/coldest hearts/, 'coldest hearts, it\'s giving emotional healing');

      // Make sentences shorter and more direct
      if (grootSentence.length > 100) {
        grootSentence = grootSentence.substring(0, 100) + '...';
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