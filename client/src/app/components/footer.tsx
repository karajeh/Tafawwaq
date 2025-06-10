"use client";
import Image from "next/image";
import logo from "public/images/logo.svg";
import Link from "next/link";
import useAdminRoute from "../../hooks/useAdminRoute";
import useTeacherRoute from "../../hooks/useTeacherRoute";
import useStudentRoute from "../../hooks/useStudentRoute";

export default function Footer() {
  const adminRoute = useAdminRoute();
  const teacherRoute = useTeacherRoute();
  const studentRoute = useStudentRoute();

  if (adminRoute || teacherRoute || studentRoute) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footerWrapper">
          <div className="footerWrapper__top">
            <div className="footerWrapper__top-firstColumn">
              <Link href="/">
                <Image src={logo} alt="Logo" width={48} height={48} />
              </Link>
              <p className="footer-text">
                Ready to get started? Unlock your full potential with
                personalized learning.
              </p>
              <Link href="/find-a-tutor">
                <button className="footerButton">Find a tutor</button>
              </Link>
            </div>
            <div className="footerWrapper__top-column">
              <h3 className="footerWrapper__top-column-title">Resources</h3>
              <ul className="footerWrapper__top-column-list">
                <li>
                  <Link
                    className="footerWrapper__top-column-list-link"
                    href="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="footerWrapper__top-column-list-link"
                    href="/faq"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    className="footerWrapper__top-column-list-link"
                    href="/career"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    className="footerWrapper__top-column-list-link"
                    href="/blog"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footerWrapper__top-column">
              <h3 className="footerWrapper__top-column-title">
                Become a tutor
              </h3>
              <ul className="footerWrapper__top-column-list">
                <li>
                  <Link
                    className="footerWrapper__top-column-list-link"
                    href="/signUp?role=Teacher"
                  >
                    Apply Now
                  </Link>
                </li>
                <li>
                  <Link
                    className="footerWrapper__top-column-list-link"
                    href="/best-practices"
                  >
                    Best practices
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footerWrapper__top-column">
              <h3 className="footerWrapper__top-column-title">Social</h3>
              <ul className="footerWrapper__top-column-list">
                <li>
                  <Link
                    className="footerWrapper__top-column-list-link"
                    href="https://www.facebook.com/profile.php?id=61571657973508"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    className="footerWrapper__top-column-list-link"
                    href="https://www.instagram.com/tafawwaq"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    className="footerWrapper__top-column-list-link"
                    href="https://www.x.com/TafawwaqUAE"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    className="footerWrapper__top-column-list-link"
                    href="https://www.linkedin.com/company/tafawwaq/"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footerWrapper__top-column lastColumn">
              <h3 className="footerWrapper__top-column-title lastTitle">
                Address
              </h3>
              <Link href="mailto:support@tafawwaq.com" className="footer-text">
                support@tafawwaq.com
              </Link>
            </div>
          </div>
          <div className="footerWrapper__bottom">
            <p className="footer-text">
              Copyright © 2025 Tafawwaq Inc. All rights reserved.
            </p>
            <div>
              <Link href="/terms">Terms & conditions</Link> |{" "}
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
