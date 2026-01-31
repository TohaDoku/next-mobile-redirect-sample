'use client';
import styles from './HeaderLogin.module.css';
import { MdSupervisorAccount } from 'react-icons/md';

export default function HeaderLogin() {

  return (
    <div className={styles.loginFlex}>
      <div
        className={styles.loginBlock}
      >
        <div className={styles.login}>
          <a href="https://nikolskypomosh.ru/app/" className={styles.loginText}>Личный кабинет</a>
          <MdSupervisorAccount className={styles.loginToggleImg} />
        </div>

      </div>
    </div>
  );
}
