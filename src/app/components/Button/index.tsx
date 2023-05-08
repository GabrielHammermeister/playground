import styles from "./styles.module.css";
import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";

// noinspection JSUnusedLocalSymbols
export default function Button({variant = 'tertiary', children, buttonAttributes }: {
    variant?: 'tertiary',
    children: ReactNode,
    buttonAttributes?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}) {
    return <button className={styles.buttonTertiary} {...buttonAttributes}>
        {children}
    </button>;
}