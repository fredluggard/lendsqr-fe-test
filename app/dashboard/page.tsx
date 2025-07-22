"use client";

import React, { useEffect, useState } from "react";
import styles from "./dash.module.scss";
import UsersStatsCard from "@/components/dashComps/usersStatsCard";
import Image from "next/image";
import { UserRecord } from "@/types/userType";
import { useRouter } from "next/navigation";

const tableHeaders = [
  "Organization",
  "Username",
  "Email",
  "Phone",
  "Date Joined",
  "Status",
];

const statusColors: Record<string, string> = {
  active: "activeColor",
  inactive: "inactiveColor",
  pending: "pendingColor",
  blacklisted: "blacklistedColor",
};

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  const [usersData, setUsersData] = useState<UserRecord[] | undefined>();
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [filterUser, setFilterUser] = useState(false);
  const [organization, setOrganization] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");

  function handleFilter() {
    const result = usersData?.filter(({ user, status: userStatus }) => {
      const rawDate = user.dateJoined?.replace(" -", "-");
      const dateString = new Date(rawDate).toISOString().split("T")[0];

      return (
        (!organization ||
          user.organization
            .toLowerCase()
            .includes(organization.toLowerCase())) &&
        (!username ||
          user.username.toLowerCase().includes(username.toLowerCase())) &&
        (!email || user.email.toLowerCase().includes(email.toLowerCase())) &&
        (!date || dateString === date) &&
        (!phoneNumber || formatPhoneNumber(user.phone).includes(phoneNumber)) &&
        (!status || userStatus.toLowerCase() === status.toLowerCase())
      );
    });

    setFilteredUsers(result);
    setCurrentPage(1);
    setFilterUser(false);
  }

  const resetFilters = () => {
    setOrganization("");
    setUsername("");
    setEmail("");
    setDate("");
    setPhoneNumber("");
    setStatus("");
    setFilterUser(false);
  };

  const router = useRouter();
  const fetchProfile = (user: string) => {
    router.push(`/dashboard/profile?user=${user}`);
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const paginatedUsers = filteredUsers?.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil((filteredUsers?.length ?? 0) / perPage);

  const formatPhoneNumber = (rawPhone: string) => {
    const digits = rawPhone.replace(/\D/g, "");
    const localNumber = digits.startsWith("234")
      ? "0" + digits.slice(3)
      : digits;
    return localNumber;
  };

  const formatDate = (dateString: string) => {
    const cleanedDate = dateString.replace(" -", "-");
    const date = new Date(cleanedDate);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest(`.${styles.dotsIcon}`)) {
      setOpenModalIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("usersData");
    const parsedData = data ? (JSON.parse(data) as UserRecord[]) : [];
    setUsersData(parsedData);
    setFilteredUsers(parsedData);
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1>Users</h1>

      <div className={styles.statsBox}>
        <UsersStatsCard />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} onClick={() => setFilterUser(!filterUser)}>
                  <h3>{header}</h3>
                  <Image
                    src={"/icons/sort.svg"}
                    alt="sort icon"
                    width={16}
                    height={16}
                    className={styles.sortImg}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers && filteredUsers.length > 0 ? (
              paginatedUsers?.map((user, i) => (
                <tr key={i}>
                  <td>{user.user.organization}</td>
                  <td
                    onClick={() => fetchProfile(user.id)}
                    className={styles.click}
                  >
                    {user.user.username}
                  </td>
                  <td>{user.user.email}</td>
                  <td>{formatPhoneNumber(user.user.phone)}</td>
                  <td>{formatDate(user.user.dateJoined)}</td>
                  <td className={styles.dots}>
                    <span
                      className={
                        styles[statusColors[user.status.toLowerCase()]]
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className={styles.dotsIcon}>
                    <Image
                      src={"/icons/dots.svg"}
                      alt="more options"
                      width={16}
                      height={16}
                      onClick={() => setOpenModalIndex(i)}
                    />

                    {openModalIndex === i && (
                      <div className={styles.modal}>
                        <ul>
                          <li>
                            <Image
                              src={"/icons/eyes.svg"}
                              alt="edit icon"
                              width={16}
                              height={10}
                            />
                            <p>Edit User</p>
                          </li>
                          <li>
                            <Image
                              src={"/icons/blackUser.svg"}
                              alt="edit icon"
                              width={16}
                              height={10}
                            />
                            <p>Blacklist User</p>
                          </li>
                          <li>
                            <Image
                              src={"/icons/actUser.svg"}
                              alt="edit icon"
                              width={16}
                              height={10}
                            />
                            <p>Activate User</p>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <p>No records found</p>
            )}
          </tbody>
        </table>

        {filterUser && (
          <div className={styles.filterContainer}>
            <label>
              Organization
              <select
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              >
                <option value="">Select</option>
                <option value="lendsqr">Lendsqr</option>
                <option value="irorun">Irorun</option>
              </select>
            </label>

            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="User"
              />
            </label>

            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </label>

            <label>
              Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label>
              Phone Number
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
              />
            </label>

            <label>
              Status:
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="blacklisted">Blacklisted</option>
              </select>
            </label>

            <div>
              <button onClick={resetFilters}>Reset</button>
              <button className={styles.filterBtn} onClick={handleFilter}>
                Filter
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.pagination}>
        <span>
          Showing
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[25, 50, 100, 200, 300, 500].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          out of {usersData?.length}
        </span>

        <div className={styles.pageControls}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <Image
              src={"/icons/arrow-left.svg"}
              alt="Previous"
              width={7}
              height={12}
            />
          </button>

          <span>
            {Array.from({ length: totalPages }).map((_, i) => (
              <p
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`${currentPage === i + 1 ? styles.activePage : ""}`}
              >
                {i + 1}
              </p>
            ))}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <Image
              src={"/icons/arrow-right.svg"}
              alt="Previous"
              width={7}
              height={12}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
