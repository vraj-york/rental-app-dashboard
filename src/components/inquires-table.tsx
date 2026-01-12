import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { inquiries } from "@/data/data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "./ui/separator";
import { useInquiries } from "@/hooks/useInquiries";
import { CircleCheck, CircleDot, MoreVerticalIcon, Timer } from "lucide-react";

export default function InquiresTable() {
  const { inquiresData, updateInquiryStatus } = useInquiries();
  console.log(inquiresData, "inquiresData");

  const handleStatusChange = (id: string, value: string) => {
    updateInquiryStatus(id, value);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Inquires Data</CardTitle>
          <Separator className="mt-2" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Property Name</TableHead>
                <TableHead className="font-bold">Contact Number</TableHead>
                <TableHead className="font-bold">Inquiry Date</TableHead>
                <TableHead className="font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiresData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.userName}</TableCell>

                  <TableCell>{item.propertyName}</TableCell>
                  <TableCell className="flex items-center">
                    {item.contactNumber}
                  </TableCell>
                  <TableCell>{item.inquiryDate}</TableCell>
                  <TableCell className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreVerticalIcon
                          size={22}
                          className="me-1 hover:bg-gray-100 rounded-full p-1"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={item.status}
                          onValueChange={(value) =>
                            handleStatusChange(item.id, value)
                          }
                        >
                          <DropdownMenuRadioItem value="New">
                            <Badge
                              variant={"default"}
                              className="bg-blue-100 text-blue-700 border-blue-200"
                            >
                              <CircleDot className="text-blue-700" />
                              New
                            </Badge>
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Contacted">
                            <Badge
                              variant={"outline"}
                              className="bg-amber-100 text-amber-700 border-amber-200"
                            >
                              <Timer className="text-amber-700" />
                              Contacted
                            </Badge>
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Closed">
                            <Badge
                              variant={"outline"}
                              className="bg-green-100 text-green-700 border-green-200"
                            >
                              <CircleCheck className="text-green-700" />
                              Closed
                            </Badge>
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {(() => {
                      switch (item.status) {
                        case "New":
                          return (
                            <Badge
                              variant={"default"}
                              className="bg-blue-100 text-blue-700 border-blue-200"
                            >
                              <CircleDot className="text-blue-700" />
                              {item.status}
                            </Badge>
                          );
                        case "Contacted":
                          return (
                            <Badge
                              variant={"outline"}
                              className="bg-amber-100 text-amber-700 border-amber-200"
                            >
                              <Timer className="text-amber-700" />
                              {item.status}
                            </Badge>
                          );
                        case "Closed":
                          return (
                            <Badge
                              variant={"outline"}
                              className="bg-green-100 text-green-700 border-green-200"
                            >
                              <CircleCheck className="text-green-700" />
                              {item.status}
                            </Badge>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
