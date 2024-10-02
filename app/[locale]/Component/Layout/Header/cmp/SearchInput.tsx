"use client";
import React, { useRef } from 'react';
import styles from '../style/header.module.css';
import styless from '@styles/other.module.css';
import { useTranslations } from 'next-intl';
import { Logo, Notification, Button } from '@cmp/Layout/Sidebar';
import { Tooltip } from '@ui/Tooltip';
import { useSession } from 'next-auth/react';
import { MenuMobile } from '@cmp/Layout';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  searchTerm,
  setSearchTerm,
}) => {
  const searchInputRef = useRef(null);
  const { status } = useSession();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
    event.stopPropagation();
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleItemClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const t = useTranslations('Search');

  return (
    <div className={styles.header}>
      <MenuMobile />
      <form
        id="search"
        onSubmit={handleSearchSubmit}
        role="search"
        onClick={handleItemClick}
      >
        <input
          type="search"
          id="search-input"
          name="search"
          placeholder={t('Search')}
          autoFocus
          required
          value={searchTerm}
          onChange={handleSearchChange}
          ref={searchInputRef}
        />
        <button type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>
      <div className={`${styless.notificationbox} ${styles.notificationbox}`} style={{ marginLeft: '20px' }}>
        {status === "unauthenticated" ? (
          <Tooltip content="Login" position="bottom">
            <Button />
          </Tooltip>
        ) : (
          <>
            <Notification />
            <Logo />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchInput;