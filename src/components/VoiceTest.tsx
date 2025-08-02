import { useState } from 'react';
import { voiceNarrator } from '@/lib/voiceNarration';

const VoiceTest = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string>('');

  const testVoice = async () => {
    setIsTesting(true);
    setTestResult('Testing voice narration...');
    
    try {
      await voiceNarrator.testVoice();
      setTestResult('✅ Voice narration test successful!');
    } catch (error) {
      setTestResult(`❌ Voice narration test failed: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  const testStory = async () => {
    setIsTesting(true);
    setTestResult('Testing story narration...');
    
    try {
      await voiceNarrator.speakForestStyle(
        "In the ancient forest, a hero emerged with incredible powers. This is a test of the deep forest voice narration system.",
        () => setTestResult('🎤 Story narration started...'),
        () => setTestResult('✅ Story narration completed!')
      );
    } catch (error) {
      setTestResult(`❌ Story narration failed: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-lg">
      <h3 className="text-lg font-bold mb-4">Voice Narration Test</h3>
      
      <div className="space-y-4">
        <button
          onClick={testVoice}
          disabled={isTesting}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isTesting ? 'Testing...' : 'Test Basic Voice'}
        </button>
        
        <button
          onClick={testStory}
          disabled={isTesting}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isTesting ? 'Testing...' : 'Test Story Narration'}
        </button>
        
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm font-mono">{testResult}</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceTest; 