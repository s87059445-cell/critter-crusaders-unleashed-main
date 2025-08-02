import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Zap, RotateCcw } from 'lucide-react';
import InsectDetector from './InsectDetector';
import HeroTransformation from './HeroTransformation';

interface CritterCameraProps {
  onCapture: (imageData: string) => void;
  isLoading?: boolean;
}

const CritterCamera = ({ onCapture, isLoading = false }: CritterCameraProps) => {
  const [isActive, setIsActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedInsect, setDetectedInsect] = useState<any>(null);
  const [showTransformation, setShowTransformation] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleInsectDetected = (insect: any) => {
    setDetectedInsect(insect);
    setShowTransformation(true);
    console.log('Insect detected:', insect);
  };

  const handleTransformationComplete = () => {
    setShowTransformation(false);
    // Optionally trigger image capture after transformation
    setTimeout(() => {
      if (videoRef.current && canvasRef.current) {
        captureImage();
      }
    }, 1000);
  };

  const startCamera = useCallback(async () => {
    console.log('Attempting to start camera...');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }

      // First, set the camera as active to ensure the video element is rendered
      setIsActive(true);

      // Wait a bit for the video element to be mounted
      await new Promise(resolve => setTimeout(resolve, 100));

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      console.log('Camera stream obtained successfully');

      // Check if video ref exists after setting isActive
      if (!videoRef.current) {
        console.error('Video ref is still null after setting isActive');
        setIsActive(false);
        setHasPermission(false);
        return;
      }

      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      
      // Wait for video to be ready before confirming active state
      videoRef.current.onloadedmetadata = () => {
        console.log('Video metadata loaded');
        videoRef.current?.play().then(() => {
          console.log('Video playback started');
          setHasPermission(true);
        }).catch((error) => {
          console.error('Video play error:', error);
          setIsActive(false);
          setHasPermission(false);
        });
      };

      // Add event listener for when video actually starts playing
      videoRef.current.onplaying = () => {
        console.log('Video is now playing');
      };

      videoRef.current.onwaiting = () => {
        console.log('Video is waiting for data');
      };

      videoRef.current.onerror = (error) => {
        console.error('Video element error:', error);
        setIsActive(false);
        setHasPermission(false);
      };

      console.log('Video element configured');
    } catch (error: any) {
      console.error('Camera access error:', error);
      setIsActive(false);
      setHasPermission(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
  }, []);

  const confirmCapture = useCallback(() => {
    if (capturedImage) {
      onCapture(capturedImage);
      stopCamera();
      setCapturedImage(null);
    }
  }, [capturedImage, onCapture, stopCamera]);

  const retakeImage = useCallback(() => {
    setCapturedImage(null);
  }, []);

  const resetCamera = useCallback(() => {
    stopCamera();
    startCamera();
    setCapturedImage(null);
  }, [stopCamera, startCamera]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-hero p-6 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-bangers text-2xl text-comic-title">
            Capture Your Critter!
          </h3>
          <p className="text-muted-foreground">
            {!isActive
              ? "Ready to discover your insect's superpowers?"
              : capturedImage
              ? "Preview your critter before confirming!"
              : "Point your camera at an insect and capture!"}
          </p>
        </div>

        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-primary/30">
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured preview"
              className="w-full h-full object-cover"
            />
          ) : isActive ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                controls={false}
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }} // Mirror the camera for better UX
              />
              {/* Insect Detector Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <InsectDetector 
                  isActive={isActive} 
                  onInsectDetected={handleInsectDetected}
                />
              </div>
              {/* Debug overlay to show camera is active */}
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                LIVE
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-cosmic">
              <div className="text-center space-y-4">
                <Camera className="w-16 h-16 mx-auto text-foreground/50" />
                <div className="space-y-2">
                  {hasPermission === false ? (
                    <>
                      <p className="text-destructive font-semibold">Camera access denied</p>
                      <p className="text-sm text-muted-foreground">
                        Please enable camera permissions
                      </p>
                    </>
                  ) : (
                    <p className="text-foreground/70">Camera inactive</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          {!isActive ? (
            <button
              onClick={startCamera}
              disabled={isLoading}
              className="btn-comic px-6 py-3 font-bangers text-lg flex items-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Start Camera
            </button>
          ) : capturedImage ? (
            <>
              <button
                onClick={confirmCapture}
                disabled={isLoading}
                className="btn-hero px-6 py-3 font-bangers text-lg flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Confirm Hero!
              </button>
              <button
                onClick={retakeImage}
                disabled={isLoading}
                className="btn-comic px-4 py-3 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake
              </button>
            </>
          ) : (
            <>
              <button
                onClick={captureImage}
                disabled={isLoading}
                className="btn-hero px-8 py-3 font-bangers text-xl flex items-center gap-2 animate-pulse-glow"
              >
                <Zap className="w-5 h-5" />
                Unleash Hero!
              </button>
              <button
                onClick={resetCamera}
                disabled={isLoading}
                className="btn-comic px-4 py-3 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Hero Transformation Sequence */}
      <HeroTransformation
        insect={detectedInsect}
        isVisible={showTransformation}
        onComplete={handleTransformationComplete}
      />
    </div>
  );
};

export default CritterCamera;
