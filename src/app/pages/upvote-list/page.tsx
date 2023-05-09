"use client";

import styles from "./style.module.css";
import {useEffect, useState} from "react";
import {getAllUpvoteLists} from "@/app/services/UpvoteList";
import {UpvoteList} from "@/app/models/UpvoteList";
import Link from "next/link";

export default function Page() {

    const [upvoteLists, setUpvoteLists] = useState<UpvoteList[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllUpvoteLists().then(res => {
            setUpvoteLists(res)
        }).finally(() => setLoading(false))
    }, []);

    return (
        <>
            <h1>
                YOUR UPVOTE LISTS
            </h1>
            <section className={styles.gridLists}>
                {loading ? (<h2>Carregando Listas</h2>) :
                    upvoteLists.map(list => (
                        <Link href={'pages/upvote-list/' + list.id} key={list.id}>
                            <button className={styles.gridItem}>
                                <h3>{list.title}</h3>
                            </button>
                        </Link>
                    ))
                }
                <button className={styles.gridAddList}>
                    <h3>Adicionar Lista</h3>
                </button>

            </section>
        </>
    )

}