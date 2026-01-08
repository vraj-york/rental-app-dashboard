import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { inquiries } from "@/constants/data";
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
              {inquiries.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.userName}</TableCell>
                  <TableCell>
                    {(() => {
                      switch (invoice.status) {
                        case "New":
                          return (
                            <Badge variant={"default"} className="bg-blue-500">
                              {invoice.status}
                            </Badge>
                          );
                        case "Contacted":
                          return (
                            <Badge
                              variant={"outline"}
                              className="bg-yellow-300"
                            >
                              {invoice.status}
                            </Badge>
                          );
                        case "Closed":
                          return (
                            <Badge variant={"outline"} className="bg-green-400">
                              {invoice.status}
                            </Badge>
                          );
                        case "Pending":
                          return (
                            <Badge variant={"outline"} className="bg-blue">
                              {invoice.status}
                            </Badge>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </TableCell>
                  <TableCell>{invoice.propertyName}</TableCell>
                  <TableCell className="flex items-center">
                    {invoice.contactNumber}
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
