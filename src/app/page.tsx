'use client'

import styles from "./page.module.css";
import Link from "next/link";
import {useEffect} from "react";
import {getAllUpvoteLists, updateListById} from "@/app/services/UpvoteList";

export default function Home() {

    useEffect(() => {
        // getAllUpvoteLists().then(res => {
        //     updateListById('xkSPfi8Oywga6cdCoqdB', {...res[0], id: 'xkSPfi8Oywga6cdCoqdB'})
        // })
    }, []);

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
