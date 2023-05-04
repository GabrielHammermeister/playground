import styles from "./UpvoteList.module.css";
import ListItem from "@/app/components/List/ListItem/ListItem";
import {UpvoteListItemType} from "@/app/models/UpvoteList";


export function UpvoteList({ data = []}: {
    data?: UpvoteListItemType[]
}) {
    return (
        <ul className={styles.list}>
            {
                data.map((item, index) => (
                    <ListItem item={item} key={index}/>
                ))
            }
        </ul>
    );
}