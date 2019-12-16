import React, {Component} from 'react'
import axios from 'axios'
import './EventDetail.css'

export default class EventDetail extends Component {
    constructor() {
        super()

        this.state = {
            heroes: []
        }
    }

    updateHeroes = (event) => {
        axios.get(`/api/heroes?ids=${this.props.event.heroes.toString()}`)
        .then(res => this.setState({heroes: res.data}))
        .catch(err => console.log('Get event heroes:', err))
    }

    componentDidUpdate(prevProps) {
        if(prevProps.event.id != this.props.event.id) {
            this.updateHeroes(this.props.event)
        }
    }

    render() {
        return (
            <section className={`event-details-container ${this.props.shown ? 'show' : 'hide'}`}>
                <div className='event-details'>
                <div className='event-controls'><span onClick={this.props.close}>X</span></div>
                    <div className='event-details-info-container'>
                        <div className='event-details-event-date'>
                            <span className='bold'>Date: </span><span className='event-date'>{this.props.event.date}</span>
                        </div>
                        <div className='event-details-event-location'>
                            <span className='bold'>Location: </span><span className='event-location'>{this.props.event.location}</span>
                        </div>
                        <div className='event-details-event-event-class'>
                            <span className='bold'>Class: </span><span className='event-event-class'>{this.props.event.eventClass}</span>
                        </div>
                        <div className='event-details-event-injuries'>
                            <span className='bold'>Injuries: </span><span className='event-injuries'>{this.props.event.injuries}</span>
                        </div>
                        <div className='event-details-event-deaths'>
                            <span className='bold'>Deaths: </span><span className='event-deaths'>{this.props.event.deaths}</span>
                        </div>
                        <div className='event-details-event-points'>
                            <span className='bold'>Base points: </span><span className='event-points'>{this.props.event.points}</span>
                        </div>
                        <span className='bold'>Heroes:</span>
                        <div className='event-details-event-heroes-list'>
                            {this.state.heroes.map(v => {
                                return (
                                    <div className='event-details-event-heroes-item' key={v.id}>
                                        <span className='bold'>Name: </span><span className='event-details-event-heroes-hero-name'>{v.name}</span>
                                        <span className='bold'>Hero name: </span><span className='event-details-event-heroes-hero-hero-name'>{v.heroName}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}