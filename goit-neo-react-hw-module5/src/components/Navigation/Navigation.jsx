import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css'; // Додайте стилі, якщо потрібно

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

// src/components/Navigation.module.css
// .nav {
//   padding: 10px;
//   background-color: #f0f0f0;
//   border-bottom: 1px solid #ccc;
// }

// .link {
//   margin-right: 15px;
//   text-decoration: none;
//   color: #333;
//   font-weight: bold;
// }

// .activeLink {
//   color: #007bff;
// }