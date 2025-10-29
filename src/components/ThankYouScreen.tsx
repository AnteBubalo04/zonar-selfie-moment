import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Instagram, Heart } from "lucide-react";
import { useEffect } from "react";

interface ThankYouScreenProps {
  onReset: () => void;
}

export const ThankYouScreen = ({ onReset }: ThankYouScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onReset();
    }, 10000); // Reset after 10 seconds
    return () => clearTimeout(timer);
  }, [onReset]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-anthracite via-anthracite-light to-anthracite flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl bg-card/50 backdrop-blur-xl border-2 border-primary/20 shadow-[var(--shadow-gold)] animate-bounce-in">
        <div className="p-12 text-center space-y-8">
          {/* Success icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 border-4 border-primary/30 shadow-[var(--shadow-glow)]">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
          </div>

          {/* Thank you message */}
          <div className="space-y-4">
            <h2 className="font-display text-4xl font-bold text-foreground">
              Hvala Vam!
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Vaš <span className="text-primary font-semibold">Zonar Lift Selfie</span> je uspješno poslan
            </p>
          </div>

          {/* Social sharing suggestions */}
          <div className="bg-muted/30 rounded-2xl p-8 space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Heart className="w-5 h-5 fill-current" />
              <p className="font-semibold">Podijelite s nama!</p>
              <Heart className="w-5 h-5 fill-current" />
            </div>
            
            <div className="space-y-3">
              <p className="text-foreground font-medium">
                Predloženi opis:
              </p>
              <Card className="bg-card/50 border border-primary/20 p-4">
                <p className="text-sm text-foreground italic">
                  "Zonar Moments — moj trenutak u @zonarhotel #ZonarMoments #ZagrebLuxury #LiftSelfie"
                </p>
              </Card>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <Instagram className="w-6 h-6 text-primary" />
              <span className="text-primary font-semibold">@zonarhotel</span>
            </div>
          </div>

          {/* Appreciation note */}
          <div className="pt-6 border-t border-border/30 space-y-3">
            <p className="text-muted-foreground">
              Uživajte u svom boravku u Zonar Hotel Zagreb
            </p>
            <p className="text-sm text-muted-foreground/70">
              Novo iskustvo uskoro...
            </p>
          </div>

          {/* Hidden reset for testing */}
          <Button
            onClick={onReset}
            variant="ghost"
            size="sm"
            className="text-muted-foreground/50 hover:text-primary"
          >
            Započni ponovno
          </Button>
        </div>
      </Card>
    </div>
  );
};
