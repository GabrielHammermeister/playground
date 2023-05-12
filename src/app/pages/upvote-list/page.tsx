"use client";

import styles from "./style.module.css";
import {useEffect, useState} from "react";
import {createUpvoteList, getAllUpvoteLists} from "@/app/services/UpvoteList";
import {UpvoteList} from "@/app/models/UpvoteList";
import Link from "next/link";
import ElevatedButton from "@/app/components/ElevatedButton";



export default function Page() {

    const [upvoteLists, setUpvoteLists] = useState<UpvoteList[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllUpvoteLists().then(res => {
            setUpvoteLists(res)
        }).finally(() => setLoading(false))
    }, []);

    function handleAddNewList() {
        createUpvoteList().then(res => setUpvoteLists(prev => [...prev, res]))
    }

    return (
        <>
            <h1>
                YOUR UPVOTE LISTS
            </h1>
            <section className={styles.gridLists}>
                {loading ? (<h2>Carregando Listas</h2>) :
                    upvoteLists.map(list => (
                        <Link href={'pages/upvote-list/' + list.id} key={list.id}>
                            <ElevatedButton label={list.title}/>
                        </Link>
                    ))
                }
                <button className={styles.gridAddList} onClick={handleAddNewList}>
                    <h3>Adicionar Lista</h3>
                </button>

            </section>
        </>
    )

}