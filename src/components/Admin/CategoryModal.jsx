import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import axios from 'axios';
import adminAxios from '../../Axios/adminAxios.js';
import Modal from "../Client/Modal/Modal.jsx";
import Input from "../Client/inputs/Input.jsx";
import useCategoryModal from "../../Hooks/useCategoryModal.js";
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryInput from "../Client/inputs/CategoryInput.jsx";
import { useNavigate } from 'react-router-dom';


export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a beautiful pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in an arctic environment!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!',
  },
];





const CategoryModal = () => {

  const navigate = useNavigate();

  const loginModal = useCategoryModal();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    register,
    handleSubmit,

    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {
      name: '',
      description: ''

    },
  });




  const onSubmit = async (data) => {

    if (selectedCategory) {
      const payload = {
        name: selectedCategory.label,
        description: data.description,

      }
      console.log(payload, "caaaaaaaaaaaaaaaaaaaaaaa")


      try {
        const categories = await adminAxios.post('/addCategory', payload);

        if (categories.data.success) {
          loginModal.onClose()
          toast.success("Category created Successfully")
          navigate('/category');
        }
        else {

          toast.error("Category already exists")
        }

      } catch (e) {
        if (axios.isAxiosError(e)) {

          toast.error(e.response?.data?.error || '');
        } else {

          toast.error('An error occurred');
        }
      }
    } else {
      // Handle the case where no category is selected

      toast.error('Please select a category');

    }

  };





  const bodyContent = (
    <div className="flex flex-col gap-4">

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

      <Input
        id="description"
        label="Description"

        // disabled={isLoading}
        register={register}
        errors={errors}
        required
      />


    </div >
  );



  return (
    <>
      <Modal
        // disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Renter your home"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}

      />
    </>
  );
};

export default CategoryModal;
