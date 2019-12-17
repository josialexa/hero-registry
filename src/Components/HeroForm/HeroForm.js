import React, {Component} from 'react'
import axios from 'axios'
import './HeroForm.css'


export default class HeroForm extends Component {
    constructor(props) {
        super(props)

        console.log('props here', this.props)

        this.state = {
            id: props.hero.id || '',
            name: props.hero.name || '',
            heroName: props.hero.heroName || '',
            heroClass: props.hero.heroClass || '',
            picUrl: props.hero.picUrl || '',
            action: 'post'
        }
    }

    handleChange = (e, item) => {
        let updated = {}
        updated[item] =  e.target.value
        this.setState(updated)
    }

    submit = () => {
        let hero = {...this.state}
        // let action = this.props.hero.name ? 'put' : 'post'
        console.log(this.state.action)

        this.props.submit(hero, this.props.action)
        this.setState({
            id: 0,
            name: '',
            heroName: '',
            heroClass: '',
            picUrl: '',
            action: 'post'
        })
    }

    update = (props) => {
        let action = props.hero.name == '' ? 'post' : 'put'
        this.setState({
            id: props.hero.id,
            name: props.hero.name,
            heroName: props.hero.heroName,
            heroClass: props.hero.heroClass,
            picUrl: props.hero.picUrl
            
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.hero != this.props.hero) {
            console.log('editing hero!', prevProps, this.props)
            this.update(this.props)
        }
    }

    render() {
        return (
            <section className={`hero-form-container ${this.props.shown ? 'show' : 'hide'}`}>
                <div className='hero-form'>
                    <div className='hero-form-hero-name'>
                        <span className='bold'>Name</span>
                        <input value={this.state.name} onChange={e => this.handleChange(e, 'name')} placeholder='Name' />
                    </div>
                    <div className='hero-form-hero-hero-name'>
                        <span className='bold'>Hero Name</span>
                        <input value={this.state.heroName} onChange={e => this.handleChange(e, 'heroName')} placeholder='Hero Name' />
                    </div>
                    <div className='hero-form-hero-hero-class'>
                        <span className='bold'>Class</span>
                        <input value={this.state.heroClass} onChange={e => this.handleChange(e, 'heroClass')} placeholder='Hero Class' />
                    </div>
                    <div className='hero-form-hero-pic-url'>
                        <span className='bold'>Picture URL</span>
                        <input value={this.state.picUrl} onChange={e => this.handleChange(e, 'picUrl')} placeholder='Picture URL' />
                    </div>
                    <div className='hero-form-submit-buttons'>
                        <button onClick={() => this.submit('post')}>Submit</button>
                        <button onClick={this.props.cancel}>Cancel</button>
                    </div>
                </div>
            </section>
        )
    }
}