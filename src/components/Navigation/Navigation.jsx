import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css'; 

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
        Home
      </NavLink>
      <NavLink to="/movies" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
        Movies
      </NavLink>
    </nav>
  );
};

