"use client";

import React, { useEffect, useCallback } from "react";
import styles from "../style/header.module.css";
import Image from "next/image";
import Link from "next/link";

interface SearchResult {
  id: number;
  name: string;
  email: string;
  image: string | null;
  first_name: string;
  last_name: string;
}

interface SearchResultsProps {
  searchResults: SearchResult[];
  showDropdown: boolean;
  showStyleDropdown: boolean;
  hostName: string;
  locale: string;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  showDropdown,
  showStyleDropdown,
  hostName,
  locale,
  onClose,
}) => {
  const host = hostName;
  
  const handleClickOutside = useCallback((event: MouseEvent): void => {
    const dropdownElement = document.getElementById('dropdown');
    const searchElement = document.getElementById('search');
    if (
      dropdownElement &&
      searchElement &&
      !dropdownElement.contains(event.target as Node) &&
      !searchElement.contains(event.target as Node)
    ) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const renderAvatar = (result: SearchResult): string => {
    return result.image || `https://ui-avatars.com/api/?format=svg&name=${result.name}&size=128`;
  };

  if (!showDropdown) return null;

  return (
    <div
      id="dropdown"
      className={`${styles.dropdown} ${showStyleDropdown ? styles.show : ""}`}
    >
      {searchResults.map((result) => (
        <Link
          key={`result-${result.id}`}
          href={`${host}${locale}/${result.name}`}
          className={styles.resultLink}
          onClick={() => onClose()}
        >
          <div className={styles.resultItem}>
            <Image
              src={renderAvatar(result)}
              alt={result.name}
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span>{result.name}</span>
          </div>
        </Link>
      ))}
      <button
        onClick={onClose}
        className={`${styles.closeButton} center bi bi-x`}
        aria-label="Close"
      />
    </div>
  );
};

export default SearchResults;