import {createContext} from "react";
import {UpvoteListContextType} from "@/app/context/UpvoteList/types";


const UpvoteListContext = createContext<UpvoteListContextType>({
    listDataState: [],
    dispatch: () => null
})

export default UpvoteListContext