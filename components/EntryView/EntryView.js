'use client'
import styles from './EntryView.module.css'
import { motion, useAnimation } from 'framer-motion'
import { animateTextChange } from '@/utils/animateTextChange';
import { ResizeObserver } from '@juggle/resize-observer';
import { useEffect, useState } from 'react'


export default function EntryView({ english, loaded }) {

    const [screenWidth, setWidth] = useState(1500)

    const ro = new ResizeObserver((entries, observer) => {
        entries.forEach((entry) => {
            const { inlineSize: width } = entry.contentBoxSize[0];
            setWidth(width)
          });
      });
    
    // ro.observe(document.body); // Watch dimension changes on body

    const texts = {
        line_english: `Urban development projects in Helsinki, Turku, Jyväskylä and Hämeenlinna`,

        line_finnish: `Kaupunkikehityskohteita Helsingissä, Turussa, Jyväskylässä ja Hämeenlinnassa.`,
        story_english: `Sepos Oy is a company founded in 2014 and owned by Timo Everi, Ilkka Kilpimaa 
        and NasdaqOMX Helsinki listed Taaleri Sijoitus Oy. The Company's field of activity is real estate development
         and investing in companies operating in the active lifestyle value chain.`,
        
        story_finnish: `Sepos Oy on vuonna 2014 perustettu Timo Everin, Ilkka Kilpimaan 
        ja NasdaqOMX listatun Taaleri Oyj:n omistama yritys, jonka toimialana on kiinteistökehitys 
        ja sijoittaminen aktiivisen elämäntavan arvoketjussa toimiviin yrityksiin.`

    }


    // Resizing does not update the image src with the srcSet, so this solves that problem
    // And thats a problem since the picture completely changes aspect ratio wise under 600px
    // Going from small to big there is no problem but big to small it would not work otherwise
    const getImage = () => {
        if (screenWidth < 799) {
            return (
                <picture 
                // onLoad={() => showMainPage(true)}
                id="entry-image"
                alt="wide-project-img"
                className={styles.entry_image}>
                    {/* <source srcSet={mobile} type="image/webp"></source> */}
                    <img className={styles.entry_image} src={"https://ik.imagekit.io/s93qwyistj0/pics-highres/mobile_NEZxhQrnTd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653668422915"} 
                    alt="wide-project-img"></img>
                </picture>
            )
        } 
        return (
            <picture 
            // onLoad={() => showMainPage(true)}
            id="entry-image"
            alt="wide-project-img"
            className={styles.entry_image}>
                {/* <source srcSet={desktop} type="image/webp"></source> */}
                <img className={styles.entry_image} src={"https://ik.imagekit.io/s93qwyistj0/pics-highres/desktop_-um8M8xUPd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653668423308"} 
                alt="wide-project-img"></img>
            </picture>
        )
    }

    
    const controls = useAnimation()
    const controls2 = useAnimation()

    useEffect(() => {
        controls.start({
            opacity: [0, 1],
            transition: { duration: 2}
        })
        controls2.start({
            opacity: [0, 1],
            transition: { duration: 3.5}
        })
    }, [loaded])

    return (
        <div className={styles.entry_view_outer_container}>
            {getImage()}
            <div className={styles.entry_view_inner_container}>
                <motion.div className={styles.line} animate={controls2}>
                    { animateTextChange('', english, texts.line_english, texts.line_finnish)}
                </motion.div>  
                <motion.div className={styles.description} animate={controls2}>
                    { animateTextChange('', english, texts.story_english, texts.story_finnish)}
                </motion.div>  
            </div>
        </div>
    )   
}