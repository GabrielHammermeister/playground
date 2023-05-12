"use client";

import "./local.css"
import {ChangeEvent, FormEvent, useContext, useEffect, useMemo, useRef, useState} from "react";
import UpvoteListContext from "@/app/context/UpvoteList/Context";
import {deleteUpvoteList, getUpvoteList, updateListById} from "@/app/services/UpvoteList";
import {ListInput} from "@/app/components/List/ListInput/ListInput";
import Image from "next/image";
import uploadCloud from "@/../public/upload-cloud.svg";
import styles from "./style.module.css";
import Button from "@/app/components/Button";
import {UpvoteList} from "@/app/components/List";
import {useRouter} from "next/navigation";


export default function Page({ params }: { params: { id: string }}) {

    const { upvoteListState, dispatch } = useContext(UpvoteListContext)
    const [cloudFeedback, setCloudFeedback] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const memoizedListData = useMemo(() => upvoteListState?.listData, [upvoteListState?.listData])

    useEffect(() => {
        
        const titleInput = titleInputRef.current
        const listenFocusOut = (e: FocusEvent) => {
            const target = e.target as Element
            target.classList.remove('listTitleHighlight')
            setEnableEdit(false)
        }

        titleInput?.addEventListener("focusout", listenFocusOut)
        return () => {
            titleInput?.removeEventListener('focusout', listenFocusOut)
        }
    }, []);

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

    function handleSelectText() {
        titleInputRef.current?.select()
        titleInputRef.current?.classList.add('listTitleHighlight')
        setEnableEdit(true)
    }
    function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        dispatch({type: 'update-list-title', payload: { newTitle: e.target.value}})
    }

    function handleSubmitTitle(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        titleInputRef.current?.dispatchEvent(new Event('focusout'))
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

    function handleDeleteList() {
        if(confirm("Tem certeza que quer excluir essa lista?")) {
            deleteUpvoteList(upvoteListState?.id || '')
            dispatch({ type: 'delete-list' })
            router.push('pages/upvote-list')
        }
    }

    return (
        <>
            <h1>
                UPVOTE LIST
            </h1>
            <ListInput/>
            <section className={styles.actionSection}>
                <form
                    onSubmit={(e) => handleSubmitTitle(e)}
                    className={styles.listTitleForm}
                >
                    <input
                        ref={titleInputRef}
                        onDoubleClick={handleSelectText}
                        onChange={e => handleChangeTitle(e)}
                        className={styles.listTitle}
                        value={upvoteListState?.title}
                        readOnly={!enableEdit}

                    />
                </form>
                <div className={styles.uploadFeedbackContainer} style={{opacity: cloudFeedback ? 1 : 0}}>
                    <Image src={uploadCloud} alt={'upload cloud'}  width={20} height={20}/>
                    <span>
                        Saved to cloud
                    </span>
                </div>
                <Button buttonAttributes={{onClick: handleSaveList, disabled: !upvoteListState?.listChanged}} >
                    Save
                </Button>
                <Button buttonAttributes={{onClick: handleDeleteList }} >
                    Delete list
                </Button>
            </section>
            <UpvoteList data={memoizedListData}/>
        </>
    )

}