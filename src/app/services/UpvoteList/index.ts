import {collection, deleteDoc, doc, getDoc, getDocs, setDoc} from "@firebase/firestore";
import {firestore} from "@/app/services/firebase/initializeApp";
import {UpvoteList} from "@/app/models/UpvoteList";

const UPVOTE_COLECTION_PATH = 'upvote-lists'

const upvoteListCol = collection(firestore, UPVOTE_COLECTION_PATH)

function generateId(): string {
    return doc(collection(firestore, 'asdf')).id
}

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
    await setDoc(listRef, {...newList, listChanged: false} as UpvoteList)
}

export async function createUpvoteList(): Promise<UpvoteList> {
    const newListId = generateId()
    const newListData = {id: newListId, title: 'New Upvote List', listData: [], listChanged: false} as UpvoteList
    const newListRef = doc(firestore, UPVOTE_COLECTION_PATH, newListId)
    await setDoc(newListRef, newListData)
    return newListData
}

export async function deleteUpvoteList(id: string): Promise<void> {
    const listRef = doc(firestore, UPVOTE_COLECTION_PATH, id)
    await deleteDoc(listRef)
}

