'use client';

import { useState } from 'react';
import './MobileMenu.css';
import Logo from "../Logo/Logo";
import Link from "next/link";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(true);
    };

    const handleCloseClick = () => {
        setIsOpen(false);
    };

    const handleLinkClick = () => {
        handleCloseClick();
    };

    return (
        <>
            <div className="login-menu" onClick={handleMenuClick}>
                <img className="login-menu-img" src="/menu.svg" alt="Меню"/>
            </div>
            {isOpen && (
                <div className="mobile-menu-overlay">
                    <div className="mobile-menu">
                        <div className="mobile-menu-wrapper">
                            <Logo />
                            <div className="mobile-menu-header">
                                <button className="close-button" onClick={handleCloseClick}>&times;</button>
                            </div>
                        </div>
                        <ul className="mobile-menu-list">
                            <li className="mobile-menu-title">Помощь студентам</li>
                            <li>
                                <hr/>
                            </li>
                            <li className="mobile-menu-link">
                                <Link href="/price/" onClick={handleLinkClick}>Цены</Link>
                            </li>
                            <li className="mobile-menu-link">
                                <Link href="/guaranties/" onClick={handleLinkClick}>Гарантии</Link>
                            </li>
                            <li className="mobile-menu-link">
                                <Link href="/universitet/" onClick={handleLinkClick}>Наши ВУЗы</Link>
                            </li>
                            <li className="mobile-menu-link">
                                <Link href="/reviews/" onClick={handleLinkClick}>Отзывы</Link>
                            </li>
                            <li className="mobile-menu-link">
                                <Link href="/predmet/" onClick={handleLinkClick}>Предметы</Link>
                            </li>
                            <li className="mobile-menu-link">
                                <Link href="/cities/" onClick={handleLinkClick}>Города</Link>
                            </li>
                            <li className="mobile-menu-link">
                                <Link href="/bonusy/" onClick={handleLinkClick}>Бонусы и скидки</Link>
                            </li>
                            <li className="mobile-menu-link">
                                <Link href="/blog-list/" onClick={handleLinkClick}>Блог</Link>
                            </li>
                            <li className="mobile-menu-title">О нас</li>
                            <li>
                                <hr/>
                            </li>
                            <li className="mobile-menu-link">
                                <Link href="/o-nas/" onClick={handleLinkClick}>О нашей команде</Link>
                            </li>
                            <li className="mobile-menu-link">
                                <Link href="/o-nas/missiya-celi-cennosti/" onClick={handleLinkClick}>Наши ценности</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
