"use client";
import pageStyles from "./styles.module.css";
import {useEffect, useState} from "react";

const lightSequence = [
    {timeout: 5000, color: 'red'},
    {timeout: 3000, color: 'green'},
    {timeout: 1000, color: 'yellow'}
]
export default function TrafficLight() {

    const [currentLight, setCurrentLight] = useState(0);

    useEffect(() => {
        let ligthIndex = currentLight
        if(currentLight >= 3) {
            setCurrentLight(0)
            ligthIndex = 0
        }

        const light = document.getElementById(lightSequence[ligthIndex].color)
        light && light.classList.add('lightOn')

        const timeout = setTimeout(() => {
            setCurrentLight(prev => prev + 1)
            light && light.classList.remove('lightOn')
        }, lightSequence[ligthIndex].timeout)

        return () => {
            window.clearTimeout(timeout)
        }
    }, [currentLight]);

    return (
        <>
            <h1>
                TRAFFIC LIGHT
            </h1>
            <div className={pageStyles.lightsContainer}>
                <div id={"red"} className={`${pageStyles.light} ${pageStyles.red}`}/>
                <div id={"yellow"} className={`${pageStyles.light} ${pageStyles.yellow}`}/>
                <div id={"green"} className={`${pageStyles.light} ${pageStyles.green}`}/>
            </div>
            <div className={pageStyles.flexContainer1}>
                <div className={pageStyles.triangle1}/>
                <div className={pageStyles.triangle2}/>
            </div>
            <div className={pageStyles.flexContainer2}>
                <div className={pageStyles.triangle1}/>
                <div className={pageStyles.triangle2}/>
            </div>
            <div className={pageStyles.flexContainer3}>
                <div className={pageStyles.triangle1}/>
                <div className={pageStyles.triangle2}/>
            </div>
            <div className={pageStyles.base}/>
            <div className={pageStyles.pole}/>

        </>
    );
}