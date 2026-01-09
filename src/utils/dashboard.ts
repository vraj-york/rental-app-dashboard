type ChartPoint = {
  visitors: number;
  inquiries: number;
};

export const getDashboardTotals = (data: ChartPoint[]) => {
  return data.reduce(
    (acc, item) => {
      acc.totalVisitors += item.visitors;
      acc.totalInquiries += item.inquiries;
      return acc;
    },
    { totalVisitors: 0, totalInquiries: 0 }
  );
};


export const getDashboardPropertiesTotal = (data:any)=>{
  return data.length
}

export const getActiveListingTotal=(data:any)=>{
 const ActiveListing = data.filter((item:any)=>item.status==="active")
 return ActiveListing.length
}