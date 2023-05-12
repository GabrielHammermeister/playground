import styles from './styles.module.css'
export default function ElevatedButton(props: { label: string }) {
    return <button className={styles.elevatedButton}>
        <h3>{props.label}</h3>
    </button>;
}