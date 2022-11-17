import React from "react";

import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

export default function Layout({ children }) {
  return (
    <div>
      <MainNavigation />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
