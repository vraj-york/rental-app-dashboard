"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { PropertyForm } from "./property-form";
import { Property } from "@/store/useProperties";

const PropertyModel = React.memo(function PropertyModel({
  type,
  data,
  isModelOpen,
  onClose,
  setIsModelOpen,
}: {
  type: "add" | "edit";
  data?: Property | null;
  isModelOpen?: boolean;
  onClose?: () => void;
  setIsModelOpen?: (open: boolean) => void;
}) {
  console.log("Rendered PropertyModel Type", type);

  const handleOpenChange = (open: boolean) => {
    if (setIsModelOpen) {
      setIsModelOpen(open);
    }
    if (!open && onClose) {
      onClose();
    }
  };

  const handleFormClose = () => {
    if (setIsModelOpen) {
      setIsModelOpen(false);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <Dialog open={isModelOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {type === "add" && (
            <Button>
              <Plus /> Add Property
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {type === "add"
                ? "Add Property Details"
                : "Update Property Details"}
            </DialogTitle>
          </DialogHeader>
          <PropertyForm type={type} data={data} onClose={handleFormClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default PropertyModel;
