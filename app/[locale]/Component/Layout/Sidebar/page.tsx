"use client";
import { Tooltip } from '@ui/Tooltip';
import { Grid, Item } from '@ui/Grid';
import styles from '@styles/other.module.css';

import { LangInput } from '@cmp/Lang';

import { Button, Dates, Lang, Logo, Notification } from './cmp';
import { useSession } from 'next-auth/react';
import React from 'react';
import { JSX } from 'react/jsx-runtime';

function Sidebar(): JSX.Element {
  const {data: session} = useSession();

  const MemoizedNotification = React.memo(Notification);
  const MemoizedLogo = React.memo(Logo);

  return <div className={`${styles.other} ${!session && styles.active}`}>
    <div className={styles.notificationbox}>
        <Dates />
        <Lang />
        {session ? (
          <>
            <MemoizedNotification />
            <MemoizedLogo />
          </>
        ) : (
          <div className={styles.sidebox}>
            <Tooltip content="Login" position="bottom">
              <Button />
            </Tooltip>
          </div>
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
export default Sidebar;
