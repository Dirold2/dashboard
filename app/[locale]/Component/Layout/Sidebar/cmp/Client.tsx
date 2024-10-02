"use client";
import { Tooltip } from '@ui/Tooltip';
import { Grid, Item } from '@ui/Grid';
import styles from '@styles/other.module.css';

import { LangInput } from '@cmp/Lang';

import Button from './Button';
import Dates from './Dates';
import Lang from './Lang';
import Logo from './Logo';
import { Notification } from './Notification';
import { useSession } from 'next-auth/react';

function SidebarClient(): JSX.Element {
  const {data: session} = useSession();

  return <div className={`${styles.other} ${!session && styles.active}`}>
    <div className={styles.notificationbox}>
        <Dates />
        <Lang />
        {session ? (
          <>
            <Notification />
            <Logo />
          </>
        ) : (
          <Tooltip content="Login" position="bottom">
            <Button />
          </Tooltip>
        )}
      </div>
      <div className={`${styles.otherbox} center`}>
        <Tooltip content="Tooltip" position="top">
          <span style={{ cursor: 'pointer' }}>
            <LangInput translate="Tooltip.TooltipHV" /> (top)
          </span>
        </Tooltip>
      </div>
      <div className={styles.otherbox}>
        <Grid>
          <Tooltip content="Test" position="top">
            <Item>1</Item>
          </Tooltip>
          <Tooltip content="Test" position="right">
            <Item>2</Item>
          </Tooltip>
          <Tooltip content="Test" position="left">
            <Item>3</Item>
          </Tooltip>
          <Tooltip content="Test" position="bottom">
            <Item>4</Item>
          </Tooltip>
        </Grid>
      </div>
  </div>

}
export default SidebarClient;
