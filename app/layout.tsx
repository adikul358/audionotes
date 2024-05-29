import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const ngrokUrl = "https://d280-2401-4900-1f35-4a2d-3c7d-bea1-fecc-88e2.ngrok-free.app"

export const metadata = {
  metadataBase: new URL(ngrokUrl),
  title: "AudioNotes - Liftoff",
  description: "Capitalise Your Voice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
