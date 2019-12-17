import React, {Component} from 'react'
import axios from 'axios'
import HeroItem from '../HeroItem/HeroItem'
import HeroDetail from '../HeroDetail/HeroDetail'
import HeroForm from '../HeroForm/HeroForm'
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
            showModal: false,
            loadingIndex: 0
        }
    }

    componentDidMount() {
        axios.get(`/api/heroes?startIndex=${this.state.loadingIndex}&numToGet=20`)
            .then(res => {
                let temp = res.data
                temp.sort(heroSort)

                this.setState({
                    heroes: temp,
                    loadingIndex: 20
                })
            })
            .catch(err => console.log('Get heroes:', err))
        document.getElementById('hero-list').scrollTop = 0
    }

    trackScrolling = (e) => {
        if(e.target.scrollTop >= e.target.scrollTopMax) {
            axios.get(`/api/heroes?startIndex=${this.state.loadingIndex}&numToGet=20`)
            .then(res => {
                let temp = res.data
                temp.sort(heroSort)

                this.setState({
                    heroes: [...this.state.heroes, ...temp],
                    loadingIndex: this.state.loadingIndex + 20
                })
            })
            .catch(err => console.log('Get heroes:', err))
        }
    }

    addHero = () => {
        //open form
    }

    openHero = (hero, overallRank, adjusts) => {
        //open hero detail
        // console.log(hero, overallRank)
        hero.rank = overallRank - adjusts[hero.heroClass]
        this.setState({
            shownHero: hero,
            showModal: true,
            showForm: false
        })
    }

    closeHero = () => {
        this.setState({
            showModal: false
        })
    }

    openForm = (hero = {}) => {
        // console.log('called', hero)
        this.setState({
            shownHero: hero,
            showForm: true,
            showModal: false
        })
    }

    closeForm = () => {
        this.setState({
            showForm: false
        })
    }

    formAction = (hero, action) => {
        if(!hero.id) {
            axios.post('/api/heroes', hero)
                .then(res => this.setState({
                    heroes: res.data,
                    showForm: false
                }))
                .catch(err => console.log('Post hero: ', err))
        } else {
            console.log('putting!')
            axios.put(`/api/heroes/${hero.id}`, hero)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                    heroes: res.data,
                    showForm: false
                })})
                .catch(err => console.log('Put hero: ', err))
        }
    }

    delete = (id) => {
        axios.delete(`/api/heroes/${id}`)
            .then(res => {
                this.setState({
                    heroes: res.data,
                    showModal: false
                })
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
                <div id='hero-list' onScroll={e => this.trackScrolling(e)}>
                    {this.state.heroes.map((v, i) => <HeroItem key={v.id} hero={v} rank={i + 1 - adjusts[v.heroClass]} onClick={() => this.openHero(v, i + 1, adjusts)} />)}
                </div>
                <div id='hero-controls'>
                    <button onClick={this.openForm} className='hero-control-button'>Add a hero</button>
                </div>
                <HeroDetail hero={this.state.shownHero} hidden={this.state.showModal} closeHero={this.closeHero} openForm={this.openForm} delete={this.delete} />
                <HeroForm action={this.state.shownHero == {} ? 'post' : 'put'} hero={this.state.shownHero} shown={this.state.showForm} cancel={this.closeForm} submit={this.formAction} />
            </section>
        )
    }
}