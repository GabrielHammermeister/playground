"use client";

import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

    return (
        <main className={styles.main}>
            <h1>
                HOME PAGE
            </h1>
            <section className={styles.routerSection}>
                <ul className={styles.routesList}>
                    <li>
                        <Link href={'pages/traffic-light'}>
                            Traffic Light
                        </Link>
                    </li>
                    <li>
                        <Link href={'pages/upvote-list'}>
                            Upvote List
                        </Link>
                    </li>
                </ul>
            </section>
        </main>
    )
}
