import React from "react";
import BlogCard from "../components/Blog/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "./api/blogs";
import Loader from "../components/Loader";

const Blog = () => {
  const {
    isSuccess,
    data: blogs,
    isLoading,
    isError,
  } = useQuery(["getBlogs"], () => getBlogs());

  if (isLoading) return <Loader />;

  return (
    <div className='px-6 md:px-24 py-12 md:pb-24 md:py-0 flex flex-col gap-y-8'>
      <div className='text-3xl font-bold'>All Articles</div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8'>
        {blogs.blog_list.map((blog: any) => (
          <BlogCard
            image={blog.blogImage}
            href={`/blog/${blog.blogID}`}
            title={blog.blog_heading}
            key={blog.blogID}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
