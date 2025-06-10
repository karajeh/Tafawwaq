"use client";
import "./globals.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar/Navbar";

import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import useUserStore from "src/store/userStore";
import { useEffect, useState } from "react";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getCurrentUser } = useUserStore();
  const [currentUser, setCurrentUser] = useState(null);
  // const [title, setTitle] = useState("Tafawwaq Tutoring");
  useEffect(() => {
    setCurrentUser(getCurrentUser()); // Initialize the user state on app load
  }, [getCurrentUser]);

  const pathname = usePathname();
  const hideNavbarRoutes = ["/admin", "/teacher", "/student"];
  const hideFooterRoutes = [
    "/admin",
    "/teacher",
    "/student",
    "/signUp",
    "/login",
  ];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en">
      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MFK4VHRK');
        `,
        }}
      />
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JLK2J50QET"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JLK2J50QET');
        `,
        }}
      />
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MFK4VHRK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {!shouldHideNavbar && (
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        )}

        {children}

        {/* Conditionally render the Footer */}
        {!shouldHideFooter && <Footer />}
        <ToastContainer />
      </body>
    </html>
  );
}
