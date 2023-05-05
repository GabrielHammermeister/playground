import {collection, doc, getDoc, getDocs, setDoc} from "@firebase/firestore";
import {firestore} from "@/app/services/firebase/initializeApp";
import {List, UpvoteList, UpvoteListItemType} from "@/app/models/UpvoteList";
import {documentReference} from "@firebase/firestore/dist/firestore/test/util/api_helpers";
import {Dispatch, SetStateAction} from "react";

const UPVOTE_COLECTION_PATH = 'upvote-lists'

// const upvoteListCol = collection(firestore, UPVOTE_COLECTION_PATH)
const upvoteListRef = doc(firestore, UPVOTE_COLECTION_PATH, '4SHr4ICGATXlLackEAgz')

export async function getUpvoteList(): Promise<UpvoteList> {
    const listSnapshot = await getDoc(upvoteListRef)
    return listSnapshot.data() as UpvoteList
}

export async function updateUpvoteList(newList: UpvoteList, setListChanged: Dispatch<SetStateAction<boolean>>): Promise<void> {
    try {
        await setDoc(upvoteListRef, newList)
        setListChanged(false)
    } catch(err) {
        throw Error('Update Error')
    }
}

// export async function getUpvoteListUpdatedAt(): Promise<Date> {
//     const upvoteListSnapshot = await getDoc(upvoteListRef)
//     const { updatedAt } = upvoteListSnapshot.data() as UpvoteList
//     return new Date(updatedAt)
// }

