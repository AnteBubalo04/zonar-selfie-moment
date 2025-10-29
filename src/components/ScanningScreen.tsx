import { Loader2, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface ScanningScreenProps {
  uid: string;
  onVerified: () => void;
}

export const ScanningScreen = ({ uid, onVerified }: ScanningScreenProps) => {
  const [status, setStatus] = useState<'checking' | 'verified'>('checking');
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate verification
    const timer = setTimeout(() => {
      setStatus('verified');
      setTimeout(() => {
        onVerified();
      }, 1500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onVerified]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-anthracite via-anthracite-light to-anthracite flex items-center justify-center p-8">
      <Card className="w-full max-w-xl bg-card/50 backdrop-blur-xl border-2 border-primary/20 shadow-[var(--shadow-elegant)]">
        <div className="p-16 text-center space-y-8">
          {/* Animated loader or success icon */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 animate-pulse-gold"></div>
            </div>
            <div className="relative">
              {status === 'checking' ? (
                <Loader2 className="w-32 h-32 text-primary animate-spin mx-auto" strokeWidth={1.5} />
              ) : (
                <CheckCircle2 className="w-32 h-32 text-primary mx-auto animate-scale-in" strokeWidth={1.5} />
              )}
            </div>
          </div>

          {/* Status text */}
          <div className="space-y-3">
            {status === 'checking' ? (
              <>
                <h2 className="font-display text-3xl font-bold text-foreground">
                  Making sure that you are our guest{dots}
                </h2>
                <p className="text-muted-foreground text-lg">
                  Verifying UID: {uid}
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-4xl font-bold text-primary animate-bounce-in">
                  YOU ARE ONE OF OURS!
                </h2>
                <p className="text-muted-foreground text-lg">
                  Get ready for your Liftie...
                </p>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
