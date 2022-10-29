import React from "react";
import BlogCard from "./BlogCard";
import BlogImg from "../../assets/images/blog-img.png";

const BlogHomePage = () => {
  return (
    <div className='flex flex-col w-full items-center justify-center gap-8 md:gap-12 pb-12'>
      <div className='font-bold text-3xl px-6 text-center md:px-0'>
        Health Tips from Experts
      </div>
      <div className='flex flex-col md:flex-row p-6 md:p-0 w-full md:w-[80%] gap-8 md:gap-12'>
        <BlogCard
          image={BlogImg}
          href='/'
          title='Pet Parenting 101: Stage-Wise Guide To Taking Care Of the Pet Mom-To-Be'
        />
        <BlogCard
          image={BlogImg}
          href='/'
          title='Pet Parenting 101: Stage-Wise Guide To Taking Care Of the Pet Mom-To-Be'
        />
        <BlogCard
          image={BlogImg}
          href='/'
          title='Pet Parenting 101: Stage-Wise Guide To Taking Care Of the Pet Mom-To-Be'
        />
      </div>
    </div>
  );
};

export default BlogHomePage;
