import React from "react";
import BlogCard from "../components/Blog/BlogCard";
import BlogImg from "../assets/images/blog-img.png";

const Blog = () => {
  return (
    <div className='px-6 md:px-24 py-12 md:pb-24 md:py-0 flex flex-col gap-y-8'>
      <div className='text-3xl font-bold'>All Articles</div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8'>
        {[0, 1, 2].map((blog, idx) => (
          <BlogCard
            image={BlogImg}
            href='/'
            title='Pet Parenting 101: Stage-Wise Guide To Taking Care Of the Pet Mom-To-Be'
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
