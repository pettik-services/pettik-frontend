import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getBlogById } from "../api/blogs";
import Loader from "../../components/Loader";

const Blog = () => {
  const router = useRouter();
  const blogID =
    typeof router.query?.["slug"] === "string" ? router.query?.["slug"] : "";
  console.log("query", blogID);

  const {
    isSuccess,
    data: blog,
    isLoading,
    isError,
  } = useQuery(["getBlogsById", blogID], () => getBlogById(blogID), {
    enabled: blogID.length > 0,
  });

  if (isLoading) return <Loader />;

  return (
    <div className='flex flex-col items-center w-full justify-center py-12 md:pb-24 md:py-0 md:px-32 gap-y-8'>
      <div className='text-4xl font-nunito-black'>{blog?.blog_heading}</div>
      <img className='w-[40%] shadow-lg rounded-xl' src={blog?.blogImage} />
      <div className="text-md" dangerouslySetInnerHTML={{ __html: blog?.blog_data }} />
    </div>
  );
};

export default Blog;
