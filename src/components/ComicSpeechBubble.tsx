import { useState, useEffect } from 'react';

interface ComicSpeechBubbleProps {
  text: string;
  isVisible: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const ComicSpeechBubble = ({ 
  text, 
  isVisible, 
  position = 'top', 
  delay = 0 
}: ComicSpeechBubbleProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowText(true), delay + 200);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isVisible, delay]);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'absolute -top-16 left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return 'absolute -bottom-16 left-1/2 transform -translate-x-1/2';
      case 'left':
        return 'absolute top-1/2 -left-16 transform -translate-y-1/2';
      case 'right':
        return 'absolute top-1/2 -right-16 transform -translate-y-1/2';
      default:
        return 'absolute -top-16 left-1/2 transform -translate-x-1/2';
    }
  };

  const getTailStyle = () => {
    switch (position) {
      case 'top':
        return 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 80%, 40% 100%, 60% 80%, 0% 80%)';
      case 'bottom':
        return 'polygon(0% 20%, 50% 20%, 60% 0%, 40% 0%, 50% 20%, 100% 20%, 100% 100%, 0% 100%)';
      case 'left':
        return 'polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 50%, 20% 100%)';
      case 'right':
        return 'polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%)';
      default:
        return 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 80%, 40% 100%, 60% 80%, 0% 80%)';
    }
  };

  return (
    <div
      className={`${getPositionClasses()} bg-white text-black px-6 py-3 rounded-full font-bangers text-lg shadow-lg border-2 border-black transition-all duration-500 ease-out`}
      style={{
        transform: isVisible ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, 0) scale(0)',
        opacity: isVisible ? 1 : 0,
        clipPath: getTailStyle(),
        maxWidth: '200px',
        wordWrap: 'break-word'
      }}
    >
      <span
        className={`block text-center transition-opacity duration-300 ${showText ? 'opacity-100' : 'opacity-0'}`}
      >
        {text}
      </span>
    </div>
  );
};

export default ComicSpeechBubble; 