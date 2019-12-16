import React, {Component} from 'react'
import axios from 'axios'
import HeroItem from '../HeroItem/HeroItem'
import HeroDetail from '../HeroDetail/HeroDetail'
import './HeroList.css'

const heroSort = (a, b) => {
    return b.points - a.points
}

export default class HeroList extends Component {
    constructor() {
        super()

        this.state = {
            heroes: [],
            shownHero: {
                picUrl: '',
                name: '',
                heroName: '',
                heroClass: '',
                points: '',
                id: 0
            },
            showModal: false
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

    openHero = (hero, overallRank, adjusts) => {
        //open hero detail
        console.log(hero, overallRank)
        hero.rank = overallRank - adjusts[hero.heroClass]
        this.setState({
            shownHero: hero,
            showModal: true
        })
    }

    closeHero = () => {
        this.setState({
            showModal: false
        })
    }

    render() {
        const counts = {
            //maybe see if there's a way to move this to the back end
            S: this.state.heroes.filter(v => v.heroClass == 'S').length,
            A: this.state.heroes.filter(v => v.heroClass == 'A').length,
            B: this.state.heroes.filter(v => v.heroClass == 'B').length,
            C: this.state.heroes.filter(v => v.heroClass == 'C').length,
        }

        const adjusts = {
            S: 0,
            A: counts.S,
            B: counts.S + counts.A,
            C: counts.S + counts.A + counts.B
        }

        return (
            <section id='hero-list-container'>
                <header id='hero-list-header'>Heroes</header>
                <div id='hero-list'>
                    {this.state.heroes.map((v, i) => <HeroItem key={v.id} hero={v} rank={i + 1 - adjusts[v.heroClass]} onClick={() => this.openHero(v, i + 1, adjusts)} />)}
                </div>
                <div id='hero-controls'>
                    <button onClick={this.addHero} className='hero-control-button'>Add a hero</button>
                </div>
                <HeroDetail hero={this.state.shownHero} hidden={this.state.showModal} closeHero={this.closeHero} />
            </section>
        )
    }
}