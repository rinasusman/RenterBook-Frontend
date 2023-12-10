import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Modal from "../Client/Modal/Modal.jsx";
import useReportModal from "../../Hooks/useReportModal.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import adminAxios from '../../Axios/adminAxios';
const ReportModal = () => {


  const [selectedOption, setSelectedOption] = useState("Home");
  const loginModal = useReportModal();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  const {

    handleSubmit,


  } = useForm({
    defaultValues: {
      name: '',
      description: ''

    },
  });

  const downloadPDF = async () => {
    const startDateString = startDate.toISOString();
    const endDateString = endDate.toISOString();
    const payload = { startDateString, endDateString }
    console.log(payload, "payload::::")
    try {
      const response = await adminAxios.get("/pdfbooking", { params: payload });

      const bookings = response.data;
      console.log(bookings, "bookings:")
      const bookingRows = bookings.map((booking, index) => {
        const formattedDate = new Date(booking.bookingDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })

        return [
          index + 1,
          formattedDate,
          booking.userId?.name,
          booking.item[0]?.home?.location,
          booking.item[0]?.home?.title,
          booking.startDate,
          booking.endDate,
          booking.totalPrice,
          booking.status,
        ]
      });
      console.log(bookingRows, "bookingrows:")
      const doc = new jsPDF();
      doc.text("BOOKING REPORT", 10, 10);
      doc.autoTable({
        head: [["SL No", "Booking Date", "Name", "Location", "Home Name", "Start Date", "End Date", "Total Price", "Status"]],
        body: bookingRows,
      })

      doc.save("booking_report.pdf");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="flex flex-row gap-3 ">
        <label className=" flex gap-2">
          <input
            type="radio"
            value="Booking"
            checked={selectedOption === "Booking"}
            onChange={() => setSelectedOption("Booking")}
          />
          BOOKING
        </label>

      </div>


      <div className="flex flex-row gap-3">
        <label >Start Date:</label>
        <DatePicker className="rounded-xl" selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>
      <div className="flex flex-row gap-3">
        <label>End Date:</label>
        <DatePicker className="rounded-xl" selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>




    </div >
  );



  return (
    <>
      <Modal
        // disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Report"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(downloadPDF)}
        body={bodyContent}

      />
    </>
  );
};

export default ReportModal;
