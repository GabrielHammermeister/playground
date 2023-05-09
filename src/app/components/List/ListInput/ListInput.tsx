'use client';

import {FormEvent, useContext, useState} from "react";
import IconButton from "@/app/components/IconButton";
import plusIcon from "@/../public/plus.svg";
import styles from "./styles.module.css";
import {v4 as uuidv4} from "uuid";
import UpvoteListContext from "@/app/context/UpvoteList/Context";


export function ListInput() {
    const [inputValue, setInputValue] = useState('');
    const {dispatch} = useContext(UpvoteListContext)
    function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        dispatch({ type: 'add-item', payload: { item: { id: uuidv4(), title: inputValue,  votes: 0 }}})
        setInputValue('')
    }

    return (
        <form className={styles.form} onSubmit={(e) => handleOnSubmit(e)}>
            <input className={styles.input} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={"Adicione um item"}/>

            <IconButton src={plusIcon} alt={'adicionar'} size='large'/>
        </form>
    );
}