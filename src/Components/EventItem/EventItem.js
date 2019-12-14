import React from 'react'
import './EventItem.css'

export default function EventItem(props) {
    return (
        <div className='event-item'>
            <div className='event-item-location-container'>
                <span className='bold'>Location: </span><span className='event-item-location'>{props.event.location}</span>
            </div>
            <div className='event-item-date-container'>
                <span className='bold'>Date: </span><span className='event-item-date'>{props.event.date}</span>
            </div>
            <div className='event-item-event-class-container'>
                <span className='bold'>Class: </span><span className={`event-item-event-class ${props.event.eventClass}`} >{props.event.eventClass}</span>
            </div>
        </div>
    )
}