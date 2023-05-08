"use client";

import styles from "./style.module.css";

export default function Page() {

    return (
        <>
            <h1>
                YOUR UPVOTE LISTS
            </h1>
            <section className={styles.gridLists}>
                 <button className={styles.gridItem}>
                     <h3>List title</h3>
                 </button>
                <button className={styles.gridItem}>
                    <h3>List title</h3>
                </button>
                <button className={styles.gridAddList}>
                    <h3>Adicionar Lista</h3>
                </button>

            </section>
        </>
    )

}