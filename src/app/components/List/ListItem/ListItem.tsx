"use client";

import styles from "./ListItem.module.css";
import chevronUp from "@/../public/chevron-up.svg";
import chevronDown from "@/../public/chevron-down.svg";
import trash from "@/../public/trash-2.svg";
import IconButton from "@/app/components/IconButton";
import {UpvoteListItemType} from "@/app/models/UpvoteList";
import {useContext, useState} from "react";
import UpvoteListContext from "@/app/context/UpvoteList/Context";

export default function ListItem({ item }: { item: UpvoteListItemType }) {
    const { dispatch } = useContext(UpvoteListContext)
    const [showDelete, setShowDelete] = useState(false);

    function handleUpvote() {
        dispatch({type: 'upvote', payload: {id: item.id}})
    }
    function handleDownvote() {
        dispatch({type: 'downvote', payload: {id: item.id}})
    }
    function handleDelete() {
        dispatch({type: 'delete-item', payload: {id: item.id}})
    }

    return (
        <li className={styles.itemContainer} onMouseOver={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)}>
            { showDelete && (<IconButton src={trash} alt={'deletar'} size='small' buttonAttributes={{onClick: handleDelete}}/>) }
            <div className={styles.itemContent}>
                <span>{item.title}</span>
                <span>
                    {item.votes}
                </span>
            </div>
            <div className={styles.itemVotes}>
                <IconButton src={chevronUp} alt={'icone para cima'} size='extraSmall' buttonAttributes={{onClick: handleUpvote}}/>
                <IconButton src={chevronDown} alt={'icone para baixo'} size='extraSmall' buttonAttributes={{onClick: handleDownvote}}/>
            </div>
        </li>
    );
}