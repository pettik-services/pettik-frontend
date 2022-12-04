import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

const BlogSkeleton = () => {
  return (
    <div className='flex flex-col w-full gap-y-2'>
      <Skeleton variant='rectangular' className='w-full h-56' />
      <Skeleton variant='rectangular' className='w-full h-12' />
      <Skeleton variant='rectangular' className='w-full h-10' />
    </div>
  );
};

export default BlogSkeleton;
