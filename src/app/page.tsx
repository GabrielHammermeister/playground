// noinspection JSUnusedGlobalSymbols

"use client";
import styles from "./page.module.css";
import {UpvoteList} from "@/app/components/List";
import {useContext, useEffect, useState} from "react";
import {ListInput} from "@/app/components/List/ListInput/ListInput";
import UpvoteListContext from "@/app/context/UpvoteList/Context";
import {firestore} from "@/app/services/firebase/initializeApp";
import {collection, getDocs} from "@firebase/firestore";
import {getUpvoteList, updateUpvoteList} from "@/app/services/UpvoteList";
import Button from "@/app/components/Button";



export default function Home() {
    const { upvoteListState, listChanged, setListChanged } = useContext(UpvoteListContext)

    function handleSaveList() {
        if(upvoteListState) {
            updateUpvoteList(upvoteListState, setListChanged)
        }
    }

    useEffect(() => {
        console.log("listChanged", listChanged);
        console.log("upvoteListState", upvoteListState);
    }, [listChanged]);

    return (
        <main className={styles.main}>
            <h1>
                UPVOTE LIST
            </h1>
            <ListInput/>
            <section className={styles.actionSection}>
                <Button buttonAttributes={{onClick: handleSaveList, disabled: !listChanged}} >
                    Save
                </Button>
            </section>
            <UpvoteList data={upvoteListState?.listData}/>
        </main>
    )
}
