import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Web 3.0 Mini-Games",
  description: "Web 3.0 Mini-Games IS",
};

export function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#000" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
