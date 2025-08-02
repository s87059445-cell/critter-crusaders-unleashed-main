import { useState, useEffect, useRef } from 'react';

interface InsectDetectorProps {
  isActive: boolean;
  onInsectDetected: (insect: any) => void;
}

interface Insect {
  name: string;
  heroName: string;
  powers: string[];
  origin: string;
  color: string;
  icon: string;
}

const InsectDetector = ({ isActive, onInsectDetected }: InsectDetectorProps) => {
  const [scanning, setScanning] = useState(false);
  const [detectedInsect, setDetectedInsect] = useState<Insect | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const radarRef = useRef<HTMLDivElement>(null);

  // Sample insect database
  const insectDatabase: Insect[] = [
    {
      name: "Honey Bee",
      heroName: "Buzzy Avenger",
      powers: ["Antenna Telepathy", "Pollen Power Blast", "Hive Mind Control"],
      origin: "Born in the golden fields of eternal spring, this bee gained superpowers after being exposed to radioactive honey.",
      color: "#FFD700",
      icon: "🐝"
    },
    {
      name: "Ladybug",
      heroName: "Lady Justice",
      powers: ["Spot Shield", "Flight of Justice", "Lucky Charm"],
      origin: "A guardian of the garden, blessed by the ancient spirits of nature to protect all living things.",
      color: "#FF0000",
      icon: "🐞"
    },
    {
      name: "Butterfly",
      heroName: "Morpho Master",
      powers: ["Wing Mirage", "Pollen Storm", "Metamorphosis"],
      origin: "Transformed by cosmic radiation during a solar eclipse, gaining the power to change reality itself.",
      color: "#9370DB",
      icon: "🦋"
    },
    {
      name: "Ant",
      heroName: "Colony Commander",
      powers: ["Super Strength", "Hive Intelligence", "Tunnel Vision"],
      origin: "Enhanced by underground energy crystals, this ant leads an army of super-powered insects.",
      color: "#8B4513",
      icon: "🐜"
    },
    {
      name: "Dragonfly",
      heroName: "Aerial Ace",
      powers: ["Lightning Speed", "360° Vision", "Wind Control"],
      origin: "Struck by lightning while flying through a storm, gaining the power of the wind itself.",
      color: "#00CED1",
      icon: "🦗"
    }
  ];

  useEffect(() => {
    if (isActive) {
      startScanning();
    } else {
      stopScanning();
    }
  }, [isActive]);

  const startScanning = () => {
    setScanning(true);
    // Simulate insect detection after a random delay
    setTimeout(() => {
      const randomInsect = insectDatabase[Math.floor(Math.random() * insectDatabase.length)];
      detectInsect(randomInsect);
    }, Math.random() * 3000 + 2000); // 2-5 seconds
  };

  const stopScanning = () => {
    setScanning(false);
    setDetectedInsect(null);
    setShowProfile(false);
  };

  const detectInsect = (insect: Insect) => {
    setDetectedInsect(insect);
    setShowProfile(true);
    onInsectDetected(insect);
    
    // Hide profile after 5 seconds
    setTimeout(() => {
      setShowProfile(false);
    }, 5000);
  };

  return (
    <div className="relative w-full h-full">
      {/* Radar Scanner */}
      <div
        ref={radarRef}
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${scanning ? 'animate-spin' : ''}`}
        style={{ animationDuration: '2s' }}
      >
        <div className="relative w-64 h-64">
          {/* Radar circles */}
          <div className="absolute inset-0 border-2 border-green-400 rounded-full opacity-30"></div>
          <div className="absolute inset-4 border-2 border-green-400 rounded-full opacity-50"></div>
          <div className="absolute inset-8 border-2 border-green-400 rounded-full opacity-70"></div>
          
          {/* Scanning line */}
          <div
            className={`absolute top-1/2 left-1/2 w-1 h-32 bg-green-400 origin-bottom ${scanning ? 'animate-spin' : ''}`}
            style={{ 
              animationDuration: '1s',
              boxShadow: '0 0 10px #00ff00'
            }}
          />
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
               style={{ boxShadow: '0 0 20px #00ff00' }}>
          </div>
        </div>
      </div>

      {/* Scanning text */}
      <div
        className={`absolute top-4 left-1/2 transform -translate-x-1/2 text-green-400 font-bangers text-xl transition-opacity duration-1000 ${scanning ? 'animate-pulse' : 'opacity-50'}`}
      >
        SCANNING FOR HEROES...
      </div>

      {/* Animated sparkles */}
      {scanning && (
        <>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 10px #ffff00'
              }}
            />
          ))}
        </>
      )}

      {/* Superhero Profile Card */}
      {showProfile && detectedInsect && (
        <div
          className="absolute inset-0 flex items-center justify-center z-50 animate-in fade-in-0 zoom-in-95 duration-500"
        >
          <div 
            className="relative w-80 h-96 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-2xl p-6 shadow-2xl border-4 border-white"
            style={{ 
              background: `linear-gradient(135deg, ${detectedInsect.color}20, ${detectedInsect.color}40, ${detectedInsect.color}60)`,
              boxShadow: `0 0 30px ${detectedInsect.color}`
            }}
          >
            {/* Comic book border */}
            <div className="absolute inset-0 rounded-2xl border-4 border-black opacity-20"></div>
            
            {/* Hero icon */}
            <div
              className="text-6xl text-center mb-4 animate-in zoom-in-0 duration-800"
              style={{ animationDelay: '0.3s' }}
            >
              {detectedInsect.icon}
            </div>

            {/* Hero name */}
            <h2
              className="font-bangers text-3xl text-center mb-2 text-white drop-shadow-lg animate-in slide-in-from-top-4 duration-500"
              style={{ animationDelay: '0.5s' }}
            >
              {detectedInsect.heroName}
            </h2>

            {/* Powers */}
            <div
              className="mb-4 animate-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: '0.7s' }}
            >
              <h3 className="font-bangers text-lg text-white mb-2">POWERS:</h3>
              <ul className="space-y-1">
                {detectedInsect.powers.map((power, index) => (
                  <li
                    key={power}
                    className="text-sm text-white bg-black bg-opacity-30 px-2 py-1 rounded animate-in slide-in-from-left-4 duration-300"
                    style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                  >
                    ⚡ {power}
                  </li>
                ))}
              </ul>
            </div>

            {/* Origin story */}
            <div
              className="text-xs text-white bg-black bg-opacity-20 p-2 rounded animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: '1.1s' }}
            >
              <p className="font-bangers text-sm mb-1">ORIGIN:</p>
              <p>{detectedInsect.origin}</p>
            </div>

            {/* Speech bubble */}
            <div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full font-bangers text-sm animate-in zoom-in-0 duration-500"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 80%, 40% 100%, 60% 80%, 0% 80%)',
                animationDelay: '1.3s'
              }}
            >
              "I AM HERE TO SAVE THE DAY!"
            </div>

            {/* Animated background elements */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl animate-in fade-in-0 duration-1000"
              style={{ animationDelay: '0.5s' }}
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                  style={{ 
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '2s',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsectDetector; 