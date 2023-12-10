import React, { useEffect, useState } from 'react'
import Container from '../../Container'
import Heading from '../../Heading'
import { TbBrandBooking, TbWallet } from 'react-icons/tb'
import { FaRegCalendarMinus } from 'react-icons/fa'
import userAxios from '../../../Axios/guestAxios';
import Chart from "react-apexcharts";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useSelector } from 'react-redux'

const PanelManage = () => {
    const { userToken } = useSelector((state) => state.auth)
    console.log(userToken, "token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    const name = userToken?.userSignUp?.name || ""
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
    const [earnings, setEarnings] = useState({
        totalEarnings: 0,
        totalBookings: 0,
    });

    const [wallet, setWallet] = useState(0)
    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const tokens = localStorage.getItem('usertoken');
                console.log("Tokens:", tokens);
                const headers = {
                    'Authorization': `Bearer ${tokens}`,
                    'Content-Type': 'application/json',
                };
                console.log("Headers:", headers);
                const response = await userAxios.get('/earnings', { headers });
                console.log("API Response:", response.data);
                response.data.totalEarnings = parseFloat(response.data.totalEarnings)
                setEarnings(response.data);

                setWallet(response.data.userWallet)
                const dailyBookingsResponse = await userAxios.get('/dailybook', { headers });
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
                console.error('Error fetching reservations:', error);
            }
        };

        fetchEarnings();
    }, []);


    return (
        <Container>
            <Heading
                title="Host Panel"
                subtitle={`Welcome ${name}`}
            />
            <div
                className="
            mt-5
            grid 
            grid-cols-1 
            sm:grid-cols-1 
            md:grid-cols-1 
            lg:grid-cols-1
            xl:grid-cols-1
            2xl:grid-cols-1
            gap-8
          "
            >

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
                                TOTAL EARNINGS
                            </h2>
                            <h1
                                className='
                            text-[20px] 
                            leading-[24px] 
                            font-bold 
                            text-[#5a5c69] 
                            mt-[5px]
                            '>
                                {earnings.totalEarnings} /-
                            </h1>
                        </div>
                        <FaRegCalendarMinus fontSize={28} />
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
                                WALLET AMOUNT
                            </h2>
                            <h1
                                className='
                            text-[20px] 
                            leading-[24px] 
                            font-bold 
                            text-[#5a5c69] 
                            mt-[5px]
                            '>
                                {wallet}
                            </h1>
                        </div>
                        <TbWallet fontSize={28} />

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
                                {earnings.totalBookings}
                            </h1>
                        </div>
                        <TbBrandBooking fontSize={28} />
                    </div>
                </div>
                {chart.series[0].data.length > 0 && dailyEarn.series[0].data.length > 0 && (
                    <div className='flex grid-cols-2 justify-center'>
                        <Chart options={chart.options} series={chart.series} type="area" width="500" />
                        <Chart options={dailyEarn.options} series={dailyEarn.series} type="bar" width="500" />
                    </div>
                )}


            </div>
        </Container>
    )
}

export default PanelManage