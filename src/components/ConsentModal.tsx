import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle2, XCircle } from "lucide-react";
import { Guest } from "@/types";

interface ConsentModalProps {
  guest: Guest;
  onConsent: (accepted: boolean) => void;
}

export const ConsentModal = ({ guest, onConsent }: ConsentModalProps) => {
  return (
    <div className="min-h-screen bg-anthracite/95 backdrop-blur-sm flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl bg-card border-2 border-primary/30 shadow-[var(--shadow-gold)] animate-bounce-in">
        <div className="p-12 space-y-8">
          {/* Header with icon */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Dobrodošli, {guest.name.split(' ')[0]}
            </h2>
          </div>

          {/* Privacy info */}
          <div className="space-y-6 text-center">
            <p className="text-lg text-foreground leading-relaxed">
              Želite li snimiti svoje <span className="text-primary font-semibold">Zonar Lift Selfie</span> fotografije?
            </p>
            
            <div className="bg-muted/30 rounded-xl p-6 space-y-3 text-left">
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground">Vaša privatnost:</strong> Snimit ćemo tri fotografije koje će biti obrađene u luksuzni polaroid format i poslane na:
              </p>
              
              <div className="space-y-2 pl-4">
                {guest.phone && (
                  <p className="text-sm text-foreground">
                    📱 WhatsApp: <span className="text-primary">{guest.phone}</span>
                  </p>
                )}
                {guest.email && (
                  <p className="text-sm text-foreground">
                    ✉️ Email: <span className="text-primary">{guest.email}</span>
                  </p>
                )}
              </div>

              <p className="text-muted-foreground text-xs pt-3 border-t border-border/30">
                Fotografije se ne pohranjuju na našim serverima i šalju se isključivo vama. 
                Proces je u skladu s GDPR pravilima.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={() => onConsent(false)}
              variant="outline"
              size="lg"
              className="flex-1 border-2 border-muted-foreground/30 hover:border-destructive/50 hover:bg-destructive/10 text-foreground rounded-xl py-6"
            >
              <XCircle className="mr-2 h-5 w-5" />
              Ne hvala
            </Button>
            <Button
              onClick={() => onConsent(true)}
              size="lg"
              className="flex-1 bg-primary hover:bg-accent text-primary-foreground font-semibold rounded-xl py-6 shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Slažem se
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
