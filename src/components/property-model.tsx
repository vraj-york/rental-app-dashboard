"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Pen, Plus } from "lucide-react";
import { PropertyForm } from "./property-form";
import { Property } from "@/hooks/useProperties";

export default function PropertyModel({
  type,
  data,
}: {
  type: "add" | "edit";
  data?: Property;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {type === "add" ? (
            <Button>
              <Plus /> Add Property
            </Button>
          ) : (
            <Button size={"icon-sm"} variant={"outline"}>
              <Pen size={6} />
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
          <PropertyForm
            type={type}
            data={data}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
