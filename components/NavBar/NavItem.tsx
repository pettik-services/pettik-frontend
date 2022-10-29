import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {
    title: string;
    path: string;
    isExpanded?: boolean;
}

const NavItem: React.FC<Props> = ({title, path, isExpanded }) => {
    const location = useRouter();
    console.log(location.pathname, path)
    return <Link href={path}>
      <div className='flex flex-col items-center py-4 leading-tight text-black'>
        <div className='font-bold hover:cursor-pointer'>{title}</div>
        <div className={`${(path === `/`? location.pathname === path : location.pathname.includes(path) )? 'text-3xl text-primary-darker': 'hidden'}`}>•</div>
      </div>
    </Link>
}

export default NavItem;