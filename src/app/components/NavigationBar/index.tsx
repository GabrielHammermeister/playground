'use client'

import Link from "next/link";
import {ROUTES} from "@/app/constants/Router";
import styles from './styles.module.css'
import {usePathname} from "next/navigation";

export default function NavigationBar() {
    const pathname = usePathname()

    return (
        <nav className={styles.navigationBar}>
            <h3 className={styles.playgroundLogo}>My Playground</h3>

            <ul className={styles.navigationList}>
                <li className={`${styles.navigationLink} ${pathname === ROUTES.HOME && styles.activeLink}`}><Link href={ROUTES.HOME}>Home Page</Link></li>
                <li className={`${styles.navigationLink} ${pathname === ROUTES.TRAFFIC_LIGHT && styles.activeLink}`}><Link href={ROUTES.TRAFFIC_LIGHT}>Traffic Light</Link></li>
                <li className={`${styles.navigationLink} ${pathname === ROUTES.UPVOTE_LISTS && styles.activeLink}`}><Link href={ROUTES.UPVOTE_LISTS}>Upvote Lists</Link></li>
            </ul>
        </nav>
    )
}