"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProperties, Property } from "@/hooks/useProperties";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Spinner } from "./ui/spinner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  location: z.string().min(1, "Location is required").max(100),
  rent: z.number().nonnegative("Rent must be 0 or more"),
  status: z.enum(["active", "inactive", "draft"]),
  image: z.string(),
});

export function PropertyForm({
  type = "add",
  data,
  onClose,
}: {
  type?: "add" | "edit";
  data?: Property;
  onClose?: () => void;
}) {
  const { addProperty, updateProperty, propertiesData } = useProperties();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      rent: undefined,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    },
  });

  useEffect(() => {
    if (type === "edit" && data) {
      form.reset({
        name: data.name || "",
        location: data.location || "",
        rent: data.rent || 0,
        status: (data.status as "active" | "inactive" | "draft") || "active",
        image:
          data.image ||
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
      });
    }
  }, [type, data, form]);

  async function onSubmit(values: z.output<typeof formSchema>) {
    setIsLoading(true);
    setShowSuccess(false);

    if (type === "edit" && data?.id) {
      const updatedData: Property = {
        ...data,
        ...values,
        id: data.id,
      };
      updateProperty(updatedData);
      setShowSuccess(true);
      setTimeout(() => {
        setIsLoading(false);
        onClose?.();
      }, 1000);
    } else {
      const newData: Property = {
        ...values,
        id: (propertiesData.length + 1).toString(),
        createdAt: new Date().toISOString().split("T")[0],
        views: 0,
        enquiries: 0,
      };
      addProperty(newData);
      setShowSuccess(true);
      setTimeout(() => {
        setIsLoading(false);
        onClose?.();
      }, 1000);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input placeholder="1BHK Ram Recidency" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Location</FormLabel>
              <FormControl>
                <Input placeholder="Mumbai" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center">
          <FormField
            control={form.control}
            name="rent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Rent</FormLabel>
                <FormControl>
                  <Input
                    placeholder="12000"
                    type="number"
                    value={Number.isNaN(field.value) ? "" : field.value}
                    onChange={(event) => {
                      const value = event.target.valueAsNumber;
                      field.onChange(Number.isNaN(value) ? 0 : value);
                    }}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="w-full"
                      aria-label="Select a value"
                    >
                      <SelectValue placeholder="Active" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="active" className="rounded-lg">
                        Active
                      </SelectItem>
                      <SelectItem value="inactive" className="rounded-lg">
                        Inactive
                      </SelectItem>
                      <SelectItem value="draft" className="rounded-lg">
                        Draft
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Add image URL here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {showSuccess ? (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
            <span>✓</span>
            <span>
              {type === "edit" ? "Property updated" : "Property added"}
            </span>
          </div>
        ) : (
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                {type === "edit" ? "Updating..." : "Adding..."}
              </>
            ) : type === "edit" ? (
              "Update Property"
            ) : (
              "Add Property"
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}
