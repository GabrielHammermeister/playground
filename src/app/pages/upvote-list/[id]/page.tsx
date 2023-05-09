"use client";

import {useContext, useEffect, useState} from "react";
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

    useEffect(() => {
        const fetchFirestoreData = async () => {
            const firestoreUpvoteList = await getUpvoteList(params.id)
            dispatch({type: 'hydrate', payload: firestoreUpvoteList})

        }
        fetchFirestoreData()
    }, []);


    function giveCloudFeedback() {
        setCloudFeedback(true)
        setTimeout(()  => setCloudFeedback(false), 5000)
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
                UPVOTE LIST: {params.id}
            </h1>
            <ListInput/>
            <section className={styles.actionSection}>
                <h3 className={styles.listTitle}>
                    {upvoteListState?.title}
                </h3>
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
            <UpvoteList data={upvoteListState?.listData}/>
        </>
    )

}