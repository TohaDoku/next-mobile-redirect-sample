'use client';

import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Logo from './components/Logo/Logo';

export default function Header({header, headerText}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // Блокируем скролл страницы, когда открыто мобильное меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        {/* Верхняя линия (desktop) */}
        
        {/* Вторая линия (лого + навигация) */}
        <div className={styles.headerSecond}>
          <Logo />
          
          {/* <HeaderLogin /> */}

          {/* Кнопка мобильного меню */}
          
        </div>
      </div>
      
    </header>
  );
}
