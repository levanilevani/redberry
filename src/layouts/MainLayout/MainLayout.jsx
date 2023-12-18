import { Outlet, Link } from 'react-router-dom';

import Logo from '../../assets/svg/logo-primary.svg?react';

import styles from './styles.module.scss';
import { Button } from '../../components/common';

export const MainLayout = () => {
  return (
    <div className={styles['layout']}>
      <header className={styles['layout__header']}>
        <div>
          <Link to='/'>
            <Logo />
          </Link>
          <Button>შესვლა</Button>
        </div>
      </header>

      <main className={styles['layout__outlet']}>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
