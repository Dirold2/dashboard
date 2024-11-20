"use client";
import React, { useEffect, useCallback } from 'react';
import styles from '../style/header.module.css';
import Image from 'next/image';
import Link from 'next/link';


interface SearchResult {
  id: number;
  name: string;
  email: string;
  image: string;
  first_name: string;
  last_name: string;
}

interface SearchResultsProps {
  onSearch: (searchTerm: string) => void;
  searchResults: SearchResult[];
  showDropdown: boolean;
  showStyleDropdown: boolean;
  onClose: () => void;
  suggestions: string[];
  setSearchTerm: (term: string) => void;
  setSearchSuggestions: (suggestions: string[]) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  setSearchSuggestions,
  showDropdown,
  showStyleDropdown,
  onClose,
  onSearch,
  suggestions,
  setSearchTerm,
}) => {
  const handleClickOutside = useCallback((event: MouseEvent) => {
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

  const handleItemClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    showDropdown && (
      <div
        id="dropdown"
        className={`${styles.dropdown} ${showStyleDropdown ? styles.show : ''}`}
      >
        {searchResults.map((result) => (
          <div key={`result-${result.id}`} onClick={handleItemClick}>
            <Link href={`${result.name}`}>
              <div className={styles.resultItem}>
                <Image
                  src={result.image || `https://ui-avatars.com/api/?format=svg&name=${result.name}&size=128`}
                  alt={result.name}
                  width={40}
                  height={40}
                />
                <span>{result.name}</span>
                <span>{result.email}</span>
              </div>
            </Link>
          </div>
        ))}
        <i
          onClick={onClose}
          className={`${styles.closeButton} center bi bi-x`}
        ></i>
      </div>
    )
  );
};

export default SearchResults;