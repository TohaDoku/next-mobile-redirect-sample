import styles from "./landing.module.css";
import PhoneRequestForm from "../PhoneRequestForm/PhoneRequestForm";

export default function White() {
  return (
    <>    
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>N</div>
          <div className={styles.brandText}>
            <div className={styles.brandTitle}>nikolskypomosh</div>
            <div className={styles.brandSub}>Репетиторство • ВУЗ • Экзамены</div>
          </div>
        </div>

        

        <nav className={styles.nav}>
          <a className={styles.navLink} href="#how">
            Как это работает
          </a>
          <a className={styles.navLink} href="#benefits">
            Преимущества
          </a>
          <a className={styles.navLink} href="#faq">
            FAQ
          </a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.badge}>Подберём репетитора под ваш ВУЗ</div>

          <h1 className={styles.h1}>
            Репетиторство в любом ВУЗе —{" "}
            <span className={styles.h1Accent}>быстро, понятно, без воды</span>
          </h1>

          <p className={styles.lead}>
            Поможем закрыть долги, подготовиться к зачёту/экзамену, разобраться в
            теме и улучшить оценки. Подбор преподавателя под дисциплину и ваш
            уровень.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>10–15 мин</div>
              <div className={styles.statLabel}>на подбор преподавателя</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>Онлайн / офлайн</div>
              <div className={styles.statLabel}>как вам удобно</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>Индивидуально</div>
              <div className={styles.statLabel}>план под вашу цель</div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <a className={styles.primaryBtn} href="#form">
              Оставить заявку
            </a>
            <a className={styles.secondaryBtn} href="#how">
              Посмотреть процесс
            </a>
          </div>

          <div className={styles.trustRow}>
            <div className={styles.trustItem}>✅ Дисциплины любых направлений</div>
            <div className={styles.trustItem}>✅ Преподы с опытом</div>
            <div className={styles.trustItem}>✅ Понятное объяснение</div>
          </div>
        </div>

        <aside className={styles.heroRight} id="form">
          <div className={styles.formCard}>
            <div className={styles.formHead}>
              <div className={styles.formTitle}>Быстрая заявка</div>
              <div className={styles.formSub}>
                Оставьте номер — перезвоним и уточним дисциплину/ВУЗ
              </div>
            </div>

            <PhoneRequestForm buttonText="Получить помощь" />

            <div className={styles.formNote}>
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных и
              получение обратного звонка.
            </div>
          </div>

          <div className={styles.miniCards}>
            <div className={styles.miniCard}>
              <div className={styles.miniTitle}>Что уточним по телефону</div>
              <ul className={styles.miniList}>
                <li>Дисциплина и тема</li>
                <li>Сроки и формат</li>
                <li>Уровень подготовки</li>
              </ul>
            </div>
            <div className={styles.miniCard}>
              <div className={styles.miniTitle}>Результат</div>
              <p className={styles.miniText}>
                Подберём преподавателя и предложим удобное время для первого
                занятия.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className={styles.section} id="benefits">
        <h2 className={styles.h2}>Почему это удобно</h2>

        <div className={styles.grid3}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎯</div>
            <div className={styles.featureTitle}>Под вашу задачу</div>
            <div className={styles.featureText}>
              Экзамен, зачёт, лабораторные, «не понимаю тему» — строим занятия
              так, чтобы закрыть цель.
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>🧠</div>
            <div className={styles.featureTitle}>Объясняем простыми словами</div>
            <div className={styles.featureText}>
              Без «академической каши». Покажем логику и дадим практику, чтобы
              стало действительно понятно.
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <div className={styles.featureTitle}>Быстрый старт</div>
            <div className={styles.featureText}>
              Часто можно начать в тот же день или на следующий — зависит от
              дисциплины и расписания.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="how">
        <h2 className={styles.h2}>Как это работает</h2>

        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <div>
              <div className={styles.stepTitle}>Оставляете номер</div>
              <div className={styles.stepText}>
                Мы видим страницу, откуда пришла заявка, и быстро связываемся.
              </div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <div>
              <div className={styles.stepTitle}>Уточняем детали</div>
              <div className={styles.stepText}>
                ВУЗ, дисциплина, сроки, формат и желаемый результат.
              </div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <div>
              <div className={styles.stepTitle}>Подбираем репетитора</div>
              <div className={styles.stepText}>
                Предложим кандидата и согласуем первое занятие.
              </div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>4</div>
            <div>
              <div className={styles.stepTitle}>Начинаете заниматься</div>
              <div className={styles.stepText}>
                Получаете понятные объяснения + практику, чтобы уверенно сдать.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="faq">
        <h2 className={styles.h2}>FAQ</h2>

        <div className={styles.faq}>
          <details className={styles.faqItem}>
            <summary className={styles.faqQ}>
              Можно ли заниматься полностью онлайн?
            </summary>
            <div className={styles.faqA}>
              Да, обычно онлайн — самый быстрый вариант. При необходимости можно
              обсудить офлайн (если есть в вашем городе).
            </div>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.faqQ}>
              А если у меня нестандартная дисциплина?
            </summary>
            <div className={styles.faqA}>
              Напишите/скажите название — подберём преподавателя или предложим
              максимально близкий профиль.
            </div>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.faqQ}>
              За сколько времени реально подготовиться?
            </summary>
            <div className={styles.faqA}>
              Зависит от базового уровня и сроков. Иногда хватает 1–3 занятий по
              конкретным темам, иногда нужен план на 2–4 недели.
            </div>
          </details>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.footerTitle}>Репетиторство в любом ВУЗе</div>
            <div className={styles.footerSub}>
              Подбор преподавателя под вашу цель
            </div>
          </div>
          <div className={styles.footerNote}>
            © {new Date().getFullYear()} • nikolskypomosh
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
