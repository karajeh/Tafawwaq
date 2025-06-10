"use client";

import React from "react";
import {
  Calendar,
  Video,
  Star,
  User,
  LayoutDashboard,
  MessageSquareMore,
  CreditCard,
  ChartLine,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "public/images/logo.svg";
import { usePathname } from "next/navigation";

const Sidebar: React.FC<{
  isOpen: boolean;
  role?: string;
  toggleSidebar: () => void;
}> = ({ isOpen, toggleSidebar, role }) => {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard" },
    { icon: Calendar, label: "My Schedule", link: "/dashboard/my-schedule" },
    {
      icon: GraduationCap,
      label: "My Students",
      link: "/dashboard/my-students",
    },
    { icon: MessageSquareMore, label: "Message", link: "/dashboard/message" },
    { icon: Video, label: "Videos", link: "/dashboard/videos" },
    { icon: ChartLine, label: "My Stats", link: "/dashboard/my-stats" },
    { icon: Star, label: "Reviews", link: "/dashboard/reviews" },
    { icon: CreditCard, label: "Payments", link: "/dashboard/payments" },
    { icon: User, label: "My Accounts", link: "/dashboard/my-accounts" },
  ];

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-white rounded-full size-10 shadow-xl flex items-center justify-center lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`bg-white h-screen p-6 fixed top-0 left-0 w-64 flex flex-col border-r border-[#3F3F441A] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:w-full z-10`}
      >
        <div className="mb-12 text-center">
          <Link href="/">
            <Image
              src={logo}
              className="h-12 w-12 mx-auto"
              width={512}
              height={512}
              alt=""
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 bg-[#F7F7F7] rounded-2xl px-4 py-2">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={24} />
          </div>
          <div>
            <h2 className="font-medium">Abeeda Alex</h2>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
        <div className="my-6 bg-[#00000024] w-full h-[1px]"></div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    item.link === pathname
                      ? "bg-[#A3D154] text-white"
                      : "text-[#3F3F44]"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
