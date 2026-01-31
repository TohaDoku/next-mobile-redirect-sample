'use client';

import styles from './HeaderCenter.module.css';
import { IoCall } from "react-icons/io5";
import HeaderSocial from '../HeaderSocial/HeaderSocial';

export default function HeaderCenter() {
  return (
    <span className={styles.headerCenter}>
      <span className={styles.phoneCallSpan}>
        <a className={styles.phoneCall} href="tel:+74954870177" aria-label="Позвонить: 8 (495) 487-01-77">
          <IoCall />
          8 (495) 487-01-77
        </a>
        <p>Для звонков по России</p>
      </span>

      <HeaderSocial />

      <button
        type="button"
        data-open="service-request"
        className={`${styles.callBtn}`}
      >
        Заказать звонок
      </button>
    </span>
  );
}
