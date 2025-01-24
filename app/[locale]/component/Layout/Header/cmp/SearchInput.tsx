'use client';

import { MenuMobile } from '@component/Layout';
import { Button, Logo, Notification } from '@component/Layout/Sidebar';
import { Tooltip } from '@ui/Tooltip';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';

import styless from '@styles/other.module.scss';

import styles from '../style/header.module.scss';

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
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { status } = useSession();
  const t = useTranslations('Search');

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();
  };

  const isUnauthenticated = status === 'unauthenticated';

  return (
    <div className={styles.header}>
      <MenuMobile />
      <form
        id="search"
        onSubmit={handleSearchSubmit}
        role="search"
        aria-label={t('Search')}
        className={styles.searchForm}
      >
        <input
          type="search"
          id="search-input"
          name="search"
          autoComplete="off"
          placeholder={t('Search')}
          required
          value={searchTerm}
          onChange={handleSearchChange}
          ref={searchInputRef}
          className={styles.searchInput}
        />
        <button
          type="submit"
          aria-label={t('Search')}
          className={styles.searchButton}
        >
          <i className="bi bi-search" />
        </button>
      </form>
      <div
        className={`${styless.notificationbox} ${styles.notificationbox}`}
        style={{ marginLeft: '20px' }}
      >
        {isUnauthenticated ? (
          <Tooltip content={t('Login')} position="bottom">
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
