"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/api-data.css";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Data = {
  next: string;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const offSet = (page - 1) * pageLimit;
  const api = `https://pokeapi.co/api/v2/ability/?offset=${offSet}&limit=${pageLimit}`;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(api);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offSet, pageLimit]);

  const handleNext = () => {
    if (data?.next) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageLimitChange = (value: string) => {
    const newLimit = Number(value);

    const currentOffset = (page - 1) * pageLimit;
    const newPage = Math.floor(currentOffset / newLimit) + 1;

    setPageLimit(newLimit);
    setPage(newPage);
  };

  const handleClickLink = async (url: string) => {
    console.log("Clicked URL:", url);
    try {
      const response = await axios.get(url);
      console.log("Link Data:", response.data);
    } catch (error) {
      console.error("Error fetching link data:", error);
    }
  };

  console.log("Rendering API Data Page");

  return (
    <div className="flex flex-col h-screen">
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.results.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell
                    onClick={() => handleClickLink(item.url)}
                    className="cursor-pointer"
                  >
                    {item.url}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex gap-4 mt-4">
        <Pagination className="flex justify-start mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrev}
                className="cursor-pointer"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNext} className="cursor-pointer" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <Select
          value={String(pageLimit)}
          onValueChange={(value) => handlePageLimitChange(value)}
        >
          <SelectTrigger
            className="w-[160px] rounded-lg sm:flex cursor-pointer"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value={"10"} className="rounded-lg">
              10
            </SelectItem>
            <SelectItem value={"20"} className="rounded-lg">
              20
            </SelectItem>
            <SelectItem value={"30"} className="rounded-lg">
              30
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
