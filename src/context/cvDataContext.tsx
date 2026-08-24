"use client";
import { CVData } from "@/types/cv";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CVDataStore {
  cvData: CVData | null;
  setCvData: (data: CVData) => void;
  clearCVData: () => void;
}

export const useCVDataStore = create<CVDataStore>()(
  persist(
    (set) => ({
      cvData: null,
      setCvData: (data: CVData) => set({ cvData: data }),
      clearCVData: () => set({ cvData: null }),
    }),
    {
      name: "cv-data",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
