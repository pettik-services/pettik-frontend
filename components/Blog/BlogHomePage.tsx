import React from "react";
import BlogCard from "./BlogCard";
import { getBlogs } from "../../pages/api/blogs";
import { useQuery } from "@tanstack/react-query";
import BlogSkeleton from "./BlogSkeleton";

const BlogHomePage = () => {
  const {
    isSuccess,
    data: blogs,
    isLoading,
    isError,
  } = useQuery(["getBlogs"], () => getBlogs());

  return (
    <div className='flex flex-col w-full items-center justify-center gap-8 md:gap-12 pb-16 pt-12'>
      <div className='font-bold text-3xl px-6 text-center md:px-0'>
        Health Tips from Experts
      </div>
      <div className='flex flex-col md:flex-row p-6 md:p-0 w-full md:w-[80%] gap-8 md:gap-12'>
        {isLoading
          ? [0, 1, 2].map((value, idx) => <BlogSkeleton key={idx} />)
          : blogs.blog_list.map((blog: any, idx: number) => {
              if (idx > 2) {
                return null;
              }
              return (
                <BlogCard
                  key={idx}
                  image={blog.blogImage}
                  href={`/blog/${blog.blogID}`}
                  title={blog.blog_heading}
                  width='w-[80%]'
                />
              );
            })}
      </div>
    </div>
  );
};

export default BlogHomePage;
