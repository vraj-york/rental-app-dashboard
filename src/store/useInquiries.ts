import { inquiries } from "@/data/data";
import { create } from "zustand";

type Inquiry={
    id:string;
    userName: string;
    propertyName: string;
    status: string;
    contactNumber: string;
    inquiryDate:string;
}

type InquiriesStore={
    inquiriesData: Inquiry[];
    loadInquiries: () => void;
    addInquiry: (inquiry: Inquiry) => void;
    updateInquiryStatus: (id: string, status: string) => void;
}

const STORAGE_KEY = "inquiries";

export const useInquiriesStore = create<InquiriesStore>((set) => ({
    inquiriesData: [],
    loadInquiries: ()=>{
        const stored = localStorage.getItem(STORAGE_KEY);
        if(stored){
            set({inquiriesData:JSON.parse(stored)})
        }
        else{
            set({inquiriesData:inquiries})
            localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries))
        }
    },
    addInquiry:(inquiry)=>{
    set((state)=>{
        const updatedInquiries= [inquiry, ...state.inquiriesData];
        localStorage.setItem(STORAGE_KEY,JSON.stringify(updatedInquiries));
        return {inquiriesData:updatedInquiries}
    })
    },
    updateInquiryStatus: (id: string, status: string) => {
        set((state) => {
            const updatedInquiries = state.inquiriesData.map((inq) => {
                return inq.id === id ? { ...inq, status: status } : inq;
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInquiries));
            return { inquiriesData: updatedInquiries };
        });
    }
}))
    