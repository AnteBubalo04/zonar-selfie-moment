import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";

interface CameraScreenProps {
  onCapture: (images: string[]) => void;
}

export const CameraScreen = ({ onCapture }: CameraScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [photoCount, setPhotoCount] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const capturedImages = useRef<string[]>([]);

  useEffect(() => {
    // Request camera access
    navigator.mediaDevices
      .getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1080 },
          height: { ideal: 1920 }
        } 
      })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        // Start countdown after camera is ready
        setTimeout(() => setCountdown(3), 1000);
      })
      .catch((err) => {
        console.error("Camera access error:", err);
        // Fallback for demo: use placeholder images
        setTimeout(() => setCountdown(3), 500);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Capture photo
      capturePhoto();
    }
  }, [countdown]);

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    
    if (video && video.videoWidth > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        capturedImages.current.push(imageData);
      }
    } else {
      // Fallback: use placeholder
      capturedImages.current.push(`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face`);
    }

    const newCount = photoCount + 1;
    setPhotoCount(newCount);

    if (newCount < 3) {
      // Take next photo after 1.5s
      setTimeout(() => setCountdown(3), 1500);
    } else {
      // All photos captured
      setTimeout(() => {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        onCapture(capturedImages.current);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-anthracite relative overflow-hidden">
      {/* Camera feed or placeholder */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        {!stream && (
          <div className="absolute inset-0 bg-gradient-to-br from-anthracite via-anthracite-light to-anthracite flex items-center justify-center">
            <Camera className="w-32 h-32 text-primary/30" />
          </div>
        )}
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 bg-anthracite/40 backdrop-blur-[2px]">
        {/* Guide frame */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full max-w-md aspect-[3/4] border-4 border-primary/50 rounded-3xl shadow-[var(--shadow-glow)] relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-6 py-2 rounded-full border border-primary/30">
              <p className="text-primary text-sm font-semibold">
                Pozicionirajte se u okvir
              </p>
            </div>
            
            {/* Corner guides */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-accent rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-accent rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-accent rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-accent rounded-br-3xl"></div>
          </div>
        </div>

        {/* Countdown display */}
        {countdown !== null && countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-gold"></div>
              <Card className="relative bg-primary/90 backdrop-blur-xl border-4 border-accent w-48 h-48 rounded-full flex items-center justify-center shadow-[var(--shadow-glow)]">
                <span className="font-display text-9xl font-bold text-primary-foreground">
                  {countdown}
                </span>
              </Card>
            </div>
          </div>
        )}

        {/* Photo counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Card className="bg-card/90 backdrop-blur-xl border-2 border-primary/30 px-8 py-4">
            <div className="flex items-center gap-3">
              <Camera className="w-6 h-6 text-primary" />
              <p className="text-foreground font-semibold">
                Fotografija {photoCount + 1} / 3
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
