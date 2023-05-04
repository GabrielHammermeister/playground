"use client";

import styles from "./ListItem.module.css";
import chevronUp from "@/../public/chevron-up.svg";
import chevronDown from "@/../public/chevron-down.svg";
import IconButton from "@/app/components/IconButton";
import {UpvoteListItemType} from "@/app/models/UpvoteList";
import {useContext} from "react";
import UpvoteListContext from "@/app/context/UpvoteList/Context";

export default function ListItem({ item }: { item: UpvoteListItemType }) {
    const { dispatch } = useContext(UpvoteListContext)

    function handleUpvote() {
        dispatch({type: 'upvote', payload: {id: item.id}})
    }
    function handleDownvote() {
        dispatch({type: 'downvote', payload: {id: item.id}})
    }
    
    return (
        <li className={styles.itemContainer}>
            <div className={styles.itemContent}>
                <span>{item.title}</span>
                <span>
                    {item.votes}
                </span>
            </div>
            <div className={styles.itemVotes}>
                <IconButton src={chevronUp} alt={'icone para cima'} size='small' buttonAttributes={{onClick: handleUpvote}}/>
                <IconButton src={chevronDown} alt={'icone para baixo'} size='small' buttonAttributes={{onClick: handleDownvote}}/>
            </div>
        </li>
    );
}