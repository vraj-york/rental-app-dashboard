type ChartPoint = {
  date: string;
  visitors: number;
  inquiries: number;
};

export const filterChartDataByTimeRange = (
  data: ChartPoint[],
  timeRange: string
): ChartPoint[] => {
  const latestDate = new Date(
    Math.max(...data.map((item) => new Date(item.date).getTime()))
  );

  let daysToSubtract = 90;
  if (timeRange === "30d") {
    daysToSubtract = 30;
  } else if (timeRange === "7d") {
    daysToSubtract = 7;
  }

  const startDate = new Date(latestDate);
  startDate.setDate(startDate.getDate() - daysToSubtract);

  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate;
  });
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

export const getDashboardPropertiesTotal = (data: any, timeRange:string) => {

  const latestDate = new Date(
    Math.max(...data.map((item:any) => new Date(item.createdAt).getTime()))
  );

  let daysToSubtract = 90;
  if (timeRange === "30d") {
    daysToSubtract = 30;
  } else if (timeRange === "7d") {
    daysToSubtract = 7;
  }

  const startDate = new Date(latestDate);
  startDate.setDate(startDate.getDate() - daysToSubtract);



 const filterArrayData =data.filter((item:any) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startDate;
  });

 return filterArrayData.length

};

export const getActiveListingTotal = (data: any, timeRange:string) => {

  const latestDate = new Date(
    Math.max(...data.map((item:any) => new Date(item.createdAt).getTime()))
  );

  let daysToSubtract = 90;
  if (timeRange === "30d") {
    daysToSubtract = 30;
  } else if (timeRange === "7d") {
    daysToSubtract = 7;
  }

  const startDate = new Date(latestDate);
  startDate.setDate(startDate.getDate() - daysToSubtract);


  const ActiveListing = data.filter((item: any) => 
    {
      const itemDate = new Date(item.createdAt);
      return item.status === "active" && itemDate >= startDate;
  } );

  return ActiveListing.length;
};