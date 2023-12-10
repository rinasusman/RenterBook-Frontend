import { create } from 'zustand';

const useFeedbackModal = create((set) => ({
  isOpen: false,
  booking: null,
  onOpen: (booking) => set({ isOpen: true, booking: booking }),
  onClose: () => set({ isOpen: false, booking: null }),
}));

export default useFeedbackModal;
