import React from 'react'
import './HeroItem.css'

export default function HeroItem(props) {
    let classCount = {
        'S': 0,
        'A': props.counts.S,
        'B': props.counts.S + props.counts.A,
        'C': props.counts.S + props.counts.A + props.counts.B
    }
    
    // console.log(classCount)
    return (
        <div className='hero-item'>
            <div className='hero-image-container'>
                <img src={props.hero.picUrl} alt='Hero Portrait' className='hero-image' />
            </div>
            <div className='hero-info-container'>
                <div className='hero-name-container'>
                    <span>{props.hero.name}</span>
                </div>
                <div className='hero-heroname-container'>
                    <span>{props.hero.heroName}</span>
                </div>
                <div className='hero-heroclass-rank-container'>
                    <span className={`hero-hero-class ${props.hero.heroClass}`}>{props.hero.heroClass}</span>
                    <span className='hero-rank'>{props.rank - classCount[props.hero.heroClass]}</span>
                </div>
            </div>
        </div>
    )
}