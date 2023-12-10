import React, { useState, useEffect, useMemo } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { setSearchResults } from "../../../Redux/container/searchSlice.js";
import { useNavigate } from "react-router-dom";

import Input from "../inputs/Input.jsx";
import Heading from "../../Heading.jsx";
import Modal from "./Modal.jsx";
import Counter from "../inputs/Counter.jsx";
import userAxios from '../../../Axios/guestAxios.js';
import useSearchModal from "../../../Hooks/useSearchModal.js";
import DateCalendar from "../inputs/DateCalnder.jsx";
import { useDispatch } from "react-redux";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
};

const SearchModal = () => {
  const searchModal = useSearchModal();
  const [selectedRange, setSelectedRange] = useState(null);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [placeValue, setPlaceValue] = useState('');
  const [guestCount, setGuestValue] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,

    },
  });


  useEffect(() => {
    reset({
      startDate: null,
      endDate: null,
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,

    });
  }, [reset]);



  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onSubmit = async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    const startDateObject = new Date(selectedRange.startDate);
    const day = startDateObject.getDate();
    const month = startDateObject.toLocaleString('default', { month: 'short' });

    const endDateObject = new Date(selectedRange.endDate);
    const endday = endDateObject.getDate();
    const endmonth = endDateObject.toLocaleString('default', { month: 'short' });
    const formattedStartDate = `${day}-${month}`;
    const formattedEndDate = `${endday}-${endmonth}`;
    const payload = {

      location: placeValue,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      guestCount: guestCount,
      roomCount: roomCount,
      bathroomCount: bathroomCount,

    }

    console.log(payload, "ddddddddddddddddddddddddd")

    try {
      const response = await userAxios.get('/getSearchHomeList', {
        params: {
          location: payload.location,
          startDate: payload.startDate,
          endDate: payload.endDate,
          guestCount: payload.guestCount,
          roomCount: payload.roomCount,
          bathroomCount: payload.bathroomCount,
        },
      });
      dispatch(setSearchResults(response.data));
      navigate('/');
      console.log(setSearchResults, "result::::::::::")

      searchModal.onClose()
    } catch (e) {
      console.log(e.message)
    }
  };

  let bodyContent;

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where do you wanna go?"
          subtitle="ind the perfect location!"
        />
        <Input
          id="place"
          label="Enter your home Location"
          register={register}
          errors={errors}
          value={placeValue}
          onChange={(e) => {
            setPlaceValue(e.target.value);
          }}
          required
        />
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <DateCalendar
          setSelectedRange={setSelectedRange}
        />

      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subtitle="Find your perfect place!"
        />
        <Counter title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestValue(value)}
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={(value) => setBathroomCount(value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    )
  }



  return (
    <>
      <Modal
        isOpen={searchModal.isOpen}
        title="Search your home"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        onSubmit={handleSubmit(onSubmit)}
        onClose={searchModal.onClose}
        body={bodyContent}
      />
    </>
  );
};

export default SearchModal;
