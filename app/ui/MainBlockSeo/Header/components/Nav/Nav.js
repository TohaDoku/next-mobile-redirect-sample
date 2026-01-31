'use client';

import { useState } from 'react';
import Link from 'next/link';
import './Nav.css';

export default function Nav() {
    const [isServicesDropdownVisible, setServicesDropdownVisible] = useState(false);
    const [isAboutDropdownVisible, setAboutDropdownVisible] = useState(false);

    const handleMouseEnter = (setDropdownVisible) => () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = (setDropdownVisible) => () => {
        setDropdownVisible(false);
    };

    return (
        <div className="nav">
            <div
                className="nav-link-dropdown"
                onMouseEnter={() => setServicesDropdownVisible(true)}
                onMouseLeave={() => setServicesDropdownVisible(false)}
            >
                <Link className="nav-link" href="/">Услуги</Link>
                {isServicesDropdownVisible && (
                    <div>
                        <div className="nav-spacer"></div>
                        <div className="dropdown">
                            <div className="dropdown-inner">
                                <div>
                                    <Link className="dropdown-link" href="/services/diplomnie-raboty/">Дипломные работы</Link>
                                    <Link className="dropdown-link" href="/services/kursovie-raboty/">Курсовые работы</Link>
                                    <Link className="dropdown-link" href="/services/praktiki/">Практики</Link>
                                    <Link className="dropdown-link" href="/services/lybie-raboty/">Любые работы</Link>
                                    <Link className="dropdown-link" href="/services/online-pomosh/">Онлайн помощь</Link>
                                    <Link className="dropdown-link" href="/services/nauchnie-raboty/">Научные работы</Link>
                                    <Link className="dropdown-link" href="/services/repetitorstvo/">Репетиторство</Link>
                                </div>
                                <div>
                                    <Link className="dropdown-link" href="/services/dorabotki-i-ispravleniya/">Доработки и исправления</Link>
                                    <Link className="dropdown-link" href="/services/antiplagiat/">Антиплагиат</Link>
                                    <Link className="dropdown-link" href="/services/lybie-prdemety/">Любые предметы</Link>
                                    <Link className="dropdown-link" href="/distant/sessiya-pod-kluch/">Сессия "под ключ"</Link>
                                    <Link className="dropdown-link" href="/distant/vedenie-obucheniya/">Ведение обучения</Link>
                                    <Link className="dropdown-link" href="/distant/likvidaciya-dolgov/">Ликвидация долгов</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Link className="nav-link" href="/price/">Цены</Link>
            <Link className="nav-link" href="/guaranties/">Гарантии</Link>
            <Link className="nav-link" href="/universitet/">Наши ВУЗы</Link>
            <Link className="nav-link" href="/reviews/">Отзывы</Link>
            <Link className="nav-link" href="/predmet/">Предметы</Link>
            <Link className="nav-link" href="/cities/">Города</Link>
            <Link className="nav-link" href="/bonusy/">Бонусы и скидки</Link>
            <Link className="nav-link" href="/blog-list/">Блог</Link>


            <div
                className="nav-link-dropdown"
                onMouseEnter={() => setAboutDropdownVisible(true)}
                onMouseLeave={() => setAboutDropdownVisible(false)}
            >
                <Link className="nav-link" href="/o-nas/">О нас</Link>
                {isAboutDropdownVisible && (
                    <div>
                        <div className="nav-spacer about-nav-spacer"></div>
                        <div className="dropdown about-dropdown">
                            <Link className="dropdown-link" href="/o-nas/">О нашей команде</Link>
                            <Link className="dropdown-link" href="/o-nas/missiya-celi-cennosti/">Наши ценности</Link>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <p>Работаем</p>
                <p>с 08:00 до 22:00 по Мск</p>
                <p>Без выходных</p>
            </div>
        </div>
    );
}
