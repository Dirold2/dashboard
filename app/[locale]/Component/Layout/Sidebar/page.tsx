import { Tooltip } from '@ui/Tooltip';
import { Grid, Item } from '@ui/Grid';
import styles from '@styles/other.module.css';

import { LangInput } from '@cmp/Lang';

import { Button, Dates, Lang, Logo, Notification } from './cmp';
import React from 'react';
import { JSX } from 'react/jsx-runtime';
import { auth } from '.auth/auth';

async function Sidebar(): Promise<JSX.Element> {
  const session = await auth()

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
      <div className={`${styles.otherbox} center`}>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <Tooltip content="1" position="top">
              <Item style={{padding: `30px`, margin: `10px`}}>1</Item>
            </Tooltip>
            <Tooltip content="2" position="right">
              <Item style={{padding: `30px`, margin: `10px`}}>2</Item>
            </Tooltip>
            <Tooltip content="3" position="left">
              <Item style={{padding: `30px`, margin: `10px`}}>3</Item>
            </Tooltip>
            <Tooltip content="4" position="bottom">
              <Item style={{padding: `30px`, margin: `10px`}}>4</Item>
            </Tooltip>
          </div>
      </div>
  </div>

}
export default Sidebar;
