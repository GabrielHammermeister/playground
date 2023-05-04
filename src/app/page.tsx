// noinspection JSUnusedGlobalSymbols

"use client";
import styles from "./page.module.css";
import {UpvoteList} from "@/app/components/List";
import {useContext} from "react";
import {ListInput} from "@/app/components/List/ListInput/ListInput";
import UpvoteListContext from "@/app/context/UpvoteList/Context";

export default function Home() {
    const {listDataState } = useContext(UpvoteListContext)

    return (
        <main className={styles.main}>
          <h1>
            UPVOTE LIST
          </h1>
            <ListInput />
            <UpvoteList data={listDataState}/>
        </main>
    )
}
