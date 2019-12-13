const fs = require('fs')
let events = require('../../events.json')
let curID = Math.max(...events.map(v => v.id)) + 1
let heroList = require('../../heroes.json')

const calcPoints = (event) => {
    let tempPoints = 0
    const level = {
        Tiger: 1,
        Demon: 2,
        Dragon: 3,
        God: 4
    }

    tempPoints = (10 ** (level[event.eventClass] + 1)) + event.deaths + (event.injuries / 2)
    event.points = tempPoints
    return event
}

const updateHeroPoints = (heroID, event, oldList = [], oldPoints = 0) => {
    let index = heroList.findIndex(v => v.id == heroID)
    let classPoints = {
        S: 1,
        A: 2,
        B: 3,
        C: 4
    }
    if(oldList.includes(heroID)) heroList[index].points -= (oldPoints / (2**classPoints[heroList[index].heroClass]) * oldList.length)
    let newPoints = event.points / ((2**classPoints[heroList[index].heroClass]) * event.heroes.length)
    heroList[index].points += newPoints

    if(heroList[index].points > 1000) heroList[index].heroClass = 'B'
    if(heroList[index].points > 5000) heroList[index].heroClass = 'A'
    if(heroList[index].points > 15000) heroList[index].heroClass = 'S'
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
            heroes: heroList
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
            const oldList = events[index].heroes
    
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

            let newEvent = calcPoints(temp)
            events[index] = newEvent

            for(let i = 0; i < heroes.length; i++) {
                updateHeroPoints(heroes[i], newEvent, oldList, oldPoints)
            }
    
            res.status(200).json({
                events,
                heroes: heroList
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