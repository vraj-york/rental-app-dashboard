"use client";

import { properties } from "@/data/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Eye, Locate, MapPin, MessageCircleMore } from "lucide-react";

// Generate a gradient image URL based on property ID for variety
const getPropertyImage = (id: string) => {
  const gradients = [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1568605117035-4c2c0e0c0e0e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448075-cbc16bb4af33?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-61dc5c5e57d1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-61dc5c5e57d1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1568605117035-4c2c0e0c0e0e?w=800&h=600&fit=crop",
  ];
  const index = parseInt(id.split("-")[1]) % gradients.length;
  return gradients[index];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
    case "inactive":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
    case "draft":
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

export default function Page() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Properties</h1>
        <p className="text-muted-foreground">
          Manage and view all your property listings
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {properties.map((property) => (
          <Card key={property.id} className="gap-3 pt-0">
            <div className="relative w-full h-48">
              <Image
                src={getPropertyImage(property.id)}
                alt={property.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              <div className="absolute inset-0 from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <CardHeader className="pb-0">
              <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {property.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {property.location}
                </div>
                <div>
                  <Badge
                    className={cn(
                      "backdrop-blur-sm border",
                      getStatusColor(property.status)
                    )}
                  >
                    {property.status.charAt(0).toUpperCase() +
                      property.status.slice(1)}
                  </Badge>
                </div>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  ₹{property.rent.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye size={16} />
                  <span>{property.views} views</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageCircleMore size={16} />
                  <span>{property.enquiries} enquiries</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0 text-xs text-muted-foreground">
              Updated {property.lastUpdated}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
