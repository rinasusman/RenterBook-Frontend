import React, { useEffect, useState } from 'react'
import { FiUsers } from 'react-icons/fi'
import { TbBrandBooking, TbReport } from 'react-icons/tb'
import { IoHomeOutline } from "react-icons/io5";
import { earningsDetails } from '../../Api/AdminRequest';
import Chart from "react-apexcharts";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import adminAxios from '../../Axios/adminAxios';
import useReportModal from '../../Hooks/useReportModal';
const Dashboard = () => {
    const categoryModal = useReportModal();
    const [earnings, setEarnings] = useState({
        totalHome: 0,
        totalUser: 0,
        totalBooking: 0,
    });
    const [dailyEarn, setDailyEarn] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: []
            }
        },
        series: [
            {
                name: "Earnings",
                data: []
            }
        ]
    })
    const [chart, setChart] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: []
            },
            colors: ['#1cc88a', '#F43F5E', '#F7BD2A', '#2A2AF7'],
        },
        series: [
            {
                name: "Booked",
                data: []
            },
            {
                name: "Cancelled",
                data: []
            },
            {
                name: "Checkout",
                data: []
            },
            {
                name: "Checkin",
                data: []
            }
        ]
    })

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const response = await earningsDetails();
                setEarnings(response.data);

                const dailyBookingsResponse = await adminAxios.get('/dailybook');
                const dailyBookings = dailyBookingsResponse.data.dailyBookings;
                if (!dailyBookings || !Array.isArray(dailyBookings) || dailyBookings.length === 0) {
                    console.error('Invalid or empty dailyBookings data:', dailyBookings);
                    return;
                }
                const bookedData = dailyBookings.map((entry) => ({
                    date: entry._id,
                    totalBookings: entry.totalBookings
                }));
                const checkoutData = dailyBookings.map((entry) => ({
                    date: entry._id,
                    totalCheckout: entry.totalCheckout
                }));
                const checkinData = dailyBookings.map((entry) => ({
                    date: entry._id,
                    totalCheckins: entry.totalCheckins
                }));
                const cancelledData = dailyBookings.map((entry) => ({
                    date: entry._id,
                    totalCancelled: entry.totalCancelled
                }));
                const totalpriceData = dailyBookings.map((entry) => ({
                    date: entry._id,
                    totalEarnings: entry.totalEarnings
                }));


                const startDate = startOfMonth(new Date());
                const endDate = endOfMonth(new Date());


                const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

                console.log(dateRange, "daterange:")
                const formattedDates = dateRange.map(date => format(date, 'yyyy-MM-dd', { locale: enUS }));


                const matchedbookedData = formattedDates.map((date) => {
                    const matchingEntry = bookedData.find((entry) => entry.date === date);
                    return matchingEntry ? matchingEntry.totalBookings : 0;
                });
                const matchedcheckoutData = formattedDates.map((date) => {
                    const matchingEntry = checkoutData.find((entry) => entry.date === date);
                    return matchingEntry ? matchingEntry.totalCheckout : 0;
                });
                const matchedcheckinData = formattedDates.map((date) => {
                    const matchingEntry = checkinData.find((entry) => entry.date === date);
                    return matchingEntry ? matchingEntry.totalCheckins : 0;
                });
                const matchedcancelledData = formattedDates.map((date) => {
                    const matchingEntry = cancelledData.find((entry) => entry.date === date);
                    return matchingEntry ? matchingEntry.totalCancelled : 0;
                });

                const matchedTotalpriceData = formattedDates.map((date) => {
                    const matchingEntry = totalpriceData.find((entry) => entry.date === date);
                    return matchingEntry ? matchingEntry.totalEarnings : 0;
                });


                setChart({
                    options: {
                        chart: {
                            id: "basic-bar"
                        },
                        xaxis: {
                            categories: formattedDates,
                        },
                        colors: ['#1cc88a', '#F43F5E', '#F7BD2A', '#2A2AF7'],
                    },
                    series: [
                        {
                            name: "Booked",
                            data: matchedbookedData,

                        },
                        {
                            name: "Cancelled",
                            data: matchedcancelledData,
                        },
                        {
                            name: "Checkout",
                            data: matchedcheckoutData,
                        },
                        {
                            name: "Checkin",
                            data: matchedcheckinData,
                        },
                    ],
                });

                setDailyEarn({
                    options: {
                        chart: {
                            id: "basic-bar"
                        },
                        xaxis: {
                            categories: formattedDates,
                        },
                        colors: ['#F43F5E'],
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '70%', // Adjust the bar width here
                                endingShape: 'rounded',
                            },
                        },
                    },
                    series: [
                        {
                            name: "Eranings",
                            data: matchedTotalpriceData,

                        },
                    ],
                });

            } catch (error) {
                console.log("error")
            }
        };

        fetchEarnings();
    }, []);


    return (
        <div
            className='
            pt-[25px] 
            px-[25px] 
            bg-[#FBF9FC]
            '>
            <div
                className='
                flex 
                items-center 
                justify-between
                '>
                <h1
                    className='
                    text-[#5a5c69] 
                    text-[28px] 
                    leading-[34px] 
                    font-normal
                    '>Dashboard
                </h1>
                <button
                    className='
                    bg-rose-500 
                    h-[32px] 
                    rounded-[3px] 
                    text-white 
                    flex 
                    items-center 
                    px-[30px] 
                    cursor-pointer
                    gap-2
                    ' onClick={categoryModal.onOpen}>
                    Generate Report <TbReport size={25} />
                </button>
            </div>
            <div
                className='
                grid 
                grid-cols-3 
                gap-[30px] 
                mt-[20px] 
                pb-[15px]
                '>

                <div
                    className='
                    h-[100px] 
                    rounded-[8px] 
                    bg-white 
                    border-l-[4px] 
                    border-[#1cc88a] 
                    flex 
                    items-center 
                    justify-between 
                    px-[30px] 
                    cursor-pointer 
                    hover:shadow-lg 
                    transform hover:scale-[103%] 
                    transition  
                    duration-300 
                    ease-out
                    '>
                    <div>
                        <h2
                            className='
                            text-[#1cc88a] 
                            text-[12px] 
                            leading-[17px] 
                            font-bold
                            '>
                            TOTAL HOMES
                        </h2>
                        <h1
                            className='
                            text-[20px] 
                            leading-[24px] 
                            font-bold 
                            text-[#5a5c69] 
                            mt-[5px]
                            '>
                            {earnings.totalHome}
                        </h1>
                    </div>

                    <IoHomeOutline fontSize={28} />
                </div>
                <div
                    className='
                    h-[100px] 
                    rounded-[8px] 
                    bg-white 
                    border-l-[4px] 
                    border-rose-500
                    flex 
                    items-center 
                    justify-between 
                    px-[30px] 
                    cursor-pointer 
                    hover:shadow-lg 
                    transform hover:scale-[103%] 
                    transition  
                    duration-300 
                    ease-out
                    '>
                    <div>
                        <h2
                            className='
                            text-rose-500 
                            text-[12px] 
                            leading-[17px] 
                            font-bold
                            '>
                            TOTAL USERS
                        </h2>
                        <h1
                            className='
                            text-[20px] 
                            leading-[24px] 
                            font-bold 
                            text-[#5a5c69] 
                            mt-[5px]
                            '>
                            {earnings.totalUser}
                        </h1>
                    </div>
                    <FiUsers fontSize={28} />
                </div>
                <div
                    className='
                    h-[100px] 
                    rounded-[8px] 
                    bg-white 
                    border-l-[4px] 
                    border-[#1cc88a]
                    flex 
                    items-center 
                    justify-between 
                    px-[30px] 
                    cursor-pointer 
                    hover:shadow-lg 
                    transform hover:scale-[103%] 
                    transition  
                    duration-300 
                    ease-out
                    '>
                    <div>
                        <h2
                            className='
                            text-[#1cc88a]
                            text-[12px] 
                            leading-[17px] 
                            font-bold
                            '>
                            TOATAL BOOKINGS
                        </h2>
                        <h1
                            className='
                            text-[20px] 
                            leading-[24px] 
                            font-bold 
                            text-[#5a5c69] 
                            mt-[5px]
                            '>
                            {earnings.totalBooking}
                        </h1>
                    </div>
                    <TbBrandBooking fontSize={28} />
                </div>
            </div>
            <div className='flex grid-cols-2 justify-center mt-5'>

                <Chart options={chart.options} series={chart.series} type="area" width="500" />
                <Chart options={dailyEarn.options} series={dailyEarn.series} type="bar" width="500" />


            </div>
           

        </div>
    )
}

export default Dashboard