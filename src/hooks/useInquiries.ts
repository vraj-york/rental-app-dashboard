"use client"

import { inquiries } from "@/data/data"
import { useEffect, useState } from "react";

export type Inquiry={
    id:string;
    userName: string;
    propertyName: string;
    status: string;
    contactNumber: string;
    inquiryDate:string;
}

const STORAGE_KEY = "inquiries";

export const useInquiries=()=>{
const [inquiresData, setInquiriesData]= useState<Inquiry[]>([]);

useEffect(()=>{
const stored= localStorage.getItem(STORAGE_KEY);
if (stored) {
    setInquiriesData(JSON.parse(stored));
  } else {
    setInquiriesData(inquiries);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(inquiries)
    );
  }
},[])

useEffect(() => {
  console.log("inquiries updated on local storage")
    if (inquiries.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(inquiresData)
      );
    }
  }, [inquiresData]);

  const addInquiry = (inquiry: Inquiry) => {
    setInquiriesData((prev) => [inquiry, ...prev]);
  };
  

  const updateInquiryStatus = (
    id: string,
    status: string
  ) => {
    setInquiriesData((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, status } : inq
      )
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiriesData((prev) =>
      prev.filter((inq) => inq.id !== id)
    );
  };

  return {
    inquiresData,
    addInquiry,
    updateInquiryStatus,
    deleteInquiry,
  };
}



