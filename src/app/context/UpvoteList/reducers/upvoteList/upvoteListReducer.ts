import {UpvoteList, UpvoteListItemType} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";

function findListItemIndex(listData: UpvoteListItemType[], id: string) {
    return listData?.findIndex(value => value.id === id)
}

function sortUpvoteList(listData: UpvoteListItemType[]) {
    return listData.sort((a, b) => {
        if(a.votes > b.votes) return - 1
        else return 0
    })
}
export default function upvoteListReducer(upvoteListState: UpvoteList, action: Action): UpvoteList {
    switch (action.type) {
        case "hydrate": {
            return action.payload
        }
        case 'upvote': {
            const { listData } = upvoteListState

            const foundIndex = findListItemIndex(listData, action.payload.id)
            listData[foundIndex].votes += 1
            return {
                ...upvoteListState,
                listData: sortUpvoteList(listData),
            }
        }
        case 'downvote': {
            const {listData} = upvoteListState

            const foundIndex = findListItemIndex(listData, action.payload.id)
            if(listData[foundIndex].votes > 0) {
                listData[foundIndex].votes -= 1
                return {
                    ...upvoteListState,
                    listData: sortUpvoteList(listData),
                }
            }
            return upvoteListState
        }
        case 'add-item': {
            return {
                ...upvoteListState,
                listData: [...upvoteListState.listData, action.payload],
            }
        }
        default: {
            // @ts-ignore
            throw Error('Unknown action: ' + action.type);
        }
    }
}