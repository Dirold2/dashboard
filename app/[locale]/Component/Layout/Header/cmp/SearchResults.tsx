"use client";
import React, { useEffect, useCallback } from 'react';
import styles from '../style/header.module.css';
import Image from 'next/image';

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

  const handleSelectSuggestion = (selectedSuggestion: string): void => {
    setSearchTerm(selectedSuggestion);
    onSearch(selectedSuggestion);
    setSearchSuggestions([]);
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
        {suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map((suggestion, index) => (
              <div key={index}>
                <div
                  className={styles.suggestion}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <i className="bi bi-search"></i>
                  <li
                    onClick={(event) => {
                      handleSelectSuggestion(suggestion);
                      event.stopPropagation();
                    }}
                  >
                    {suggestion}
                  </li>
                </div>
                {index < suggestions.length - 1 && <hr />}
              </div>
            ))}
          </ul>
        )}
        {searchResults.map((result) => (
          <div key={result.id} onClick={handleItemClick}>
            <div>
              <Image
                src={result.image || `https://ui-avatars.com/api/?format=svg&name=${result.name}&size=128`}
                alt={`${result.name}`}
                width={200}
                height={200}
              />
              <span>
                {result.name}
              </span>
              <span> {result.email}</span>
            </div>
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