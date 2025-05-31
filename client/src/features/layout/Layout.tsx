import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useTranslation } from "react-i18next";
import "./layout.scss";

interface LayoutProps {
  children?: ReactNode;
}

const Footer = () => (
  <footer className="app-footer">
    <div className="container center">
      <span>&copy; {new Date().getFullYear()} Cafeteria Orders</span>
    </div>
  </footer>
);

export const Layout = ({ children }: LayoutProps) => {
  const { i18n } = useTranslation();
  // Set dir attribute on html according to language
  if (typeof document !== "undefined") {
    document.documentElement.dir = i18n.language === "he" ? "rtl" : "ltr";
  }
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main flex center">
        {children ? children : <Outlet />}
      </main>
      <Footer />
    </div>
  );
};
