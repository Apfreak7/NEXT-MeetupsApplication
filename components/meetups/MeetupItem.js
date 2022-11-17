import { useRouter } from "next/router";
import React from "react";

import Card from "../ui/Card";
import styles from "./MeetupItem.module.css";

export default function MeetupItem({ title, image, address, id }) {
  const router = useRouter();

  const showDetailHandler = () => {
    router.push(`/${id}`);
  };

  return (
    <li className={styles.item}>
      <Card>
        <div className={styles.image}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={styles.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}
