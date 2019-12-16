import React, {Component} from 'react'
import axios from 'axios'
import EventItem from '../EventItem/EventItem'
import './HeroDetail.css'
import HeroItem from '../HeroItem/HeroItem'

const eventSort = (a, b) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let date1 = a.date.split('-')
    let date2 = b.date.split('-')
    return new Date(+date2[2], months.indexOf(date2[1]), +date2[0]) - new Date(+date1[2], months.indexOf(date1[1]), +date1[0])
}

export default class HeroDetail extends Component {
    constructor() {
        super()

        this.state = {
            events: []
        }
    }

    // componentDidMount() {
    //     axios.get(`/api/events?hero=${this.props.hero.id}`)
    //         .then(res => {
    //             let results = res.data
    //             results.sort(eventSort)
    //             this.setState({events: results})
    //         })
    //         .catch(err => console.log('Get hero events:', err))
    // }

    updateEvents = (hero) => {
        axios.get(`/api/events?hero=${hero.id}`)
        .then(res => {
            let results = res.data
            // console.log(results)
            results.sort(eventSort)
            this.setState({events: results})
        })
        .catch(err => console.log('Get hero events:', err))
    }

    componentDidUpdate(prevProps) {
        if(prevProps.hero != this.props.hero) {
            // console.log('hero changed!', this.props.hero)
            this.updateEvents(this.props.hero)
        }
    }

    render() {
        return (
            <section className={`hero-detail-container ${this.props.hidden ? 'show' : 'hide'}`}>
                <div className='hero-detail'>
                    <div className='hero-detail-control'><span onClick={this.props.closeHero}>X</span></div>
                    <div className='hero-detail-hero-photo-container'>
                        <img src={this.props.hero.picUrl} className='hero-detail-hero-photo' alt='Hero portrait' />
                    </div>
                    <div className='hero-detail-hero-info-container'>
                        <div className='hero-detail-hero-info-name'>
                            <span className='bold'>Name: </span><span className='hero-name'>{this.props.hero.name}</span>
                        </div>
                        <div className='hero-detail-hero-info-hero-name'>
                            <span className='bold'>Hero Name: </span><span className='hero-hero-name'>{this.props.hero.heroName}</span>
                        </div>
                        <div className='hero-detail-hero-info-hero-class-rank'>
                            <span className='bold'>Rank: </span><span className='hero-hero-class'>{`${this.props.hero.heroClass}${this.props.hero.rank}`}</span>
                        </div>
                        <div className='hero-detail-hero-info-points'>
                            <span className='bold'>Overall Points: </span><span className='hero-points'>{this.props.hero.points}</span>
                        </div>
                        <span className='bold'>Events:</span>
                        <div className='hero-detail-hero-info-events'>
                            {/*events will go here in a map of event list components
                            preferably the same event list components used in the main view*/}
                            {this.state.events.map(v => <EventItem key={v.id} event={v} />)}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}