import { Outlet, Link } from 'react-router-dom';

import Logo from '../../assets/svg/logo-primary.svg?react';

import styles from './styles.module.scss';
import { Button } from '../../components/common';

export const SeccondaryLayout = () => {
  return (
    <div className={styles['layout']}>
      <header className={styles['layout__header']}>
        <div className={styles['layout__header--icon']}>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
      </header>

      <main className={styles['layout__main']}>
        <div className={styles['layout__main--back']}>
          <Button shape='circle'>{'<'}</Button>
        </div>
        <section className={styles['layout__main--outlet']}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};
