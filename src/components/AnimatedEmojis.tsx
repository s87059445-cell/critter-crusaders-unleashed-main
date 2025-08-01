import { useEffect, useState } from 'react';

interface AnimatedEmoji {
  id: string;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  scale: number;
}

interface AnimatedEmojisProps {
  isActive: boolean;
  emojis: string[];
  duration?: number;
}

const AnimatedEmojis = ({ isActive, emojis, duration = 8000 }: AnimatedEmojisProps) => {
  const [activeEmojis, setActiveEmojis] = useState<AnimatedEmoji[]>([]);

  useEffect(() => {
    if (!isActive) {
      setActiveEmojis([]);
      return;
    }

    const interval = setInterval(() => {
      const newEmoji: AnimatedEmoji = {
        id: Date.now().toString() + Math.random(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 60 + 20, // 20% to 80% of screen width (avoid center)
        y: Math.random() * 40 + 30, // 30% to 70% of screen height (avoid center)
        delay: Math.random() * 500,
        scale: Math.random() * 0.3 + 0.6 // 0.6 to 0.9 scale (smaller)
      };

      setActiveEmojis(prev => [...prev, newEmoji]);

      // Remove emoji after animation duration
      setTimeout(() => {
        setActiveEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
      }, duration);
    }, 2000); // Create new emoji every 2 seconds (less frequent)

    return () => clearInterval(interval);
  }, [isActive, emojis, duration]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {activeEmojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute animate-emoji-pop"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            transform: `scale(${emoji.scale})`,
            animationDelay: `${emoji.delay}ms`,
            animationDuration: `${duration}ms`
          }}
        >
          <span className="text-2xl md:text-4xl drop-shadow-lg opacity-70">
            {emoji.emoji}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AnimatedEmojis; 