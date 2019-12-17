import React, {Component} from 'react'
import axios from 'axios'
import EventItem from '../EventItem/EventItem'
import EventDetail from '../EventDetail/EventDetail'
import EventForm from '../EventForm/EventForm'
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
            showForm: false,
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
    
    openForm = (event = {}) => {
        // console.log('called', hero)
        this.setState({
            shownEvent: event,
            showForm: true,
            showModal: false
        })
    }

    closeForm = () => {
        this.setState({
            showForm: false
        })
    }

    formAction = (event, action) => {
        console.log('event logging:', event)
        if(!event.id) {
            axios.post('/api/events', event)
                .then(res => this.setState({
                    events: res.data,
                    showForm: false
                }))
                .catch(err => console.log('Post event: ', err))
        } else {
            console.log('putting!')
            axios.put(`/api/events/${event.id}`, event)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                    events: res.data,
                    showForm: false
                })})
                .catch(err => console.log('Put hero: ', err))
        }
    }

    delete = (id) => {
        axios.delete(`/api/events/${id}`)
            .then(res => {
                this.setState({
                    events: res.data,
                    showModal: false
                })
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
                    <button onClick={this.openForm} id='event-control-button'>Add an event</button>
                </div>
                <EventDetail shown={this.state.showModal} close={this.closeEvent} event={this.state.shownEvent} />
                <EventForm action={this.shownEvent == {} ? 'post' : 'put'} event={this.state.shownEvent} shown={this.state.showForm} cancel={this.closeForm} submit={this.formAction} />
            </section>
        )
    }
}