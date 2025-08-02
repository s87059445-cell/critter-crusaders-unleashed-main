import { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { grootVoice } from '@/lib/grootVoice';
import { forestAmbiance } from '@/lib/forestAmbiance';
import { voiceNarrator } from '@/lib/voiceNarration';

interface GrootNarratorProps {
  isActive: boolean;
  story: {
    heroName: string;
    insectType: string;
    origin: string;
    powers: string[];
    weakness: string;
    nemesis: string;
    narrationText: string;
  } | null;
  onNarrationEnd: () => void;
}

interface ComicPanel {
  id: number;
  content: string;
  mood: 'peaceful' | 'excited' | 'shocked' | 'proud' | 'mysterious';
  grootExpression: 'neutral' | 'shocked' | 'proud' | 'concerned' | 'happy';
  background: string;
  elements: string[];
  grootPhrase: string;
}

const GrootNarrator = ({ isActive, story, onNarrationEnd }: GrootNarratorProps) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [grootExpression, setGrootExpression] = useState<'neutral' | 'shocked' | 'proud' | 'concerned' | 'happy'>('neutral');
  const [ambientMood, setAmbientMood] = useState<'peaceful' | 'stormy' | 'magical' | 'triumphant'>('peaceful');
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [subtitleText, setSubtitleText] = useState('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Comic panels based on story phases
  const comicPanels: ComicPanel[] = [
    {
      id: 1,
      content: "In the ancient forest, where magic flows like rivers...",
      mood: 'mysterious',
      grootExpression: 'neutral',
      background: 'forest-night',
      elements: ['fireflies', 'moonlight', 'mist'],
      grootPhrase: "I am Groot. In the ancient forest, where magic flows like rivers... I am Groot."
    },
    {
      id: 2,
      content: `A tiny ${story?.insectType || 'insect'} emerged, unaware of its destiny...`,
      mood: 'peaceful',
      grootExpression: 'happy',
      background: 'forest-dawn',
      elements: ['sunlight', 'flowers', 'butterflies'],
      grootPhrase: `I am Groot. A tiny ${story?.insectType || 'insect'} emerged, unaware of its destiny... I am Groot.`
    },
    {
      id: 3,
      content: `But darkness approached! The villainous ${story?.nemesis || 'nemesis'} appeared!`,
      mood: 'shocked',
      grootExpression: 'shocked',
      background: 'forest-storm',
      elements: ['lightning', 'dark-clouds', 'wind'],
      grootPhrase: `I am Groot. But darkness approached! The villainous ${story?.nemesis || 'nemesis'} appeared! I am Groot.`
    },
    {
      id: 4,
      content: `Our hero ${story?.heroName} discovered incredible powers!`,
      mood: 'excited',
      grootExpression: 'proud',
      background: 'forest-magical',
      elements: ['sparkles', 'aurora', 'glowing-mushrooms'],
      grootPhrase: `I am Groot. Our hero ${story?.heroName} discovered incredible powers! I am Groot.`
    },
    {
      id: 5,
      content: `With courage and determination, ${story?.heroName} saved the day!`,
      mood: 'proud',
      grootExpression: 'proud',
      background: 'forest-triumphant',
      elements: ['sunshine', 'rainbow', 'blooming-flowers'],
      grootPhrase: `I am Groot. With courage and determination, ${story?.heroName} saved the day! I am Groot.`
    }
  ];

  useEffect(() => {
    if (isActive && story) {
      startGrootNarration();
    } else {
      stopNarration();
    }

    return () => {
      stopNarration();
    };
  }, [isActive, story]);

  const startGrootNarration = async () => {
    if (!story) return;

    setIsNarrating(true);
    setCurrentPanel(0);
    setCurrentText('');
    setShowSubtitles(true);

    // Start forest ambiance
    forestAmbiance.startAmbiance('peaceful');

    // Begin panel narration
    narratePanel(0);
  };

  const narratePanel = (panelIndex: number) => {
    if (panelIndex >= comicPanels.length) {
      setTimeout(() => {
        setIsNarrating(false);
        forestAmbiance.stopAmbiance();
        onNarrationEnd();
      }, 2000);
      return;
    }

    const panel = comicPanels[panelIndex];
    setCurrentPanel(panelIndex);
    setGrootExpression(panel.grootExpression);
    setAmbientMood(panel.mood as any);
    setSubtitleText(panel.content);

    // Change forest ambiance based on mood
    switch (panel.mood) {
      case 'mysterious':
        forestAmbiance.changeMood('peaceful');
        break;
      case 'peaceful':
        forestAmbiance.changeMood('peaceful');
        break;
      case 'shocked':
        forestAmbiance.changeMood('stormy');
        break;
      case 'excited':
        forestAmbiance.changeMood('magical');
        break;
      case 'proud':
        forestAmbiance.changeMood('triumphant');
        break;
    }

    // Start Groot's voice narration
    grootVoice.speak(panel.grootPhrase, 
      () => console.log('Groot started speaking panel', panelIndex),
      () => console.log('Groot finished speaking panel', panelIndex)
    ).catch(error => {
      console.error('Groot voice failed:', error);
      // Fallback to forest-style narration
      voiceNarrator.speakForestStyle(panel.content, 
        () => console.log('Forest voice started speaking panel', panelIndex),
        () => console.log('Forest voice finished speaking panel', panelIndex)
      ).catch(fallbackError => {
        console.error('Forest voice also failed:', fallbackError);
      });
    });

    // Typewriter effect for panel text
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < panel.content.length) {
        setCurrentText(panel.content.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Move to next panel after delay
        setTimeout(() => {
          narratePanel(panelIndex + 1);
        }, 3000);
      }
    }, 100);
  };

  const stopNarration = () => {
    setIsNarrating(false);
    setCurrentText('');
    setCurrentPanel(0);
    setShowSubtitles(false);
    setSubtitleText('');

    // Stop voice and ambiance
    grootVoice.stop();
    forestAmbiance.stopAmbiance();
  };

  const getGrootFace = (expression: string) => {
    const baseFace = (
      <div className="relative z-10">
        {/* Eye sockets */}
        <div className="flex justify-center gap-10 mb-6">
          <div className="relative">
            <div className="w-8 h-8 bg-brown-950 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-yellow-300 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>
          <div className="relative">
            <div className="w-8 h-8 bg-brown-950 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-yellow-300 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
        
        {/* Nose area */}
        <div className="w-6 h-3 bg-brown-950 rounded-full mx-auto mb-3"></div>
        
        {/* Mouth */}
        <div className="w-10 h-3 bg-brown-950 rounded-full mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-brown-950 to-brown-900 rounded-full"></div>
        </div>
      </div>
    );

    switch (expression) {
      case 'shocked':
        return (
          <div className="relative z-10">
            {/* Wide eyes */}
            <div className="flex justify-center gap-12 mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-brown-950 rounded-full flex items-center justify-center">
                  <div className="w-7 h-7 bg-yellow-300 rounded-full animate-pulse shadow-lg"></div>
                </div>
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-brown-950 rounded-full flex items-center justify-center">
                  <div className="w-7 h-7 bg-yellow-300 rounded-full animate-pulse shadow-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Open mouth */}
            <div className="w-12 h-6 bg-brown-950 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-8 h-4 bg-brown-900 rounded-full"></div>
            </div>
          </div>
        );
      
      case 'proud':
        return (
          <div className="relative z-10">
            {/* Confident eyes */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="relative">
                <div className="w-8 h-8 bg-brown-950 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-yellow-300 rounded-full shadow-lg"></div>
                </div>
              </div>
              <div className="relative">
                <div className="w-8 h-8 bg-brown-950 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-yellow-300 rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>
            
            {/* Smile */}
            <div className="w-10 h-4 bg-brown-950 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-8 h-2 bg-brown-900 rounded-full"></div>
            </div>
          </div>
        );
      
      default:
        return baseFace;
    }
  };

  const getBackgroundStyle = (mood: string) => {
    switch (mood) {
      case 'forest-night':
        return 'bg-gradient-to-b from-gray-900 via-blue-900 to-black';
      case 'forest-dawn':
        return 'bg-gradient-to-b from-orange-200 via-yellow-200 to-green-200';
      case 'forest-storm':
        return 'bg-gradient-to-b from-gray-800 via-purple-900 to-black';
      case 'forest-magical':
        return 'bg-gradient-to-b from-purple-900 via-pink-800 to-indigo-900';
      case 'forest-triumphant':
        return 'bg-gradient-to-b from-yellow-200 via-orange-300 to-red-400';
      default:
        return 'bg-gradient-to-b from-green-800 via-green-700 to-green-900';
    }
  };

  if (!isActive || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Dynamic background */}
      <div className={`absolute inset-0 ${getBackgroundStyle(comicPanels[currentPanel]?.background || 'forest-dawn')} transition-all duration-2000`} />
      
      {/* Animated forest elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Falling leaves */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="forest-leaf animate-leaf-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Blooming flowers */}
        {ambientMood === 'peaceful' && [...Array(8)].map((_, i) => (
          <div
            key={i}
            className="forest-flower animate-flower-bloom"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}

        {/* Growing vines */}
        {ambientMood === 'magical' && [...Array(5)].map((_, i) => (
          <div
            key={i}
            className="forest-vine animate-vine-grow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
        
        {/* Fireflies */}
        {ambientMood === 'magical' && [...Array(15)].map((_, i) => (
          <div
            key={i}
            className="forest-firefly animate-firefly-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}

        {/* Lightning flashes */}
        {ambientMood === 'stormy' && [...Array(3)].map((_, i) => (
          <div
            key={i}
            className="forest-lightning animate-lightning-flash"
            style={{
              animationDelay: `${i * 2}s`,
              animationDuration: '0.5s'
            }}
          />
        ))}

        {/* Rain drops */}
        {ambientMood === 'stormy' && [...Array(30)].map((_, i) => (
          <div
            key={i}
            className="forest-rain animate-rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 0.5}s`
            }}
          />
        ))}

        {/* Sparkles */}
        {ambientMood === 'triumphant' && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="forest-sparkle animate-sparkle-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Comic panel container */}
      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Groot character panel */}
          <div className={`card-hero p-8 space-y-6 text-center scroll-border moss-overlay ${currentPanel > 0 ? 'animate-panel-fade' : ''}`}>
            {/* Groot character */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Groot's main body */}
                <div className={`w-44 h-56 bg-gradient-to-b from-brown-900 via-brown-800 to-brown-700 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden animate-bark-texture ${isNarrating ? 'animate-groot-speak' : ''}`}>
                  {/* Bark texture */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brown-950/40 to-brown-900/40"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-brown-950/20 via-transparent to-brown-800/30"></div>
                  
                  {/* Bark ridges */}
                  <div className="absolute top-2 left-6 w-1 h-12 bg-brown-950/60 rounded-full"></div>
                  <div className="absolute top-8 right-8 w-2 h-8 bg-brown-950/60 rounded-full"></div>
                  <div className="absolute bottom-12 left-10 w-1.5 h-16 bg-brown-950/60 rounded-full"></div>
                  
                  {/* Groot's face */}
                  {getGrootFace(grootExpression)}
                </div>
                
                {/* Branches */}
                <div className="absolute -top-4 left-4 w-8 h-24 bg-gradient-to-b from-brown-800 to-brown-700 rounded-full transform -rotate-15 shadow-xl"></div>
                <div className="absolute -top-4 right-4 w-8 h-24 bg-gradient-to-b from-brown-800 to-brown-700 rounded-full transform rotate-15 shadow-xl"></div>
                
                {/* Speaking animation */}
                {isNarrating && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brown-800/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-brown-600">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Groot's title */}
            <div className="space-y-2">
              <h2 className="font-bangers text-3xl text-yellow-300 drop-shadow-lg">
                I am Groot...
              </h2>
              <p className="text-brown-200 font-semibold">
                Ancient Forest Narrator
              </p>
            </div>
          </div>

          {/* Story panel */}
          <div className={`card-hero p-8 space-y-6 text-center scroll-border moss-overlay ${currentPanel > 0 ? 'animate-panel-fade' : ''}`}>
            {/* Panel title */}
            <div className="space-y-2">
              <h3 className="font-bangers text-2xl text-yellow-300">
                Panel {currentPanel + 1} of {comicPanels.length}
              </h3>
              <p className="text-brown-200 text-sm">
                {comicPanels[currentPanel]?.mood.toUpperCase() || 'MYSTERIOUS'}
              </p>
            </div>

            {/* Story text */}
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="space-y-4 max-w-lg">
                <p className="text-lg text-brown-100 leading-relaxed font-medium">
                  {currentText}
                  {isNarrating && (
                    <span className="inline-block w-2 h-6 bg-yellow-300 ml-1 animate-pulse"></span>
                  )}
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center">
              <div className="flex space-x-2">
                {comicPanels.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentPanel ? 'bg-yellow-300 animate-moss-glow' : 'bg-brown-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Glowing subtitles */}
        {showSubtitles && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-6 py-4 border-2 border-yellow-300/50 shadow-2xl animate-moss-glow">
              <p className="text-yellow-300 font-bangers text-lg text-center drop-shadow-lg">
                {subtitleText}
              </p>
            </div>
          </div>
        )}

        {/* Ambient indicator */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-brown-600">
          <div className="flex items-center gap-2 text-brown-200 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Forest Ambiance: {ambientMood.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrootNarrator; 