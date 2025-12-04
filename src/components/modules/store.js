// store.js
import { create } from 'zustand';

export const useStore = create((set) => ({
  view: 'main', // 'main', 'left', 'center'
  setView: (view) => set({ view }),
}));