"use client";

import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import LogoComp from "../logo/logo";
import SearchBar from "../search/searchBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SidebarProps {
  children: React.ReactNode;
}

const menuItems = [
  { label: "Dashboard", icon: "/icons/dash.svg" },
  { section: "CUSTOMERS" },
  { label: "Users", icon: "/icons/userfriends.svg" },
  { label: "Guarantors", icon: "/icons/grant.svg" },
  { label: "Loans", icon: "/icons/sack.svg" },
  { label: "Decision Models", icon: "/icons/handshake.svg" },
  { label: "Savings", icon: "/icons/piggy.svg" },
  { label: "Loan Requests", icon: "/icons/cashHand.svg" },
  { label: "Whitelist", icon: "/icons/user_check.svg" },
  { label: "Karma", icon: "/icons/user_times.svg" },
  { section: "BUSINESSES" },
  { label: "Organization", icon: "/icons/briefcase1.svg" },
  { label: "Loan Products", icon: "/icons/cashHand.svg" },
  { label: "Savings Products", icon: "/icons/bank.svg" },
  { label: "Fees and Charges", icon: "/icons/coins.svg" },
  { label: "Transactions", icon: "/icons/trans.svg" },
  { label: "Services", icon: "/icons/galaxy.svg" },
  { label: "Service Account", icon: "/icons/user_cog.svg" },
  { label: "Settlements", icon: "/icons/scroll.svg" },
  { label: "Reports", icon: "/icons/chart.svg" },
  { section: "SETTINGS" },
  { label: "Preferences", icon: "/icons/slider.svg" },
  { label: "Fees and Pricing", icon: "/icons/badge.svg" },
  { label: "Audit Logs", icon: "/icons/clip.svg" },
];

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [activeItem, setActiveItem] = useState<string>("Users");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.topStack}>
        <button
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Image src="/icons/hamburger.svg" alt="menu" width={25} height={25} />
        </button>

        <div className={styles.logoSearch}>
          <LogoComp />
          <SearchBar />
        </div>
        <div className={styles.userBox}>
          <a href="#">Docs</a>
          <Image
            src={"/icons/notification.svg"}
            alt="Notification"
            width={26}
            height={26}
          />
          <div className={styles.userDetails}>
            <Image
              src={"/images/user.png"}
              alt="User"
              width={40}
              height={40}
              className={styles.userImg}
            />

            <div className={styles.user}>
              <p>Adedeji</p>
              <Image
                src={"/icons/drop.svg"}
                alt="dropdown"
                width={8}
                height={5}
                className={styles.userImg}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lowerStack}>
        <div
          className={`${styles.leftBar} ${
            isMobileMenuOpen ? styles.showMobileMenu : ""
          }`}
        >
          <div className={styles.orgSwitch}>
            <Image
              src={"/icons/briefcase.svg"}
              alt="Switch Icon"
              width={16}
              height={16}
            />
            <p>Switch Organization</p>
            <Image
              src={"/icons/arrowDown.svg"}
              alt="Switch Icon"
              width={16}
              height={16}
            />
          </div>

          <ul className={styles.menu}>
            {menuItems.map((item, index) =>
              item.section ? (
                <li key={index} className={styles.sectionTitle}>
                  {item.section}
                </li>
              ) : (
                <li
                  key={index}
                  className={`${styles.menuItem} ${
                    activeItem === item.label ? styles.active : ""
                  }`}
                  onClick={() => {
                    if (item.label) {
                      setActiveItem(item.label);
                      setIsMobileMenuOpen(!isMobileMenuOpen);
                    }
                    if (item.label === "Users") {
                      router.push("/dashboard");
                    }
                  }}
                >
                  <Image
                    src={item.icon!}
                    alt={`${item.label} Icon`}
                    width={16}
                    height={16}
                    className={styles.icon}
                  />
                  <span>{item.label}</span>
                </li>
              )
            )}
          </ul>
        </div>
        <div className={styles.rightBar}>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
