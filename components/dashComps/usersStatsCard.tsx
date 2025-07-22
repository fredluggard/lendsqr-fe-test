"use client";

import React, { useEffect, useState } from "react";
import styles from "./userStats.module.scss";
import Image from "next/image";

type CardData = {
  icon: string;
  title: string;
  value: string | number;
  color: string;
};

const UsersStatsCard = () => {
  const [cardData, setCardData] = useState();

  useEffect(() => {
    const data = localStorage.getItem("cardData");
    const stats = data ? JSON.parse(data) : [];
    setCardData(stats);
  }, []);

  return (
    <div className={styles.usersCard}>
      {(cardData as CardData[] | undefined)?.map(
        (card: CardData, index: number) => (
          <div key={index} className={`${styles.card}`}>
            <div className={`${styles[card.color]}`}>
              <Image
                src={card.icon}
                alt={card.title}
                width={24}
                height={24}
                className={styles.cardIcon}
              />
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardValue}>{card.value}</p>
          </div>
        )
      )}
    </div>
  );
};

export default UsersStatsCard;
