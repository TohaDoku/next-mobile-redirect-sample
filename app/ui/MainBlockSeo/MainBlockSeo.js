import Image from "next/image";
import styles from './MainBlockSeo.module.css'; // Импортируем модульные стили
import PhoneRequestForm from "./PhoneRequestForm/PhoneRequestForm";
import Header from "./Header/Header";

export default function MainBlockSeo({
    sup_title, title, description, btn,
    img, servicesData, width, height,
    vuz_image, classStyle, colorScheme,
    breadcrumbs, fadeBottom, vuz
}) {
    return (
        <>
        <Header />
        <section className={`${styles.mainSection} ${styles[classStyle]} ${styles[colorScheme]}`}>
            <div className="container">

            
                <div className={styles.mainSectionInner}>
                    <div className={styles.reviewsBlock}>
                        <span className={styles.review}>
                            <Image
                                src={'/reviews/ya.png'}
                                alt="Яндекс отзывы"
                                width={36}
                                height={36}
                            />
                            Яндекс — 5.0/5
                        </span>
                        <span className={styles.review}>
                            <Image
                                src={'/reviews/zoon.webp'}
                                alt="Zoon отзывы"
                                width={36}
                                height={36}
                            />
                            Zoon — 4.9/5
                        </span>
                        <span className={styles.review}>
                            <Image
                                src={'/reviews/tb.png'}
                                alt="Т-банк отзывы"
                                width={36}
                                height={36}
                            />
                            Т-Банк — 5.0/5
                        </span>
                    </div>
                    
                    <div className={styles.textBlock}>
                        <div className={styles.advantages}>
                            <span className={styles.advantage}>2000+ выпускников</span>
                            <span className={styles.advantage}>20 тыс. консультаций</span>
                            {/* <span className={styles.advantage}>80%+ рекомендуют друзьям</span> */}
                        </div>
                        {sup_title && <p>{sup_title}</p>}
                        <h1 className={styles.mainSectionInnerTitle}>Закажите работу уже сейчас</h1>
                        <p className={styles.mainSectionInnerP}>
                            ✅ Подготовим работу в срок <br/>
                            🔑 Сделаем все «под ключ» <br/>
                            ♻️ Сдадим или вернем деньги
                        </p>
                        {btn && <PhoneRequestForm vuz={vuz} buttonText={btn} />}
                    </div>

                    {img && (
                        <div className={`${styles.imgBlock}`}>
                            <span className={`${fadeBottom ? styles.fadeBottom : ""}`}>
                            <Image
                                className={styles.mainSectionInnerImg}
                                src={img}
                                alt="Главное изображение"
                                width={width}
                                height={height}
                                priority={true}
                                unoptimized={true}
                            />
                            </span>
                        </div>
                    )}
                </div>
            </div>

        </section>
        </>
    );
}
