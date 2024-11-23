"use client";

import React, { useState, useEffect, useCallback, JSX } from "react";
import styles from "./style/header.module.css";
import SearchInput from "./cmp/SearchInput";
import SearchResults from "./cmp/SearchResults";
import { hostName } from "@config";

import { Logger } from "tslog";
const logger = new Logger();

interface SearchResult {
  id: number;
  name: string;
  email: string;
  image: string | null;
  first_name: string;
  last_name: string;
}

function Header({ locale }: {locale: string}): JSX.Element {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hostNames, sethostNames] = useState(hostName)

  const debounce = useCallback((callback: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (): void => {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    };
  }, []);

  const handleSearch = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setSearchResults([]);
        setShowDropdown(false);
        setShowStyleDropdown(false);
        return;
      }

      try {
        const response = await fetch(`/api/account/all`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data: SearchResult[] = await response.json();
        setSearchResults(data);
        setShowDropdown(data.length > 0);
        setShowStyleDropdown(data.length > 0);
        sethostNames(hostName)
      } catch (error) {
        logger.error("Error fetching account data:", error);
        setSearchResults([]);
        setShowDropdown(false);
        setShowStyleDropdown(false);
      }
    },
    []
  );

  useEffect(() => {
    debounce(() => handleSearch(searchTerm), 300)();
  }, [searchTerm, handleSearch, debounce]);

  const handleCloseDropdown = (): void => {
    setShowDropdown(false);
    setShowStyleDropdown(false);
  };

  return (
    <span className={styles.search}>
      <SearchInput
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <SearchResults
        searchResults={searchResults}
        showDropdown={showDropdown}
        showStyleDropdown={showStyleDropdown}
        hostName={hostNames}
        locale={locale}
        onClose={handleCloseDropdown}
      />
    </span>
  );
};

export default Header;
