import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Users, Zap } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CritterCamera from '@/components/CritterCamera';
import StoryDisplay from '@/components/StoryDisplay';
import CommunityFeed from '@/components/CommunityFeed';
import LoadingHero from '@/components/LoadingHero';
import AnimatedEmojis from '@/components/AnimatedEmojis';
import GrootNarrator from '@/components/GrootNarrator';
import VoiceTest from '@/components/VoiceTest';
import { identifyInsect, generateSuperheroStory, EnhancedStoryData } from '@/lib/insectIdentification';
import { voiceNarrator } from '@/lib/voiceNarration';
import heroInsect from '@/assets/hero-insect.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('capture');
  const [isLoading, setIsLoading] = useState(false);
  const [identifiedInsect, setIdentifiedInsect] = useState<any>(null);
  const [currentStory, setCurrentStory] = useState<EnhancedStoryData | null>(null);
  const [showNarrator, setShowNarrator] = useState(false);
  const [userStories, setUserStories] = useState<EnhancedStoryData[]>([]);

  const generateStory = async (imageData: string) => {
    setIsLoading(true);
    setActiveTab('story');

    try {
      // Simulate insect identification
      const insect = await identifyInsect(imageData);
      setIdentifiedInsect(insect);

      // Generate superhero story
      const story = await generateSuperheroStory(insect);
      setCurrentStory(story);
      setUserStories(prev => [story, ...prev]);

      // Show narrator after a delay
      setTimeout(() => {
        setShowNarrator(true);
      }, 2000);

    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetStory = () => {
    setCurrentStory(null);
    setIdentifiedInsect(null);
    setShowNarrator(false);
    setActiveTab('capture');
  };

  const handleShare = (story: EnhancedStoryData) => {
    // Implement sharing functionality
    console.log('Sharing story:', story);
  };

  const handleStorySelect = (story: EnhancedStoryData) => {
    setCurrentStory(story);
    setShowNarrator(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <AnimatedEmojis />

      <main className="container mx-auto px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8 bg-card/50 backdrop-blur-sm">
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
            <TabsTrigger value="voice-test" className="flex items-center gap-2 font-bangers">
              🎤
              Voice Test
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

          <TabsContent value="voice-test" className="space-y-4">
            <VoiceTest />
          </TabsContent>
        </Tabs>
      </main>

      {/* Story Narrator */}
      <GrootNarrator 
        isActive={showNarrator}
        story={currentStory}
        onNarrationEnd={() => setShowNarrator(false)}
      />
    </div>
  );
};

export default Index;
