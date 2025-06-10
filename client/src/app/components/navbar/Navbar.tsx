/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import logo from "public/images/logo.svg";
import Link from "next/link";
import Image from "next/image";
// import Dropdown from "./DropDown";
import useStudentRoute from "../../../hooks/useStudentRoute";
import useUserStore from "../../../store/userStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { logoutUser } from "src/api/authService";
import Tooglebutton from "src/components/Tooglebutton";

interface NavbarProps {
  currentUser: {
    role: string;
    userId: string;
    sessionToken: string;
  } | null;
  setCurrentUser: Dispatch<SetStateAction<null>>;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, setCurrentUser }) => {
  const { loading } = useUserStore();
  const studentRoute = useStudentRoute();
  const [language, setLanguage] = useState("عربي");
  const [isOpen, setIsOpen] = useState(false);

  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const burgerMenuRef = useRef<HTMLUListElement>(null);

  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    Cookies.remove("token");
    setCurrentUser(null);
    router.push("/login");
  };

  if (studentRoute) {
    return null;
  }

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const lang = isChecked ? "عربي" : "English";
    setLanguage(lang);
  };

  return (
    <nav className="header">
      <motion.div
        initial={{ opacity: 0, transform: `translate(0px, -40px)` }}
        whileInView={{ opacity: 1, transform: `translate(0px, 0px)` }}
        transition={{ duration: 0.4 }}
      >
        <div className="container">
          <div className="headerWrapper">
            <button
              ref={burgerButtonRef}
              className={`burderButton ${isOpen ? "active" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="burderButton-line"></div>
              <div className="burderButton-line"></div>
              <div className="burderButton-line"></div>
            </button>

            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <Image
                    src={logo}
                    className="h-12 w-12"
                    width={48}
                    height={48}
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>

            <ul
              ref={burgerMenuRef}
              className={`header__list ${isOpen ? "active" : ""}`}
            >
              <li>
                <Link
                  href="/"
                  className="header__list-link"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="header__list-link"
                  onClick={closeMenu}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/find-a-tutor"
                  className="header__list-link"
                  onClick={closeMenu}
                >
                  Find a tutor
                </Link>
              </li>
              <li className="linkWhithArrow">
                <Link href="#" className="header__list-link">
                  Become a tutor{" "}
                  <Image
                    width={12}
                    height={6}
                    style={{ minWidth: "12px", minHeight: "6px" }}
                    className="blackArrow"
                    src="/images/blackArrow.png"
                    alt="arrow"
                  />
                </Link>
                <ul className="secondList">
                  <li onClick={toggleMenu}>
                    <Link
                      href="/signUp?role=Teacher"
                      className="header__list-link"
                    >
                      Apply Now
                    </Link>
                  </li>
                  <li onClick={toggleMenu}>
                    <Link href="/best-practices" className="header__list-link">
                      Best Practices
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="linkWhithArrow">
                <Link href="#" className="header__list-link">
                  Resources{" "}
                  <Image
                    width={12}
                    height={6}
                    style={{ minWidth: "12px", minHeight: "6px" }}
                    className="blackArrow"
                    src="/images/blackArrow.png"
                    alt="arrow"
                  />
                </Link>
                <ul className="secondList">
                  <li onClick={toggleMenu}>
                    <Link href="/feedback" className="header__list-link">
                      Feedback
                    </Link>
                  </li>
                  <li onClick={toggleMenu}>
                    <Link href="/blog" className="header__list-link">
                      Blogs
                    </Link>
                  </li>
                  <li onClick={toggleMenu}>
                    <Link href="/faq" className="header__list-link">
                      FAQs
                    </Link>
                  </li>
                  <li onClick={toggleMenu}>
                    <Link href="/contact" className="header__list-link">
                      Contact Us
                    </Link>
                  </li>
                  <li onClick={toggleMenu}>
                    <Link href="/career" className="header__list-link">
                      Career
                    </Link>
                  </li>
                </ul>
              </li>
              <div className="mobB">
                {loading ? null : currentUser ? (
                  <div className="w-36">
                    <button onClick={handleLogout} className="logout-button">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link className="login" href="/login" onClick={closeMenu}>
                      Login
                    </Link>
                    <Link className="login" href="/signUp" onClick={closeMenu}>
                      Signup
                    </Link>
                  </div>
                )}
              </div>
            </ul>

            <div className="header__rightContent">
              <Tooglebutton
                leftLabel={'English'}
                rightLabel={'عربي'}
                onChange={handleLanguageChange}
              />
              {/* <Dropdown
                label={language}
                items={[
                  {
                    label: "عربي",
                    href: "",
                    onClick: () => handleLanguageChange("عربي"),
                  },
                  {
                    label: "English",
                    href: "",
                    onClick: () => handleLanguageChange("English"),
                  },
                ]}
              /> */}
              {loading ? null : currentUser ? (
                <div className="w-36">
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link className="login" href="/login" onClick={closeMenu}>
                    Login
                  </Link>
                  <Link className="login" href="/signUp" onClick={closeMenu}>
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
