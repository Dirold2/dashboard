'use client';

import React, { useState, useEffect } from 'react';
import styles from './style/header.module.css';
import SearchInput from './cmp/SearchInput';
import SearchResults from './cmp/SearchResults';
import { JSX } from 'react/jsx-runtime';
import 'dotenv/config'
require('dotenv').config()

// interface UserData {
//   first_name: string;
//   last_name: string;
// }

function Header(): JSX.Element {
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleSearch = async (searchTerm: string): Promise<void> => {
      if (!searchTerm) {
        setSearchResults([]);
        setSearchSuggestions([]);
        setShowDropdown(false);
        setShowStyleDropdown(false);
        return;
      }
      try {
        const response = await fetch(
          `/api/account/all`,
        );
        const data = await response.json();
        // const searchTermWords = searchTerm.trim().toLowerCase().split(/\s+/);
        // const filteredData = data.data.filter(
        //   ({ first_name, last_name }: UserData) => {
        //     return searchTermWords.some(
        //       (word: string) =>
        //         first_name.toLowerCase().includes(word) ||
        //         last_name.toLowerCase().includes(word),
        //     );
        //   },
        // );
        setSearchResults(data);
        setSearchSuggestions(
          data.map(
            ({ name }: {name: string}) =>
              `${name}`,
          ),
        );
        setShowDropdown(!!data.length);
        setShowStyleDropdown(!!data.length);
      } catch (error) {
        false
      }
    };

    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleCloseDropdown = (): void => {
    setTimeout(() => {
      setShowDropdown(false);
      setShowStyleDropdown(false);
    }, 150);
  };

  return (
    <span className={styles.search}>
      <SearchInput
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <SearchResults
        onSearch={setSearchTerm}
        searchResults={searchResults}
        showDropdown={showDropdown}
        showStyleDropdown={showStyleDropdown}
        onClose={handleCloseDropdown}
        suggestions={searchSuggestions}
        setSearchTerm={setSearchTerm}
        setSearchSuggestions={setSearchSuggestions}
      />
    </span>
  );
}

export default Header;