import React, { useState } from 'react'
import Button from '../../Button'
import DropDown from '../inputs/DropDown';
// import useRazorpay from 'react-razorpay';
import userAxios from '../../../Axios/guestAxios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const PaymentDetails = ({ data, total }) => {
    // const [Razorpay] = useRazorpay();
    const navigate = useNavigate();

    const { guestCount, startDate, endDate, id } = data
    const startDateObject = new Date(startDate);
    const day = startDateObject.getDate();
    const month = startDateObject.toLocaleString('default', { month: 'short' });
    const Year = startDate.getFullYear();
    const endDateObject = new Date(endDate);
    const endday = endDateObject.getDate();
    const endmonth = endDateObject.toLocaleString('default', { month: 'short' });
    const endYear = endDate.getFullYear();
    const formattedStartDate = `${day}-${month}-${Year}`;
    const formattedEndDate = `${endday}-${endmonth}-${endYear}`;




    const handleConfirmAndPay = async () => {
        const payload = {

            startDate: formattedStartDate,
            endDate: formattedEndDate,
            totalPrice: total,
            paymentType: selectedPaymentMethod,
            homeid: id
        }
        console.log(payload, "payload:::::::::::")
        const tokens = localStorage.getItem('usertoken')

        const headers = {
            'Authorization': `Bearer ${tokens}`,
            'Content-Type': 'application/json',
        };
        try {
            const existingBooking = await userAxios.post('/checkBooking', payload, { headers });

            if (existingBooking.data.isBooked) {
                alert("The home is already booked for the specified date range");
            }
            else {
                let options = {
                    key: "rzp_test_93ATDTy6qKeM4A",
                    key_secret: "caCaEnvv0qHtgANYPHBABQfi",
                    amount: payload.totalPrice * 100,
                    currency: "INR",
                    name: "RENTER",
                    description: "for testing purpose",
                    handler: async function () {
                        const book = await userAxios.post('/bookhome', payload, { headers });
                        if (book.status === 201) {
                            navigate("/mytrips");
                        }
                    },
                    prefill: {
                        name: "Velmurugan",
                        email: "mvel1620r@gmail.com",
                        contact: "7904425033",
                    },
                    notes: {
                        address: "Razorpay Corporate office",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                }
                if (typeof window.Razorpay === "function") {
                    var pay = new window.Razorpay(options);
                    pay.open();
                } else {
                    console.error("Razorpay script is not loaded or not available.");
                }
            }
        } catch (error) {
            // Handle other errors
            console.error(error);
            alert("Failed to check booking status. Please try again.");
        }



    }






    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
    const paymentMethodOptions = [
        { value: 'upi', label: 'UPI' },
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'paypal', label: 'PayPal' },
        // Add more payment options as needed
    ];
    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
          text-xl 
          font-semibold 
          flex 
          flex-row 
          items-center
          gap-2
        "
                >
                    <div>Your trip </div>

                </div>
                <div className="
                    
                    items-center
                    gap-4
                    font-light
                    text-neutral-500
        "
                >
                    <div className='font-semibold'>
                        Dates
                    </div>
                    <div>
                        {formattedStartDate}
                        <span> </span>  TO {formattedEndDate}
                    </div>
                    <div className='font-semibold'>
                        Guests
                    </div>
                    <div>
                        {guestCount}
                        <span> </span> guest
                    </div>
                </div>
            </div>

            <hr />
            <div className="
               text-lg 
               font-semibold
                ">
                <div className='flex flex-row justify-between'>
                    <div>Pay with</div>
                    <div className='w-[200px]' >
                        <img src="/images/payment.jpeg" alt="" /></div>
                </div>

                <DropDown
                    id="paymentMethod"
                    // label="Payment Method"
                    options={paymentMethodOptions}
                    selectedValue={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                />
                {/* <Input
                    id="email"
                    label="UPI"
                    // disabled={isLoading}
                    register={register}
                    errors
                    required
                /> */}
            </div>
            <hr />
            <div className="
               text-lg 
               font-semibold
                ">
                Cancellation policy

                <div className='  items-center
                    gap-4
                    font-light
                    text-neutral-500'>
                    This reservation is non-refundable.
                </div>
            </div>
            <hr />
            <div className="
               text-lg 
               font-semibold
                ">
                Ground rules

                <div className='  items-center
                    gap-4
                    font-light
                    text-sm
                    text-neutral-500'>

                    We ask every guest to remember a few simple things about what makes a great guest.<br />
                    <li>Follow the house rules</li>
                    <li> Treat your Host’s home like your own</li>

                </div>
            </div>
            <hr />
            <div className="
               text-lg 
               font-semibold
                ">


                <div className='  items-center
                    gap-4
                    font-light
                    text-xs
                    text-neutral-500 
                    pb-3'>

                    By selecting the button below, I agree to the <a> Hosts House Rules, Ground rules for guests, Renters</a> <br />Rebooking and Refund Policy and that Airbnb can charge my payment method if Im responsible<br /> for damage.

                </div>
                <div className="w-[200px]">
                    <Button label="Confirm and Pay" onClick={handleConfirmAndPay} />
                </div>

            </div>
        </div >
    )
}
PaymentDetails.propTypes = {
    data: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
};

export default PaymentDetails