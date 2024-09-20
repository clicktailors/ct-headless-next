import { CornerstoneLogo } from './CornerstoneLogo';
import Link from 'next/link';
import { SITE_NAME } from '../../lib/constants';

const NavTitle = () => (
    <div className="flex items-center mx-4 font-semibold text-xl">
        <CornerstoneLogo />
        <Link href="/">{SITE_NAME}.</Link>
    </div>
);

export default NavTitle;