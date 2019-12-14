import React, {Component} from 'react'
import HeroItem from '../HeroItem/HeroItem'
import axios from 'axios'
import './HeroList.css'

const heroSort = (a, b) => {
    return b.points - a.points
}

export default class HeroList extends Component {
    constructor() {
        super()

        this.state = {
            heroes: []
        }
    }

    componentDidMount() {
        axios.get('/api/heroes')
            .then(res => {
                let temp = res.data
                temp.sort(heroSort)

                this.setState({heroes: temp})
            })
            .catch(err => console.log('Get heroes:', err))
    }

    addHero = () => {
        //open form
    }

    openHero = () => {
        //open hero detail
    }

    render() {
        const counts = {
            //maybe see if there's a way to move this to the back end
            S: this.state.heroes.filter(v => v.heroClass == 'S').length,
            A: this.state.heroes.filter(v => v.heroClass == 'A').length,
            B: this.state.heroes.filter(v => v.heroClass == 'B').length,
            C: this.state.heroes.filter(v => v.heroClass == 'C').length,
        }

        return (
            <section id='hero-list-container'>
                <header id='hero-list-header'>Heroes</header>
                <div id='hero-list'>
                    {this.state.heroes.map((v, i) => <HeroItem key={v.id} hero={v} counts={counts} rank={i + 1} />)}
                </div>
                <div id='hero-controls'>
                    <button onClick={this.addHero} className='hero-control-button'>Add a hero</button>
                </div>
            </section>
        )
    }
}