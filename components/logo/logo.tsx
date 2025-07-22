import React from "react";
import Image from "next/image";
import styles from "./logo.module.scss";

const LogoComp = () => {
  return (
    <div className={styles.logoBox}>
      <Image
        src={"/icons/logo.svg"}
        alt=""
        width={50}
        height={50}
        className={styles.logoIcon}
      />
      <Image
        src={"/icons/lendsqr.svg"}
        alt=""
        width={50}
        height={50}
        className={styles.logoImg}
      />
    </div>
  );
};

export default LogoComp;
