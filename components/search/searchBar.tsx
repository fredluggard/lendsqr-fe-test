import Image from "next/image";
import React from "react";
import styles from "./searchBar.module.scss";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search for anything"
      />

      <button>
        <Image
          src={"/icons/searchbar.svg"}
          alt="Search Icon"
          width={14}
          height={14}
        />
      </button>
    </div>
  );
};

export default SearchBar;
