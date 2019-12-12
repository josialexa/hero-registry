let events = require('./events.json')
const fs = require('fs')

let temp = events.map(v => {
    if(v.eventClass == 'Tiger') v.points = 100 + v.deaths + (v.injuries / 2)
    if(v.eventClass == 'Demon') v.points = 1000 + v.deaths + (v.injuries / 2)
    if(v.eventClass == 'Dragon') v.points = 10000 + v.deaths + (v.injuries / 2)
    if(v.eventClass == 'God') v.points = 100000 + v.deaths + (v.injuries / 2)

    let heroNum = Math.floor(Math.random() * 29) + 1;
    let heroes = []

    for(let i = 0; i < heroNum; i++) {
        heroes.push(Math.floor(Math.random() * 1001) + 2)
    }

    v.heroes = heroes
    return v
})

fs.writeFile('newEvents.json', JSON.stringify(temp), err => {
    if(err) {
        console.log(err)
    } else {
        console.log('it worked')
    }
})