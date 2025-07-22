"use client";

import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import LogoComp from "@/components/logo/logo";
import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import usersData from "../../generated.json";
import cardData from "../../generatedStats.json";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in required fields.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  useEffect(() => {
    if (usersData.length > 0) {
      localStorage.setItem("usersData", JSON.stringify(usersData));
    }
    if (cardData) {
      localStorage.setItem("cardData", JSON.stringify(cardData));
    }
  }, []);

  return (
    <div className={styles.loginBox}>
      <div className={styles.leftDiv}>
        <div className={styles.logo}>
          <LogoComp />
        </div>
        <Image
          src={"/images/pablo.png"}
          alt="Sign In"
          width={400}
          height={400}
          className={styles.loginImage}
        />

        <div className={styles.blurry}></div>
      </div>
      <div className={styles.rightDiv}>
        <div className={styles.welcome}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={`${emailActive ? styles.active : styles.inactive}`}>
            <p>Email</p>
            <input
              type="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailActive(true)}
              onBlur={() => setEmailActive(false)}
            />
            {error && email === "" && <h6 className={styles.error}>{error}</h6>}
          </div>
          <div
            className={`${styles.passwordInput} ${
              passwordActive ? styles.active : styles.inactive
            }`}
          >
            <p>Password</p>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordActive(true)}
              onBlur={() => setPasswordActive(false)}
            />
            <h4 onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </h4>
            {error && password === "" && (
              <h6 className={styles.error}>{error}</h6>
            )}
          </div>
          <Link href="#" className={styles.forgotPasswordLink}>
            FORGOT PASSWORD?
          </Link>
          <button>
            Login {isLoading ? <ClipLoader color="#fff" size={20} /> : ""}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
