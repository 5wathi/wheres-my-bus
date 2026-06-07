import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorker } from "@/components/ServiceWorker";

export const metadata: Metadata = {
  title: "Where's My Bus — Live City Bus Tracker, India",
  description:
    "Track city buses live across Bengaluru, Delhi, Mumbai, Chennai and Hyderabad. Find routes between stops, see live arrivals and follow any bus on the map.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Where's My Bus",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f5aa3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // Set the theme class before paint to avoid a flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('wmb:theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans">
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
