import prisma from "@/libs/prismadb";
import moment from "moment";

export default async function getGraphData() {
  try {
    // Start date, end dates for date range of 7 days ago
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");
    // Query db to get orders
    const result = await prisma?.order.groupBy({
      by: ["createDate"],
      where: {
        createDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    const aggregateData: {
        [day: string]: {day: string, date: string, totalAmount: number}
    } = {};

    // Create a clone of the startDate to iterate over 
    const currentDate = startDate.clone();
    // Iterate over the date range
    while (currentDate <= endDate){
        const day = currentDate.format('dddd');
        console.log("day<<<<<<<<<<", day, currentDate);
    
        // Initialize the aggregateData object with the day
        aggregateData[day] = {
            day,
            date: currentDate.format('YYYY-MM-DD'),
            totalAmount: 0
        }
        // Move to the next day
        currentDate.add(1, 'day');
    }
    // Callculate the total amount for each day
    result.forEach((entry) => {
        const day = moment(entry.createDate).format('dddd');
        const amount = entry._sum.amount || 0;
        aggregateData[day].totalAmount += amount;
    }); 

    // Convert the object to an array
    const formatData = Object.values(aggregateData).sort((a, b) => 
        moment(a.date).diff(moment(b.date))
    );
    return formatData;
  } catch (error: any) {
    throw new Error(error);
  }
}
