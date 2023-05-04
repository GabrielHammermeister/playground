import {createContext} from "react";
import {UpvoteListContextType} from "@/app/context/UpvoteList/types";


const UpvoteListContext = createContext<UpvoteListContextType>({
    upvoteListState: {
        id: '',
        listData: [],
        updatedAt: ''
    },
    dispatch: () => null
})

export default UpvoteListContext