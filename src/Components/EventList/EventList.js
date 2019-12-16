import React, {Component} from 'react'
import axios from 'axios'
import EventItem from '../EventItem/EventItem'
import EventDetail from '../EventDetail/EventDetail'
import './EventList.css'

const eventSort = (a, b) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let date1 = a.date.split('-')
    let date2 = b.date.split('-')
    return new Date(+date2[2], months.indexOf(date2[1]), +date2[0]) - new Date(+date1[2], months.indexOf(date1[1]), +date1[0])
}

export default class EventList extends Component {
    constructor() {
        super()

        this.state = {
            events: [],
            showModal: false,
            shownEvent: {}
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

    addEvent = () => {
        //open form
    }

    openEvent = (event) => {
        //open event detail
        console.log(event)
        this.setState({
            showModal: true,
            shownEvent: event
        })
    }

    closeEvent = () => {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <section id='event-list-container'>
                <header id='event-list-header'>Events</header>
                <div id='event-list'>
                    {this.state.events.map((v, i) => {
                        return <EventItem key={v.id} event={v} onClick={() => this.openEvent(v)} />
                    })}
                </div>
                <div id='event-controls'>
                    <button onClick={this.addEvent} id='event-control-button'>Add an event</button>
                </div>
                <EventDetail shown={this.state.showModal} close={this.closeEvent} event={this.state.shownEvent} />
            </section>
        )
    }
}