"use client";

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
import { Eye, MapPin, MessageCircleMore } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import AddPropertyDialog from "@/components/add-property-dialog";

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
  const { propertiesData } = useProperties();

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Properties</h1>
          <p className="text-muted-foreground">
            Manage and view all your property listings
          </p>
        </div>
        <AddPropertyDialog type="add" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {propertiesData.map((property) => (
          <Card key={property.id} className="gap-3 pt-0">
            <div className="relative w-full h-48">
              {property.image && property.name && (
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110 rounded-t-xl"
                />
              )}
              <div className="absolute top-2 right-2 z-1">
                <AddPropertyDialog type="edit" data={property} />
              </div>
              <div className="absolute inset-0 from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <CardHeader className="pb-0">
              <CardTitle className="flex justify-between text-lg group-hover:text-primary transition-colors">
                {property.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  {property.location}
                </div>
                <div>
                  {property.status && (
                    <Badge
                      className={cn(
                        "backdrop-blur-sm border",
                        getStatusColor(property.status)
                      )}
                    >
                      {property.status.charAt(0).toUpperCase() +
                        property.status.slice(1)}
                    </Badge>
                  )}
                </div>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-1">
                {property.rent && (
                  <span className="text-2xl font-bold text-primary">
                    ₹{property.rent.toLocaleString()}
                  </span>
                )}
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

            {property.lastUpdated && (
              <CardFooter className="pt-0 text-xs text-muted-foreground">
                Updated {property.lastUpdated}
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
