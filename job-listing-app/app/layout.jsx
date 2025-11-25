import { Epilogue } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-epilogue',
});

export const metadata = {
  title: "Job Listing - Opportunities",
  description: "Browse and apply for exciting job opportunities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
