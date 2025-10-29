import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import { PolaroidData } from "@/types";

interface PolaroidPreviewProps {
  data: PolaroidData;
  onComplete: () => void;
}

export const PolaroidPreview = ({ data, onComplete }: PolaroidPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finalImageRef = useRef<string>("");

  useEffect(() => {
    generatePolaroid();
  }, []);

  const generatePolaroid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (vertical polaroid format)
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    // Background (pearl white)
    ctx.fillStyle = '#F7F5F2';
    ctx.fillRect(0, 0, width, height);

    // Add subtle texture
    ctx.fillStyle = 'rgba(167, 133, 63, 0.03)';
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillRect(x, y, 1, 1);
    }

    // Photos section (3 photos stacked)
    const photoMargin = 80;
    const photoWidth = width - (photoMargin * 2);
    const photoHeight = 480;
    const photoSpacing = 40;
    let yPos = photoMargin + 100;

    // Load and draw images
    const imagePromises = data.images.slice(0, 3).map((src, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const currentY = yPos + (index * (photoHeight + photoSpacing));
          
          // Photo shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetY = 10;
          
          // Draw photo with rounded corners
          const radius = 20;
          ctx.beginPath();
          ctx.moveTo(photoMargin + radius, currentY);
          ctx.lineTo(photoMargin + photoWidth - radius, currentY);
          ctx.quadraticCurveTo(photoMargin + photoWidth, currentY, photoMargin + photoWidth, currentY + radius);
          ctx.lineTo(photoMargin + photoWidth, currentY + photoHeight - radius);
          ctx.quadraticCurveTo(photoMargin + photoWidth, currentY + photoHeight, photoMargin + photoWidth - radius, currentY + photoHeight);
          ctx.lineTo(photoMargin + radius, currentY + photoHeight);
          ctx.quadraticCurveTo(photoMargin, currentY + photoHeight, photoMargin, currentY + photoHeight - radius);
          ctx.lineTo(photoMargin, currentY + radius);
          ctx.quadraticCurveTo(photoMargin, currentY, photoMargin + radius, currentY);
          ctx.closePath();
          ctx.clip();
          
          ctx.drawImage(img, photoMargin, currentY, photoWidth, photoHeight);
          
          // Reset shadow and clip
          ctx.shadowColor = 'transparent';
          ctx.restore();
          ctx.save();
          
          resolve();
        };
        img.onerror = () => resolve(); // Continue even if image fails
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      // Brand bar at bottom
      const brandBarY = height - 200;
      
      // Gold gradient background
      const gradient = ctx.createLinearGradient(0, brandBarY, 0, brandBarY + 180);
      gradient.addColorStop(0, 'rgba(167, 133, 63, 0.15)');
      gradient.addColorStop(1, 'rgba(167, 133, 63, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, brandBarY, width, 180);

      // Brand text
      ctx.fillStyle = '#A7853F';
      ctx.font = 'bold 56px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('ZONAR', width / 2, brandBarY + 70);
      
      ctx.font = '28px "Inter", sans-serif';
      ctx.letterSpacing = '8px';
      ctx.fillText('ZAGREB', width / 2, brandBarY + 110);

      // Watermark
      ctx.font = '20px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(167, 133, 63, 0.5)';
      ctx.fillText('#ZonarMoments', width / 2, brandBarY + 150);

      // Save final image
      finalImageRef.current = canvas.toDataURL('image/png', 0.95);
    });
  };

  const handleShare = () => {
    // Simulate share
    if (navigator.share && finalImageRef.current) {
      fetch(finalImageRef.current)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'zonar-moment.png', { type: 'image/png' });
          navigator.share({
            files: [file],
            title: 'Zonar Moments',
            text: 'Moj trenutak u @zonarhotel #ZonarMoments',
          });
        });
    }
  };

  const handleDownload = () => {
    if (finalImageRef.current) {
      const link = document.createElement('a');
      link.download = 'zonar-lift-selfie.png';
      link.href = finalImageRef.current;
      link.click();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-anthracite via-anthracite-light to-anthracite flex items-center justify-center p-8">
      <Card className="w-full max-w-xl bg-card/50 backdrop-blur-xl border-2 border-primary/30 shadow-[var(--shadow-elegant)] animate-bounce-in">
        <div className="p-8 space-y-6">
          {/* Preview */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full rounded-2xl shadow-[var(--shadow-gold)]"
            />
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <p className="text-center text-foreground text-lg">
              Vaš <span className="text-primary font-semibold">Zonar Lift Selfie</span> je spreman!
            </p>
            
            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex-1 border-2 border-primary/30 hover:bg-primary/10 rounded-xl py-6"
              >
                <Download className="mr-2 h-5 w-5" />
                Preuzmi
              </Button>
              <Button
                onClick={handleShare}
                className="flex-1 bg-primary hover:bg-accent text-primary-foreground rounded-xl py-6 shadow-[var(--shadow-gold)]"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Podijeli
              </Button>
            </div>

            <p className="text-center text-muted-foreground text-sm">
              Automatski poslano na {data.guest.phone || data.guest.email}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
