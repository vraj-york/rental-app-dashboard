import { properties } from "@/data/data";
import { create } from "zustand";
import { properties as seedProperties } from "@/data/data";

export type Property={
    id?: string;
    name?: string;
    location?: string;
    rent?: number | undefined | null;
    status?: string | null;
    views?: number;
    enquiries?: number;
    createdAt?: string;
    lastUpdated?: string;
    image?: string | null;
}

type PropertiesStore={
    propertiesData: Property[];
    loadProperties: () => void;
    addProperty: (property: Property) => void;
    updateProperty: (property: Property) => void;
}

const STORAGE_KEY = "properties";

export const usePropertieStore = create<PropertiesStore>((set)=>({
    propertiesData: [],
    loadProperties: () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if(stored){
            set({propertiesData: JSON.parse(stored)});
        }
        else {
            set({ propertiesData: seedProperties });
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(seedProperties)
            );
        }
    },
    addProperty: (property) => {
        set((state) =>{ 
            const updatedProperties = [property, ...state.propertiesData];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProperties));
            return { propertiesData: updatedProperties };         
        })
    },

    updateProperty: (property) => {
    set((state) => {
      const updated = state.propertiesData.map((p) =>
        p.id === property.id ? { ...p, ...property } : p
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { propertiesData: updated };
    })}
}));