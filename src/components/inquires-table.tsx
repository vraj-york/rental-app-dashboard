import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { inquiries } from "@/data/data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

import { Separator } from "./ui/separator";

export default function InquiresTable() {
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
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Property Name</TableHead>
                <TableHead className="font-bold">Contact Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.userName}</TableCell>
                  <TableCell>
                    {(() => {
                      switch (item.status) {
                        case "New":
                          return (
                            <Badge
                              variant={"default"}
                              className="bg-blue-100 text-blue-700 border-blue-200"
                            >
                              {item.status}
                            </Badge>
                          );
                        case "Contacted":
                          return (
                            <Badge
                              variant={"outline"}
                              className="bg-amber-100 text-amber-700 border-amber-200"
                            >
                              {item.status}
                            </Badge>
                          );
                        case "Closed":
                          return (
                            <Badge
                              variant={"outline"}
                              className="bg-green-100 text-green-700 border-green-200"
                            >
                              {item.status}
                            </Badge>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </TableCell>
                  <TableCell>{item.propertyName}</TableCell>
                  <TableCell className="flex items-center">
                    {item.contactNumber}
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
