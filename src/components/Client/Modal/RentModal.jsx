import React, { useState, useEffect, useMemo } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { categories } from '../Navbar/Categories.jsx';
import { useNavigate } from "react-router-dom";
import useRentModal from "../../../Hooks/useRentModal.js";
import Input from "../inputs/Input.jsx";
import Heading from "../../Heading.jsx";
import Modal from "./Modal.jsx";
import CategoryInput from "../inputs/CategoryInput.jsx";
import Counter from "../inputs/Counter.jsx";
import ImageUpload from "../inputs/ImageUpload.jsx";
import userAxios from '../../../Axios/guestAxios.js';

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

const RentModal = () => {
  const rentModal = useRentModal();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [placeValue, setPlaceValue] = useState('');
  const [guestCount, setGuestValue] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [imageSrc, setImageValue] = useState('')
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });


  useEffect(() => {
    reset({
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    });
  }, [reset]);



  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
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
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    const payload = {
      category: selectedCategory.label,
      location: placeValue,
      guestCount: guestCount,
      roomCount: roomCount,
      bathroomCount: bathroomCount,
      imageSrc: imageSrc,
      title: titleValue,
      description: descriptionValue,
      price: priceValue
    }
    const tokens = localStorage.getItem('usertoken')

    const headers = {
      'Authorization': `Bearer ${tokens}`,
      'Content-Type': 'application/json',
    };

    setIsLoading(true);
    try {
      const home = await userAxios.post('/addhome', payload, { headers });
      rentModal.onClose()
      if (home.status === 201) {
        navigate("/myproperties");
      }
      else if (home.status === 400 && home.data.message === 'A home with the same title already exists') {
        toast.error('A home with the same title already exists', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Adjust this to control how long the toast message stays
        });
      } else {
        console.error("API call returned an unexpected status code:", home.status);
      }

    } catch (e) {
      console.log(e.message)
    }
  };

  let bodyContent;

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-3
            max-h-[50vh]
            overflow-y-auto
          "
        >
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={() => setSelectedCategory(item)}
                id="name"
                label={item.label}
                icon={item.icon}
                selected={selectedCategory === item}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
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

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setGuestValue(value)}
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setBathroomCount(value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setImageValue(value)}
          value={imageSrc}
        />
      </div>
    )
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          onChange={(e) => {
            setTitleValue(e.target.value);
          }}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          onChange={(e) => {
            setDescriptionValue(e.target.value);
          }}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          onChange={(e) => {
            setPriceValue(e.target.value);
          }}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }
  return (
    <>
      <Modal
        isOpen={rentModal.isOpen}
        title="Rent your home"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        onSubmit={handleSubmit(onSubmit)}
        onClose={rentModal.onClose}
        body={bodyContent}
      />
    </>
  );
};

export default RentModal;
