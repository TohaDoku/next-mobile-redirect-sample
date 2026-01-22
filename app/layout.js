import './globals.css';
import PreferDesktopGate from './components/PreferDesktopGate';

export const metadata = {
  title: 'Next: Mobile Redirect Sample',
  description: 'Sample project with middleware mobile-domain redirect + desktop pinning.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {/*
          Client-side gate sets prefer_desktop cookie if device looks "powerful".
          Middleware respects that cookie and will not redirect.
        */}
        <PreferDesktopGate />
        {children}
      </body>
    </html>
  );
}
