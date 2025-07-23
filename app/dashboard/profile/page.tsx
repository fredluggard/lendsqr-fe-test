"use client";

import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserRecord } from "@/types/userType";

const profileHeaders = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
];

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserRecord>();
  const totalTiers = 3;
  const userTier = userData?.user.userTier ?? 0;
  const [activeItem, setActiveItem] = useState<string>("General Details");
  const [activePage, setActivePage] = useState("General Details");

  const formatPhoneNumber = (rawPhone: string) => {
    const digits = rawPhone.replace(/\D/g, "");
    const localNumber = digits.startsWith("234")
      ? "0" + digits.slice(3)
      : digits;
    return localNumber;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const user = new URLSearchParams(window.location.search).get("user");
    const data = localStorage.getItem("usersData");
    const usersArray: UserRecord[] = data ? JSON.parse(data) : [];
    const singleUser = usersArray.find((item: UserRecord) => item.id === user);
    setUserData(singleUser);
  }, []);

  return userData ? (
    <div className={styles.profileBox}>
      <span onClick={() => router.push("/dashboard")}>
        <Image
          src="/icons/backArrow.svg"
          alt="Back Icon"
          width={27}
          height={10}
        />
        <p>Back to Users</p>
      </span>

      <div className={styles.userHeader}>
        <h1>User Details</h1>
        <div>
          <button className={styles.blacklistBtn}>BLACKLIST USER</button>
          <button className={styles.activateBtn}>ACTIVATE USER</button>
        </div>
      </div>

      <div className={styles.detailsBox}>
        <div className={styles.profileDetails}>
          <Image
            src="/icons/avatar.svg"
            alt="User Profile"
            width={100}
            height={100}
            className={styles.profileImage}
          />

          <div className={styles.userDiv}>
            <h1>{userData?.user.username}</h1>
            <p>{userData?.user.code}</p>
          </div>

          <div className={styles.userTier}>
            <p>User&apos;s Tier</p>
            <div className={styles.stars}>
              {[...Array(totalTiers)].map((_, index) => (
                <Image
                  key={index}
                  src={
                    index < userTier
                      ? "/icons/filled.svg"
                      : "/icons/unfilled.svg"
                  }
                  alt="User Tier"
                  width={15}
                  height={15}
                />
              ))}
            </div>
          </div>

          <div className={styles.bankInfo}>
            <h1>{userData?.user.bankDetails.acctBalance}</h1>
            <p>{`${userData?.user.bankDetails.acctNumber}/${userData?.user.bankDetails.bankName}`}</p>
          </div>
        </div>

        <div className={styles.menuBtn}>
          {profileHeaders.map((header, index) => (
            <span
              key={index}
              className={`${styles.profileHeader} ${
                activeItem === header ? styles.active : ""
              }`}
              onClick={() => {
                setActiveItem(header);
                setActivePage(header);
              }}
            >
              {header}
            </span>
          ))}
        </div>
      </div>

      {activePage === "General Details" ? (
        <div className={styles.detailsBox2}>
          <div className={styles.infoBox}>
            <h1>Personal Information</h1>
            <div className={styles.gridBox}>
              <div className={styles.infoItem}>
                <p className={styles.label}>Full Name</p>
                <p className={styles.value}>{userData?.user.username}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Phone Number</p>
                <p className={styles.value}>
                  {formatPhoneNumber(userData?.user.phone ?? "")}
                </p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Email Address</p>
                <p className={styles.value}>{userData?.user.email}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>BVN</p>
                <p className={styles.value}>{userData?.user.bvn}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Gender</p>
                <p className={styles.value}>{userData?.user.gender}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Marital Status</p>
                <p className={styles.value}>{userData?.user.marital_status}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Children</p>
                <p className={styles.value}>{userData?.user.children}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Type of Residence</p>
                <p className={styles.value}>
                  {userData?.user.type_of_residence}
                </p>
              </div>
            </div>
            <section></section>
          </div>

          <div className={styles.infoBox}>
            <h1>Education and Employment</h1>
            <div className={styles.gridBox2}>
              <div className={styles.infoItem}>
                <p className={styles.label}>level of education</p>
                <p className={styles.value}>{userData?.user.education}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>employment status</p>
                <p className={styles.value}>
                  {userData?.user.employment_status}
                </p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>sector of employment</p>
                <p className={styles.value}>
                  {userData?.user.sector_of_employment}
                </p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Duration of employment</p>
                <p className={styles.value}>
                  {userData?.user.duration_of_employment}
                </p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>office email</p>
                <p className={styles.value}>{userData?.user.office_email}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Monthly income</p>
                <p className={styles.value}>{userData?.user.monthly_income}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>loan repayment</p>
                <p className={styles.value}>{userData?.user.loan_repayment}</p>
              </div>
            </div>
            <section></section>
          </div>

          <div className={styles.infoBox}>
            <h1>Socials</h1>
            <div className={styles.gridBox2}>
              <div className={styles.infoItem}>
                <p className={styles.label}>Twitter</p>
                <p className={styles.value}>{userData?.user.twitter}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Facebook</p>
                <p className={styles.value}>{userData?.user.facebook}</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Instagram</p>
                <p className={styles.value}>{userData?.user.instagram}</p>
              </div>
            </div>
            <section></section>
          </div>

          <div className={styles.infoBox}>
            <h1>Guarantor</h1>
            <div className={styles.gridBox2}>
              <div className={styles.infoItem}>
                <p className={styles.label}>full Name</p>
                <p className={styles.value}>
                  {userData?.user.guarantor1.fullName}
                </p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Phone Number</p>
                <p className={styles.value}>
                  {formatPhoneNumber(userData?.user.guarantor1.phone ?? "")}
                </p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Email Address</p>
                <p className={styles.value}>
                  {userData?.user.guarantor1.email}
                </p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Relationship</p>
                <p className={styles.value}>
                  {userData?.user.guarantor1.relationship}
                </p>
              </div>
            </div>
            <section></section>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.gridBox2}>
              <div className={styles.infoItem}>
                <p className={styles.label}>full Name</p>
                <p className={styles.value}>
                  {userData?.user.guarantor2.fullName}
                </p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Phone Number</p>
                <p className={styles.value}>
                  {formatPhoneNumber(userData?.user.guarantor2.phone ?? "")}
                </p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Email Address</p>
                <p className={styles.value}>
                  {userData?.user.guarantor2.email}
                </p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.label}>Relationship</p>
                <p className={styles.value}>
                  {userData?.user.guarantor2.relationship}
                </p>
              </div>
            </div>
            <section className={styles.hid}></section>
          </div>
        </div>
      ) : (
        <div className={styles.detailsBox3}>
          <h3>Info Unavailable</h3>
        </div>
      )}
    </div>
  ) : (
    "User Not Found"
  );
};

export default Profile;
