import Image from "next/image";
import styles from "./IconButton.module.css";
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

export default function IconButton({src, alt, size = 'medium', buttonAttributes }: {
    src: string,
    alt: string,
    size?: 'small' | 'medium' | 'large'
    buttonAttributes?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}) {
    const sizes = {
        small: {
            height: '20px', width: '24px'
        },
        medium: {
            height: '24px', width: '24px'
        },
        large: {
            height: '30px', width: '30px'
        }
    }

    return (
        <button className={styles.button} style={sizes[size]} {...buttonAttributes} >
            <Image src={src} alt={alt} className={styles.image}/>
        </button>
    );
}