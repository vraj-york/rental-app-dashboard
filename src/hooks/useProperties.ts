"use client"

import { properties } from "@/data/data"
import { useEffect, useState } from "react";

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

const STORAGE_KEY = "properties";

export const useProperties=()=>{
const [propertiesData, setPropertiesData]= useState<Property[]>([]);
useEffect(()=>{
const stored= localStorage.getItem(STORAGE_KEY);
if (stored) {
    setPropertiesData(JSON.parse(stored));
  } else {
    setPropertiesData(properties);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(properties)
    );
  }
},[])

useEffect(() => {
  console.log("property updated on local storage")
    if (properties.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(propertiesData)
      );
    }
  }, [propertiesData]);

  const addProperty = (property: Property) => {
    setPropertiesData((prev) => [property, ...prev]);
  };

  const updateProperty = (property: Property) => {
    setPropertiesData((prev) =>
      prev.map((p) => (p.id === property.id ? { ...property } : p))
    );
  };


  return {
    propertiesData,
    addProperty,
    updateProperty
  };
}



