import React from 'react'
import './HeroItem.css'

export default function HeroItem(props) {
    // console.log(classCount)
    return (
        <div className='hero-item' onClick={props.onClick}>
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
                    <span className='hero-rank'>{props.rank}</span>
                </div>
            </div>
        </div>
    )
}