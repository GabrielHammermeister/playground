"use client";

import styles from "./page.module.css";
import Link from "next/link";
import ElevatedButton from "@/app/components/ElevatedButton";

export default function Home() {

    return (
        <>
            <h1>
                HOME PAGE
            </h1>
            <section className={styles.routerSection}>
                <ul className={styles.routesList}>
                    <li>
                        <Link href={'pages/traffic-light'}>
                            <ElevatedButton label={'Traffic Light'}/>
                        </Link>
                    </li>
                    <li>
                        <Link href={'pages/upvote-list'}>
                            <ElevatedButton label={'Upvote List'}/>
                        </Link>
                    </li>
                </ul>
            </section>
        </>
    )
}
