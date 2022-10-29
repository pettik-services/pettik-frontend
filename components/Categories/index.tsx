import React from "react";
import CategoryItem from "./CategoryItem";
import Cat from "../../assets/images/cat-profile.jpg";
import Dog from "../../assets/images/dog-profile.jpg";
import Grooming from "../../assets/images/grooming.jpg";
import Consulting from "../../assets/images/vet-consultation.jpg";

const Categories = () => {
  return (
    <div className='flex flex-row overflow-y-auto scrollbar-hide w-full gap-x-4 md:gap-x-16 md:items-center  justify-center p-4'>
      <CategoryItem imageUrl={Grooming} path='/' title='Grooming' />
      <CategoryItem imageUrl={Consulting} path='/' title='Vaccination' />
      <CategoryItem imageUrl={Cat} path='/' title='Trainer' disabled />
      <CategoryItem imageUrl={Dog} path='/' title='Vet' disabled />
    </div>
  );
};

export default Categories;
