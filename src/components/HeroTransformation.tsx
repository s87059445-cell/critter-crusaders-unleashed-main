import { useState, useEffect } from 'react';

interface HeroTransformationProps {
  insect: any;
  isVisible: boolean;
  onComplete: () => void;
}

const HeroTransformation = ({ insect, isVisible, onComplete }: HeroTransformationProps) => {
  const [stage, setStage] = useState(0);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  useEffect(() => {
    if (isVisible) {
      startTransformation();
    }
  }, [isVisible]);

  const startTransformation = () => {
    setStage(0);
    setShowSpeechBubble(false);
    
    // Stage 1: Detection
    setTimeout(() => setStage(1), 500);
    
    // Stage 2: Analysis
    setTimeout(() => setStage(2), 1500);
    
    // Stage 3: Transformation
    setTimeout(() => setStage(3), 2500);
    
    // Stage 4: Hero reveal
    setTimeout(() => {
      setStage(4);
      setShowSpeechBubble(true);
    }, 3500);
    
    // Stage 5: Complete
    setTimeout(() => {
      setStage(5);
      onComplete();
    }, 6000);
  };

  const transformationStages = [
    "SCANNING...",
    "ANALYZING DNA...",
    "TRANSFORMING...",
    "HERO EMERGING...",
    "MISSION READY!"
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 animate-in fade-in-0 duration-500">
      {/* Comic book panels */}
      <div className="relative w-full h-full max-w-4xl max-h-96">
        {/* Panel 1: Detection */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl border-4 border-white shadow-2xl transition-all duration-500 ${
            stage >= 1 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          <div className="p-8 text-center">
            <div className="text-6xl mb-4 animate-spin" style={{ animationDuration: '2s' }}>
              🔍
            </div>
            <h2 className="font-bangers text-3xl text-white mb-2">DETECTION PHASE</h2>
            <p className="text-white font-bangers text-xl">Target Acquired!</p>
          </div>
        </div>

        {/* Panel 2: Analysis */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-green-900 to-blue-900 rounded-2xl border-4 border-white shadow-2xl transition-all duration-500 ${
            stage >= 2 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          <div className="p-8 text-center">
            <div className="text-6xl mb-4 animate-pulse">
              🧬
            </div>
            <h2 className="font-bangers text-3xl text-white mb-2">ANALYSIS PHASE</h2>
            <p className="text-white font-bangers text-xl">Genetic Code Decoded!</p>
          </div>
        </div>

        {/* Panel 3: Transformation */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-yellow-900 to-orange-900 rounded-2xl border-4 border-white shadow-2xl transition-all duration-500 ${
            stage >= 3 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
        >
          <div className="p-8 text-center">
            <div className="text-6xl mb-4 animate-bounce">
              ⚡
            </div>
            <h2 className="font-bangers text-3xl text-white mb-2">TRANSFORMATION PHASE</h2>
            <p className="text-white font-bangers text-xl">Powers Awakening!</p>
          </div>
        </div>

        {/* Panel 4: Hero Reveal */}
        <div
          className={`absolute inset-0 rounded-2xl border-4 border-white shadow-2xl overflow-hidden transition-all duration-500 ${
            stage >= 4 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
          style={{ 
            background: `linear-gradient(135deg, ${insect?.color || '#FFD700'}20, ${insect?.color || '#FFD700'}40, ${insect?.color || '#FFD700'}60)`
          }}
        >
          <div className="p-8 text-center relative">
            {/* Animated background sparkles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '2s',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: '0 0 10px #ffff00'
                }}
              />
            ))}

            <div className="text-8xl mb-4 animate-in zoom-in-0 duration-1000">
              {insect?.icon || '🦸'}
            </div>

            <h2 className="font-bangers text-4xl text-white mb-2 drop-shadow-lg animate-in slide-in-from-top-4 duration-500">
              {insect?.heroName || 'SUPER HERO'}
            </h2>

            <div className="text-white font-bangers text-lg animate-in slide-in-from-bottom-4 duration-500">
              READY FOR ACTION!
            </div>
          </div>
        </div>

        {/* Speech Bubble */}
        {showSpeechBubble && (
          <div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full font-bangers text-lg shadow-lg animate-in zoom-in-0 duration-500"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 80%, 40% 100%, 60% 80%, 0% 80%)'
            }}
          >
            "I AM HERE TO SAVE THE DAY!"
          </div>
        )}

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full font-bangers text-sm animate-in fade-in-0 duration-500">
          {transformationStages[stage] || "INITIALIZING..."}
        </div>
      </div>
    </div>
  );
};

export default HeroTransformation; 