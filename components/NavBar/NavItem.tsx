import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';

type Props = {
    title: string;
    path: string;
    isExpanded?: boolean;
    key: number;
}

const NavItem: React.FC<Props> = ({title, path, key }) => {
    const location = useRouter();
    return <Link href={path} key={key}>
      <div className='flex flex-col items-center py-4 leading-tight text-black text-md relative'>
        <div className='font-bold hover:cursor-pointer'>{title}</div>
        <div className={`${(path === `/`? location.pathname === path : location.pathname.includes(path) )? 'text-primary-darker absolute -bottom-1': 'hidden'}`}><CircleIcon className='w-2 h-2'/></div>
      </div>
    </Link>
}

export default NavItem;