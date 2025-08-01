import { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { voiceNarrator } from '@/lib/voiceNarration';
import { melodyGenerator } from '@/lib/melodyGenerator';

interface StoryNarratorProps {
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

const StoryNarrator = ({ isActive, story, onNarrationEnd }: StoryNarratorProps) => {
  const [isNarrating, setIsNarrating] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const narrationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && story) {
      startNarration();
    } else {
      stopNarration();
    }

    return () => {
      stopNarration();
    };
  }, [isActive, story]);

  const startNarration = () => {
    if (!story) return;

    setIsNarrating(true);
    setTextIndex(0);
    setCurrentText('');

    // Start gentle melody
    melodyGenerator.startMelody();

    // Start Groot's voice narration
    voiceNarrator.speak(
      story.narrationText,
      () => console.log('Groot started speaking'),
      () => {
        console.log('Groot finished speaking');
        setTimeout(() => {
          setIsNarrating(false);
          onNarrationEnd();
        }, 1000);
      }
    ).catch(error => {
      console.error('Voice narration failed:', error);
      // Fallback to typewriter effect
      startTypewriterEffect();
    });

    // Typewriter effect for visual text
    startTypewriterEffect();
  };

  const startTypewriterEffect = () => {
    const words = story.narrationText.split(' ');
    let currentWordIndex = 0;

    narrationIntervalRef.current = setInterval(() => {
      if (currentWordIndex < words.length) {
        setCurrentText(prev => prev + (prev ? ' ' : '') + words[currentWordIndex]);
        currentWordIndex++;
      } else {
        if (narrationIntervalRef.current) {
          clearInterval(narrationIntervalRef.current);
        }
      }
    }, 150); // Speed of word appearance
  };

  const stopNarration = () => {
    setIsNarrating(false);
    setCurrentText('');
    setTextIndex(0);

    if (narrationIntervalRef.current) {
      clearInterval(narrationIntervalRef.current);
      narrationIntervalRef.current = null;
    }

    // Stop melody
    melodyGenerator.stopMelody();

    // Stop voice narration
    voiceNarrator.stop();
  };

  if (!isActive || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Groot narrator character */}
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <div className="card-hero p-8 space-y-6 text-center">
          {/* Realistic Groot character */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Groot's main body */}
              <div className="w-44 h-56 bg-gradient-to-b from-brown-900 via-brown-800 to-brown-700 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
                {/* Detailed bark texture */}
                <div className="absolute inset-0 bg-gradient-to-r from-brown-950/40 to-brown-900/40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-brown-950/20 via-transparent to-brown-800/30"></div>
                
                {/* Bark ridges and details */}
                <div className="absolute top-2 left-6 w-1 h-12 bg-brown-950/60 rounded-full"></div>
                <div className="absolute top-8 right-8 w-2 h-8 bg-brown-950/60 rounded-full"></div>
                <div className="absolute bottom-12 left-10 w-1.5 h-16 bg-brown-950/60 rounded-full"></div>
                <div className="absolute top-16 left-4 w-1 h-10 bg-brown-950/60 rounded-full"></div>
                <div className="absolute bottom-6 right-4 w-1.5 h-14 bg-brown-950/60 rounded-full"></div>
                
                {/* Groot's realistic face */}
                <div className="relative z-10">
                  {/* Eye sockets */}
                  <div className="flex justify-center gap-10 mb-6">
                    <div className="relative">
                      <div className="w-8 h-8 bg-brown-950 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 bg-yellow-300 rounded-full animate-pulse shadow-lg"></div>
                      </div>
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-brown-950/80 rounded-full"></div>
                    </div>
                    <div className="relative">
                      <div className="w-8 h-8 bg-brown-950 rounded-full flex items-center justify-center">
                        <div className="w-5 h-5 bg-yellow-300 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-brown-950/80 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Nose area */}
                  <div className="w-6 h-3 bg-brown-950 rounded-full mx-auto mb-3"></div>
                  
                  {/* Mouth */}
                  <div className="w-10 h-3 bg-brown-950 rounded-full mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brown-950 to-brown-900 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Groot's main branches/arms */}
              <div className="absolute -top-4 left-4 w-8 h-24 bg-gradient-to-b from-brown-800 to-brown-700 rounded-full transform -rotate-15 shadow-xl"></div>
              <div className="absolute -top-4 right-4 w-8 h-24 bg-gradient-to-b from-brown-800 to-brown-700 rounded-full transform rotate-15 shadow-xl"></div>
              
              {/* Secondary branches */}
              <div className="absolute top-6 left-12 w-4 h-16 bg-gradient-to-b from-brown-700 to-brown-600 rounded-full transform -rotate-8"></div>
              <div className="absolute top-8 right-12 w-4 h-14 bg-gradient-to-b from-brown-700 to-brown-600 rounded-full transform rotate-8"></div>
              
              {/* Smaller branches and twigs */}
              <div className="absolute top-12 left-6 w-2 h-8 bg-brown-600 rounded-full transform -rotate-12"></div>
              <div className="absolute top-14 right-6 w-2 h-6 bg-brown-600 rounded-full transform rotate-12"></div>
              <div className="absolute bottom-8 left-16 w-2 h-10 bg-brown-600 rounded-full transform -rotate-6"></div>
              <div className="absolute bottom-10 right-16 w-2 h-8 bg-brown-600 rounded-full transform rotate-6"></div>
              
              {/* Leaves and foliage */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-green-600 rounded-full opacity-80"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full opacity-60"></div>
                  <div className="w-3 h-3 bg-green-600 rounded-full opacity-80"></div>
                </div>
              </div>
              
              {/* Speaking animation with Groot's signature "I am Groot" style */}
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

          {/* Story title */}
          <div className="space-y-2">
            <h2 className="font-bangers text-3xl text-comic-title">
              I am Groot...
            </h2>
            <p className="text-secondary font-semibold">
              Story of {story.heroName} 🐛
            </p>
            <p className="text-sm text-muted-foreground">
              *Groot's deep voice echoes through the forest*
            </p>
          </div>

          {/* Narration text */}
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="space-y-4 max-w-2xl">
              <p className="text-lg text-foreground/90 leading-relaxed font-medium">
                {currentText}
                {isNarrating && (
                  <span className="inline-block w-2 h-6 bg-secondary ml-1 animate-pulse"></span>
                )}
              </p>
              
              {/* Story elements that appear as narration progresses */}
              {currentText.includes('powers') && (
                <div className="flex justify-center gap-4 mt-4">
                  {story.powers.slice(0, 2).map((power, index) => (
                    <div key={index} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm animate-fade-in">
                      {power.split(' ')[0]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Melody indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Gentle Melody Playing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryNarrator; 