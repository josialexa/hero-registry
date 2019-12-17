import React, {Component} from 'react'
import './EventForm.css'

export default class EventForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            location: '',
            date: '',
            eventClass: '',
            injuries: 0,
            deaths: 0,
            action: 'post'
        }
    }

    handleChange = (e, item) => {
        let updated = {}
        updated[item] = e.target.value
        this.setState(updated)
    }

    submit = () => {
        let event = {...this.state}
        // let action = this.props.event ? 'put' : 'post'
        this.props.submit(event, this.props.action)
        this.setState({
            location: '',
            date: '',
            eventClass: '',
            injuries: 0,
            deaths: 0,
            heroes: [{}]
        })
    }

    update = (props) => {
        let action = props.event.location == '' ? 'post' : 'put'
        this.setState({
            location: props.event.location, 
            date: props.event.date,
            eventClass: props.event.eventClass,
            injuries: props.event.injuries,
            deaths: props.event.deaths,
            action: action
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.event != this.props.event) {
            this.update(this.props)
        }
    }

    render() {
        return (
            <section className={`event-form-container ${this.props.shown ? 'show' : 'hide'}`}>
                <div className='event-form'>
                    <div className='event-form-location'>
                        <span className='bold'>Location: </span>
                        <input value={this.state.location} onChange={e => this.handleChange(e, 'location')} placeholder='Location' />    
                    </div>
                    <div className='event-form-date'>
                        <span className='bold'>Date: </span>
                        <input value={this.state.date} onChange={e => this.handleChange(e, 'date')} placeholder='Date' />    
                    </div>
                    <div className='event-form-event-class'>
                        <span className='bold'>Event Class: </span>
                        <input value={this.state.eventClass} onChange={e => this.handleChange(e, 'eventClass')} placeholder='Event Class' />    
                    </div>
                    <div className='event-form-injuries'>
                        <span className='bold'>Injuries: </span>
                        <input value={this.state.injuries} onChange={e => this.handleChange(e, 'injuries')} placeholder='Injuries' />    
                    </div>
                    <div className='event-form-deaths'>
                        <span className='bold'>Deaths: </span>
                        <input value={this.state.Deaths} onChange={e => this.handleChange(e, 'deaths')} placeholder='deaths' />    
                    </div>
                    <div className='event-form-controls'>
                        <button className='event-form-button' onClick={this.submit} >Submit</button>
                        <button className='event-form-button' onClick={this.cancel} >Cancel</button>
                    </div>
                </div>
            </section>
        )
    }
}