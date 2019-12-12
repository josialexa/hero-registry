const fs = require('fs')
let events = require('../../events.json')
let curID = Math.max(...events.map(v => v.id)) + 1
let heroes = require('../../heroes.json')

const calcPoints = (event) => {
    const level = {
        Tiger: 1,
        Demon: 2,
        Dragon: 3,
        God: 4
    }

    event.points = (100 ** level[event.evenClass]) + event.deaths + (event.injuries / 2)
    return event
}

const updateHeroPoints = (heroID, event, oldPoints = 0) => {
    let index = heroes.findIndex(v => v.id == heroID)
    let classPoints = {
        S: 1,
        A: 2,
        B: 3,
        C: 4
    }

    let newPoints = event.points / ((2**classPoints[heroes[index].heroClass]) * event.heroes.length) - (oldPoints / (2**classPoints[heroes[index].heroClass]) * event.heroes.length)
    heroes[index].points += newPoints
}

module.exports = {
    eventCreate: (req, res) => {
        let {location, date, eventClass, deaths, injuries, heroes} = req.body
        let temp = {
            id: curID,
            location,
            date,
            eventClass,
            deaths,
            injuries,
            heroes
        }

        let newEvent = calcPoints(temp)
        events.push(newEvent)
        curID++

        for(let i = 0; i < heroes.length; i++) {
            updateHeroPoints(heroes[i], newEvent)
        }

        res.status(200).json({
            events,
            heroes
        })
    },

    eventRead: (req, res) => {
        res.status(200).json(events)
    },

    eventUpdate: (req, res) => {
        let index = events.findIndex(v => v.id == req.params.id)
        
        if(index == -1) {
            res.status(500).json('Event not found!')
        } else {
            const oldPoints = events[index].points
    
            const {location, date, eventClass, deaths, injuries, heroes} = req.body
    
            let temp = {
                id: req.params.id,
                location, 
                date, 
                eventClass,
                deaths,
                injuries,
                heroes
            }

            let newEvent = calcPoints(newEvent)
            events[index] = newEvent

            for(let i = 0; i < heroes.length; i++) {
                updateHeroPoints(heroes[i], newEvent, oldPoints)
            }
    
            res.status(200).json({
                events,
                heroes
            })
        }
    },

    eventDelete: (req, res) => {
        const index = events.findIndex(v => v.id == req.params.id)

        if(index == -1) {
            res.status(500).json('Event not found!')
        } else {
            events.splice(index, 1)

            res.status(200).send(events)
        }
    }
}