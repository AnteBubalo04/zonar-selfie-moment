import { Room, Guest } from '@/types';

// Mock Onity card data
export const mockOnityCards: Room[] = [
  { uid: "387598235", room: "402" },
  { uid: "987654321", room: "210" },
  { uid: "123456789", room: "501" },
  { uid: "555666777", room: "308" },
];

// Mock PMS guest data
export const mockPMSGuests: Record<string, Guest> = {
  "402": {
    name: "Ivana Horvat",
    phone: "+385912345678",
    email: "ivana@example.com",
    consent: true,
  },
  "210": {
    name: "John Doe",
    phone: "",
    email: "john@example.com",
    consent: false,
  },
  "501": {
    name: "Ana Kovač",
    phone: "+385911234567",
    email: "ana@example.com",
    consent: true,
  },
  "308": {
    name: "Marco Rossi",
    phone: "+393331234567",
    email: "marco@example.com",
    consent: true,
  },
};

export const mockScanCard = async (uid: string): Promise<Room | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const card = mockOnityCards.find(c => c.uid === uid);
  if (!card) return null;
  
  const guest = mockPMSGuests[card.room];
  return {
    ...card,
    guest,
  };
};
