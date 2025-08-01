import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Users, Zap } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CritterCamera from '@/components/CritterCamera';
import StoryDisplay from '@/components/StoryDisplay';
import CommunityFeed from '@/components/CommunityFeed';
import LoadingHero from '@/components/LoadingHero';
import AnimatedEmojis from '@/components/AnimatedEmojis';
import StoryNarrator from '@/components/StoryNarrator';
import { identifyInsect, generateSuperheroStory, EnhancedStoryData } from '@/lib/insectIdentification';
import { voiceNarrator } from '@/lib/voiceNarration';
import heroInsect from '@/assets/hero-insect.jpg';

// Use the enhanced story data interface
type StoryData = EnhancedStoryData;

const Index = () => {
  const [currentStory, setCurrentStory] = useState<StoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userStories, setUserStories] = useState<StoryData[]>([]);
  const [activeTab, setActiveTab] = useState('capture');
  const [isNarrating, setIsNarrating] = useState(false);
  const [identifiedInsect, setIdentifiedInsect] = useState<string | null>(null);
  const [showNarrator, setShowNarrator] = useState(false);

  const generateStory = async (imageData: string) => {
    setIsLoading(true);
    setActiveTab('story');
    
    try {
      // Step 1: Identify the insect
      console.log('Identifying insect...');
      const insect = await identifyInsect(imageData);
      setIdentifiedInsect(insect.name);
      
      // Step 2: Generate superhero story based on insect characteristics
      console.log('Generating superhero story...');
      const newStory = generateSuperheroStory(insect);
      
      // Step 3: Show narrator with ambient sounds
      setCurrentStory(newStory);
      setUserStories(prev => [newStory, ...prev]);
      
      // Show narrator after a short delay
      setTimeout(() => {
        setShowNarrator(true);
        setIsNarrating(true);
      }, 1000);
      
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetStory = () => {
    setCurrentStory(null);
    setActiveTab('capture');
    setIsNarrating(false);
    setIdentifiedInsect(null);
    setShowNarrator(false);
    voiceNarrator.stop();
  };

  const handleNarrationEnd = () => {
    setShowNarrator(false);
    setIsNarrating(false);
  };

  const handleStorySelect = (story: StoryData) => {
    setCurrentStory(story);
    setActiveTab('story');
  };

  const handleShare = (story: StoryData) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${story.heroName}!`,
        text: story.origin,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Animated Emojis during narration (reduced frequency) */}
      <AnimatedEmojis 
        isActive={isNarrating && !showNarrator}
        emojis={['🦋', '🐝', '🐜', '🐞', '🕷️', '🦗', '✨', '⚡', '🌟', '💫', '🎭', '🦸‍♀️', '🦸‍♂️', '🦸', '💪', '🦅', '🌺', '🌻', '🌸', '🌼']}
      />

      {/* Story Narrator */}
      <StoryNarrator 
        isActive={showNarrator}
        story={currentStory}
        onNarrationEnd={handleNarrationEnd}
      />
      
      <div className="relative z-10">
        {/* Hero Header */}
        <header className="text-center py-8 px-4">
          <div className="relative inline-block">
            <img 
              src={heroInsect} 
              alt="Hero Insect" 
              className="absolute -top-4 -left-16 w-12 h-12 opacity-80 animate-float hidden md:block"
            />
            <h1 className="font-bangers text-5xl md:text-7xl text-comic-title tracking-wider">
              Critter Crusaders
            </h1>
            <img 
              src={heroInsect} 
              alt="Hero Insect" 
              className="absolute -top-4 -right-16 w-12 h-12 opacity-80 animate-bounce-gentle hidden md:block"
            />
          </div>
          <p className="text-xl md:text-2xl text-hero-glow font-semibold mt-2">
            Where Every Bug Becomes a Legend!
          </p>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Capture insects with your camera and watch as AI transforms them into epic superheroes. 
            Share stories and connect with fellow Critter Crusaders!
          </p>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="capture" className="flex items-center gap-2 font-bangers">
                <Camera className="w-4 h-4" />
                Capture
              </TabsTrigger>
              <TabsTrigger value="story" className="flex items-center gap-2 font-bangers">
                <Zap className="w-4 h-4" />
                Hero
              </TabsTrigger>
              <TabsTrigger value="community" className="flex items-center gap-2 font-bangers">
                <Users className="w-4 h-4" />
                Community
              </TabsTrigger>
            </TabsList>

            <TabsContent value="capture" className="space-y-6">
              <CritterCamera onCapture={generateStory} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="story" className="space-y-6">
              {isLoading ? (
                <LoadingHero identifiedInsect={identifiedInsect} />
              ) : (
                <StoryDisplay 
                  story={currentStory} 
                  onReset={resetStory}
                  onShare={handleShare}
                />
              )}
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              <CommunityFeed 
                stories={userStories} 
                onStorySelect={handleStorySelect}
              />
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-muted-foreground">
          <p className="text-sm">
            Made with ❤️ for insect enthusiasts and superhero fans
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
