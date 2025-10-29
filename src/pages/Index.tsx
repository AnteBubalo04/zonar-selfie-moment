import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ScanningScreen } from "@/components/ScanningScreen";
import { ConsentModal } from "@/components/ConsentModal";
import { CameraScreen } from "@/components/CameraScreen";
import { PolaroidPreview } from "@/components/PolaroidPreview";
import { ThankYouScreen } from "@/components/ThankYouScreen";
import { mockScanCard } from "@/lib/mockData";
import { AppStep, Room, PolaroidData } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [step, setStep] = useState<AppStep>('welcome');
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [polaroidData, setPolaroidData] = useState<PolaroidData | null>(null);
  const { toast } = useToast();

  const [scannedUid, setScannedUid] = useState("");

  const handleScan = async (uid: string) => {
    setScannedUid(uid);
    setStep('scanning');

    try {
      const data = await mockScanCard(uid);
      
      if (!data || !data.guest) {
        toast({
          title: "Card not recognized",
          description: "Please try again or contact reception.",
          variant: "destructive",
        });
        setTimeout(() => setStep('welcome'), 2000);
        return;
      }

      setRoomData(data);
      
      if (!data.guest.consent) {
        toast({
          title: "Consent not provided",
          description: "Consent is required for Lift Selfie service.",
          variant: "destructive",
        });
        setTimeout(() => setStep('welcome'), 3000);
        return;
      }

      // Will be handled by ScanningScreen's onVerified callback
    } catch (error) {
      console.error("Scan error:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
      setTimeout(() => setStep('welcome'), 2000);
    }
  };

  const handleVerified = () => {
    setStep('consent');
  };

  const handleConsent = (accepted: boolean) => {
    if (!accepted) {
      toast({
        title: "Hvala",
        description: "Razumijemo. Uživajte u vašem boravku!",
      });
      setTimeout(() => {
        setRoomData(null);
        setStep('welcome');
      }, 2000);
      return;
    }

    setStep('camera');
  };

  const handleCapture = (images: string[]) => {
    if (!roomData?.guest) return;

    const data: PolaroidData = {
      images,
      guest: roomData.guest,
      timestamp: new Date().toISOString(),
    };

    setPolaroidData(data);
    setStep('preview');

    // Simulate sending
    toast({
      title: "Slanje u tijeku...",
      description: `Šaljemo na ${roomData.guest.phone || roomData.guest.email}`,
    });
  };

  const handlePreviewComplete = () => {
    setStep('welcome');
    setRoomData(null);
    setPolaroidData(null);
    setScannedUid("");
  };

  const handleReset = () => {
    setRoomData(null);
    setPolaroidData(null);
    setStep('welcome');
  };

  // Render appropriate screen
  switch (step) {
    case 'welcome':
      return <WelcomeScreen onScan={handleScan} />;
    
    case 'scanning':
      return <ScanningScreen uid={scannedUid} onVerified={handleVerified} />;
    
    case 'consent':
      return roomData?.guest ? (
        <ConsentModal guest={roomData.guest} onConsent={handleConsent} />
      ) : null;
    
    case 'camera':
      return <CameraScreen onCapture={handleCapture} />;
    
    case 'preview':
      return polaroidData ? (
        <PolaroidPreview data={polaroidData} onComplete={handlePreviewComplete} />
      ) : null;
    
    case 'complete':
      return <ThankYouScreen onReset={handleReset} />;
    
    default:
      return (
        <div className="min-h-screen bg-anthracite flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      );
  }
};

export default Index;
