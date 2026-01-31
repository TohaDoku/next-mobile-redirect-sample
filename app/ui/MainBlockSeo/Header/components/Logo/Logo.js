import './Logo.css'
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <div>
            <Link className='logo-link' href='/'>
                <Image
                    className="logo-img"
                    src='/logo.png'
                    alt="Логотип"
                    width={35}
                    height={42}
                    priority={true}
                />
                <span className='logo-container'>
                    <span className='first-name'>
                        Никольский
                    </span>
                    <span className='last-name'>
                        помощь
                    </span>
                </span>
            </Link>
        </div>
    );
}
