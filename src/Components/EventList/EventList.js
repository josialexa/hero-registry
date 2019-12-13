import React, {Component} from 'react'
import axios from 'axios'
import './EventList.css'

const eventSort = (a, b) => {
    return new Date(b) - new Date(a)
}

export default class EventList extends Component {
    constructor() {
        super()

        this.state = {
            events: []
        }
    }

    componentDidMount() {
        axios.get('/api/events')
            .then(res => {
                let tempEvents = res.data

                tempEvents.sort(eventSort)
                this.setState({events: tempEvents})
            })
            .catch(err => console.log('Get events:', err))
    }

    render() {
        return (
            <section id='event-list-container'>
                <header id='event-list-header'>Events</header>
                <div id='event-list'>
                    {this.state.events.map((v, i) => {
                        <EventItem key={v.id} event={v} />
                    })}
                </div>
            </section>
        )
    }
}