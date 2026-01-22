export default function HomePage() {
  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>Next.js sample: mobile-domain redirect</h1>
      <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
        Этот проект показывает, как сделать редирект на мобильный домен через <code>middleware.js</code>,
        но не редиректить, если устройство закреплено как «десктоп» (cookie <code>prefer_desktop=1</code>)
        или если браузер прислал Client Hint <code>device-memory</code> больше 10 GB.
      </p>

      <div style={{ marginTop: 20, padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
        <h2 style={{ marginTop: 0 }}>Быстрые переключатели</h2>
        <ul style={{ lineHeight: 1.7, paddingLeft: 18 }}>
          <li>
            Закрепить десктоп: <code>?desktop=1</code>
          </li>
          <li>
            Снять закрепление: <code>?mobile=1</code>
          </li>
        </ul>
        <p style={{ marginBottom: 0, opacity: 0.85 }}>
          В проде эти ссылки удобно давать пользователю на страницах «Полная версия сайта» / «Мобильная версия».
        </p>
      </div>

      <div style={{ marginTop: 20, padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
        <h2 style={{ marginTop: 0 }}>Что важно</h2>
        <ul style={{ lineHeight: 1.7, paddingLeft: 18 }}>
          <li>
            Middleware не умеет получать «десктопную видеокарту». Это определяется только на клиенте через WebGL.
          </li>
          <li>
            На iOS Safari нет <code>device-memory</code> в заголовках — поэтому используется клиентский компонент.
          </li>
        </ul>
      </div>
    </main>
  );
}
