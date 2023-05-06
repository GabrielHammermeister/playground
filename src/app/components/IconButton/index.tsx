import Image from "next/image";
import styles from "./IconButton.module.css";
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

export default function IconButton({src, alt, size = 'medium', buttonAttributes }: {
    src: string,
    alt: string,
    size?: 'extraSmall' | 'small' | 'medium' | 'large'
    buttonAttributes?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}) {
    const sizes = {
        extraSmall: {
            height: '20px', width: '24px', padding: 0
        },
        small: {
            height: '30px', width: '30px'
        },
        medium: {
            height: '32px', width: '32px'
        },
        large: {
            height: '36px', width: '36px'
        }
    }

    return (
        <button className={styles.button} style={sizes[size]} {...buttonAttributes} >
            <Image src={src} alt={alt} className={styles.image}/>
        </button>
    );
}