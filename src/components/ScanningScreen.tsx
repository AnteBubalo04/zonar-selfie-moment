import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface ScanningScreenProps {
  onScanned: (uid: string) => void;
}

export const ScanningScreen = ({ onScanned }: ScanningScreenProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Auto-trigger with mock UID after 2 seconds for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      onScanned("387598235"); // Mock UID for demo
    }, 2000);
    return () => clearTimeout(timer);
  }, [onScanned]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-anthracite via-anthracite-light to-anthracite flex items-center justify-center p-8">
      <Card className="w-full max-w-xl bg-card/50 backdrop-blur-xl border-2 border-primary/20 shadow-[var(--shadow-elegant)]">
        <div className="p-16 text-center space-y-8">
          {/* Animated loader */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 animate-pulse-gold"></div>
            </div>
            <div className="relative">
              <Loader2 className="w-32 h-32 text-primary animate-spin mx-auto" strokeWidth={1.5} />
            </div>
          </div>

          {/* Status text */}
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Očitavanje kartice{dots}
            </h2>
            <p className="text-muted-foreground text-lg">
              Molimo prislonite vašu hotelsku karticu na čitač
            </p>
          </div>

          {/* Card icon visual */}
          <div className="flex justify-center">
            <div className="w-48 h-32 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl border-2 border-primary/30 shadow-lg flex items-center justify-center">
              <svg 
                viewBox="0 0 100 60" 
                className="w-32 h-20 text-primary/40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="10" y="10" width="80" height="40" rx="4" />
                <rect x="15" y="18" width="30" height="6" rx="2" />
                <line x1="15" y1="32" x2="45" y2="32" />
                <line x1="15" y1="38" x2="55" y2="38" />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
