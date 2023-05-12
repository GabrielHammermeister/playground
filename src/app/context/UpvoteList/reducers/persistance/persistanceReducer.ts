import {UpvoteList} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";
import {Timestamp} from "@firebase/firestore";


type ValidationKind = 'changes' | 'initialization'
const VALIDATION_KINDS: Record<ValidationKind, string[]> = {
    changes: ['upvote', 'downvote', 'add-item', 'delete-item', 'list-saved', 'update-list-title'],
    initialization: ['hydrate']
}

function persistUpvoteList(upvoteListState: UpvoteList) {
    let persistedUpvoteLists = getPersistedUpvoteLists()
    if(persistedUpvoteLists?.length > 0) {
        const foundListIndex = persistedUpvoteLists.findIndex(list => list.id === upvoteListState.id)
        if(foundListIndex === -1) {
            persistedUpvoteLists.push(upvoteListState)
        } else {
            persistedUpvoteLists[foundListIndex] = upvoteListState
        }
        localStorage.setItem('upvote-list', JSON.stringify([...persistedUpvoteLists]))
    } else  {
        localStorage.setItem('upvote-list', JSON.stringify([upvoteListState]))
    }
    return upvoteListState
}
function getPersistedUpvoteLists() {
    return JSON.parse(String(localStorage.getItem('upvote-list'))) as UpvoteList[]
}
function getPersistedUpvoteListById(id: string) {
    return getPersistedUpvoteLists()?.find(list => list.id === id)
}

export default function persistanceReducer(upvoteListState: UpvoteList, action: Action): UpvoteList {

    for(const key in VALIDATION_KINDS) {
        if(VALIDATION_KINDS[key as ValidationKind].includes(action.type)) {
            switch (key as ValidationKind) {
                case 'changes': {
                    let listChanged = upvoteListState.listChanged
                    if(!upvoteListState.listChanged && !(action.type === 'list-saved'))  listChanged = true
                    return persistUpvoteList({
                        ...upvoteListState,
                        updatedAt: Timestamp.now(),
                        listChanged
                    })

                }
                case 'initialization': {
                    if(action.type === 'hydrate') {
                        const firestoreList = action.payload
                        const persistedUpvoteList = getPersistedUpvoteListById(firestoreList.id)
                        if(persistedUpvoteList?.listChanged) {
                            return persistedUpvoteList
                        } else  {
                            return firestoreList
                        }
                    }
                }
            }
        }
    }
    return upvoteListState
}
