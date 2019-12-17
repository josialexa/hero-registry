let heroes = require('./heroes.json')
const fs = require('fs')

let temp = heroes.filter(v => {
    if(v.heroClass == 'S') {
        return Math.random() > .95
    }

    if(v.heroClass == 'A') {
        return Math.random() > .75
    }

    if(v.heroClass == 'B') {
        return Math.random() > .35
    }

    if(v.heroClass == 'C') {
        return true
    }
})

fs.writeFile('tempHeroes.json', JSON.stringify(temp), () => {
    console.log('ran', temp.length)
})