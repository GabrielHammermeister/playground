import {collection, doc, getDoc, getDocs, setDoc} from "@firebase/firestore";
import {firestore} from "@/app/services/firebase/initializeApp";
import {List, UpvoteList, UpvoteListItemType} from "@/app/models/UpvoteList";
import {documentReference} from "@firebase/firestore/dist/firestore/test/util/api_helpers";

const UPVOTE_COLECTION_PATH = 'upvote-lists'

// const upvoteListCol = collection(firestore, UPVOTE_COLECTION_PATH)
const upvoteListRef = doc(firestore, UPVOTE_COLECTION_PATH, '4SHr4ICGATXlLackEAgz')

export async function getUpvoteList(): Promise<UpvoteList> {
    const listSnapshot = await getDoc(upvoteListRef)
    return listSnapshot.data() as UpvoteList
}

export async function updateUpvoteList(newList: UpvoteList): Promise<void> {
    await setDoc(upvoteListRef, newList)
}

export async function getUpvoteListUpdatedAt(): Promise<Date> {
    const upvoteListSnapshot = await getDoc(upvoteListRef)
    const { updatedAt } = upvoteListSnapshot.data() as UpvoteList
    return new Date(updatedAt)
}

