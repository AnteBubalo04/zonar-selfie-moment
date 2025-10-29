import { Input } from "@/components/ui/input";
import { Camera, ArrowDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface WelcomeScreenProps {
  onScan: (uid: string) => void;
}

export const WelcomeScreen = ({ onScan }: WelcomeScreenProps) => {
  const [uid, setUid] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Start inactive camera view
    navigator.mediaDevices
      .getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1080 },
          height: { ideal: 1920 }
        } 
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera access error:", err);
      });

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUid(value);
    if (value.length > 0) {
      onScan(value);
    }
  };

  return (
    <div className="min-h-screen bg-anthracite relative overflow-hidden">
      {/* Inactive camera background */}
      <div className="absolute inset-0 opacity-30">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        {!videoRef.current?.srcObject && (
          <div className="absolute inset-0 bg-gradient-to-b from-anthracite via-anthracite-light to-anthracite flex items-center justify-center">
            <Camera className="w-32 h-32 text-primary/20" />
          </div>
        )}
      </div>

      {/* Overlay with dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-anthracite/80 via-anthracite/60 to-anthracite/80" />

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-8 space-y-12">
        {/* Top text */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="font-display text-6xl font-bold text-primary tracking-wide animate-shimmer bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
            GET YOUR LIFTIE NOW!
          </h1>
        </div>

        {/* Center brand logo */}
        <div className="animate-float">
          <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 border-2 border-primary/30 shadow-[var(--shadow-glow)]">
            <div className="text-center space-y-1">
              <p className="font-display text-3xl font-bold text-primary tracking-wide">ZONAR</p>
              <p className="text-pearl/60 text-sm tracking-[0.3em]">ZAGREB</p>
            </div>
          </div>
        </div>

        {/* Bottom input section */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="space-y-3">
            <p className="text-pearl text-xl font-semibold tracking-wide">
              SCAN YOUR ROOM KEY HERE
            </p>
            <ArrowDown className="w-8 h-8 text-primary mx-auto animate-bounce" />
          </div>

          {/* UID Input Field */}
          <div className="max-w-xs mx-auto">
            <Input
              type="text"
              value={uid}
              onChange={handleUidChange}
              placeholder="Enter room key UID"
              className="bg-card/50 backdrop-blur-xl border-2 border-primary/30 text-foreground placeholder:text-muted-foreground text-center text-lg py-6 rounded-2xl shadow-[var(--shadow-gold)] focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <p className="text-muted-foreground text-sm">
            Demo UIDs: 387598235, 987654321
          </p>
        </div>
      </div>
    </div>
  );
};
