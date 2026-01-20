"use client";

import PropertyModel from "@/components/property-model";
import { Property, usePropertieStore } from "@/store/useProperties";
import { useCallback, useEffect, useState } from "react";
import PropertyCard from "@/components/property-card";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  const { propertiesData, loadProperties } = usePropertieStore();
  const [editProperty, setEditProperty] = useState<Property | null>(null);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [isAddModelOpen, setIsAddModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Loading properties...");
    try {
      setIsLoading(true);
      loadProperties();
    } catch (error) {
      console.error("Error loading properties:", error);
    } finally {
      setIsLoading(false);
    }
  }, [loadProperties]);

  const handleEditButtonClick = useCallback((property: Property) => {
    setEditProperty(property);
    setIsEditModelOpen(true);
  }, []);

  const handleEditClose = useCallback(() => {
    setIsEditModelOpen(false);
    setEditProperty(null);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner fontSize={48} />
      </div>
    );
  }

  console.log("Rendered Properties Page");
  return (
    <>
      {editProperty && (
        <PropertyModel
          type="edit"
          data={editProperty}
          isModelOpen={isEditModelOpen}
          setIsModelOpen={setIsEditModelOpen}
          onClose={handleEditClose}
        />
      )}

      <div className="p-4 md:p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">Properties</h1>
            <p className="text-muted-foreground">
              Manage and view all your property listings
            </p>
          </div>
          <PropertyModel
            type="add"
            isModelOpen={isAddModelOpen}
            setIsModelOpen={setIsAddModelOpen}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {propertiesData.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              handleEditButtonClick={handleEditButtonClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}
