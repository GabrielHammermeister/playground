"use client";

import {ChangeEvent, useContext, useEffect, useMemo, useState} from "react";
import UpvoteListContext from "@/app/context/UpvoteList/Context";
import {getUpvoteList, updateListById} from "@/app/services/UpvoteList";
import {ListInput} from "@/app/components/List/ListInput/ListInput";
import Image from "next/image";
import uploadCloud from "@/../public/upload-cloud.svg";
import styles from "./style.module.css";
import Button from "@/app/components/Button";
import {UpvoteList} from "@/app/components/List";

export default function Page({ params }: { params: { id: string }}) {

    const { upvoteListState, dispatch } = useContext(UpvoteListContext)
    const [cloudFeedback, setCloudFeedback] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);

    const memoizedListData = useMemo(() => upvoteListState?.listData, [upvoteListState?.listData])

    useEffect(() => {
        const fetchFirestoreData = async () => {
            const firestoreUpvoteList = await getUpvoteList(params.id)
            dispatch({type: 'hydrate', payload: firestoreUpvoteList})

        }
        fetchFirestoreData()
        // eslint-disable-next-line
    }, []);
    function giveCloudFeedback() {
        setCloudFeedback(true)
        setTimeout(()  => setCloudFeedback(false), 5000)
    }

    function handleUpdateTitle() {
        setEnableEdit(true)
    }
    function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        dispatch({type: 'update-list-title', payload: { newTitle: e.target.value}})
    }



    async function handleSaveList() {
        if(upvoteListState) {
            try {
                await updateListById(upvoteListState.id, upvoteListState)
                dispatch({ type: 'list-saved', payload: { listId: upvoteListState.id } })
                giveCloudFeedback()
            } catch (err) {
                throw Error('Error while saving changes')
            }
        }
    }

    return (
        <>
            <h1>
                UPVOTE LIST
            </h1>
            <ListInput/>
            <section className={styles.actionSection}>
                <input onChange={e => handleChangeTitle(e)} className={styles.listTitle} value={upvoteListState?.title} readOnly={!enableEdit} onDoubleClick={handleUpdateTitle}/>
                <div className={styles.uploadFeedbackContainer} style={{opacity: cloudFeedback ? 1 : 0}}>
                    <Image src={uploadCloud} alt={'upload cloud'}  width={20} height={20}/>
                    <span>
                        Saved to cloud
                    </span>
                </div>
                <Button buttonAttributes={{onClick: handleSaveList, disabled: !upvoteListState?.listChanged}} >
                    Save
                </Button>
            </section>
            <UpvoteList data={memoizedListData}/>
        </>
    )

}