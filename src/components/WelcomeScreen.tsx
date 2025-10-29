import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-anthracite via-anthracite-light to-anthracite flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl bg-card/50 backdrop-blur-xl border-2 border-primary/20 shadow-[var(--shadow-gold)] overflow-hidden">
        <div className="p-12 text-center space-y-8">
          {/* Logo area */}
          <div className="animate-float">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 border-2 border-primary/30 shadow-[var(--shadow-glow)]">
              <svg 
                viewBox="0 0 100 100" 
                className="w-16 h-16 text-primary"
                fill="currentColor"
              >
                <path d="M50 10 L70 30 L70 70 L30 70 L30 30 Z" />
                <circle cx="50" cy="50" r="8" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Brand Title */}
          <div className="space-y-3">
            <h1 className="font-display text-5xl font-bold text-primary tracking-wide">
              ZONAR
            </h1>
            <p className="text-pearl/80 text-lg tracking-[0.3em] font-light">
              ZAGREB
            </p>
          </div>

          {/* Main heading */}
          <div className="space-y-4 py-6">
            <h2 className="font-display text-4xl font-bold text-foreground leading-tight">
              Lift Selfie Experience
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
              Transform your elevator ride into a shareable moment. 
              Capture three premium polaroid-style photos, delivered instantly.
            </p>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-accent text-primary-foreground font-semibold text-lg px-12 py-6 rounded-2xl shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105"
          >
            Prislonite karticu za početak
          </Button>

          {/* Privacy note */}
          <div className="pt-6 border-t border-border/30">
            <p className="text-muted-foreground text-sm">
              Vaša privatnost je zaštićena. Slike se šalju samo uz vašu privolu.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
