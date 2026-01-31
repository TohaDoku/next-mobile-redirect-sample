import Script from "next/script";
import DomainViewProvider from "./DomainViewProvider";
import "./globals.css";
import MainBlockSeo from "./ui/MainBlockSeo/MainBlockSeo";

export const metadata = {
  title: "Репетиторство в любом ВУЗе",
  description:
    "Подбор репетитора под ваш ВУЗ и дисциплину. Быстрая заявка — перезвоним и подберём преподавателя.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {
    if (document.scripts[j].src === r) { return; }
  }
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106415263', 'ym');

ym(106415263, 'init', {
  ssr:true,
  webvisor:true,
  clickmap:true,
  ecommerce:"dataLayer",
  referrer: document.referrer,
  url: location.href,
  accurateTrackBounce:true,
  trackLinks:true
});
            `.trim(),
          }}
        />
      </head>

      <body>
        <MainBlockSeo
          title={"Скидка до −50% 🔥\n + кэшбэк 5%"}
          description={"✅ Не для всех: работаем именно с вашим профилем\n🔑 Закрываем конкретную боль: консультируем «под ключ»\n🔥 Бросаем вызов: вернем деньги если не будет достигнут результат или попросите возврат"}
          btn="Получить помощь"
          img="/hero/2.png"
          width={400}
          height={648}
          modal={true}
          whiteText={true}
          classStyle={'seo_style'}
          vyz={'МТИ МОНОБЛОК'}
        />
        {/* Провайдер решает: показывать SEO или White */}
        <DomainViewProvider>{children}</DomainViewProvider>

        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106415263"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
