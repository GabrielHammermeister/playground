import {collection, doc, getDoc, getDocs, setDoc} from "@firebase/firestore";
import {firestore} from "@/app/services/firebase/initializeApp";
import {UpvoteList} from "@/app/models/UpvoteList";
import {Dispatch, SetStateAction} from "react";

const UPVOTE_COLECTION_PATH = 'upvote-lists'

const upvoteListCol = collection(firestore, UPVOTE_COLECTION_PATH)
const upvoteListRef = doc(firestore, UPVOTE_COLECTION_PATH, '4SHr4ICGATXlLackEAgz')

export async function getUpvoteList( id: string ): Promise<UpvoteList> {
    const listRef = doc(firestore, UPVOTE_COLECTION_PATH, id)
    const listSnapshot = await getDoc(listRef)
    return listSnapshot.data() as UpvoteList
}

export async function getAllUpvoteLists(): Promise<UpvoteList[]> {
    const listSnapshot = await getDocs(upvoteListCol)
    return listSnapshot.docs.map(doc => doc.data() as UpvoteList)
}

export async function updateListById( id: string, newList: UpvoteList ): Promise<void> {
    const listRef = doc(firestore, UPVOTE_COLECTION_PATH, id)
    await setDoc(listRef, newList)
}


export async function updateUpvoteList(newList: UpvoteList): Promise<void> {
    await setDoc(upvoteListRef, {...newList, listChanged: false} as UpvoteList)
}
