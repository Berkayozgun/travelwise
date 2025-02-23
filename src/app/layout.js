import "../app/globals.css";

export const metadata = {
  title: "Travel App",
  description: "A responsive travel booking app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}