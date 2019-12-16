let heroes = require('../../heroes.json')
let curID = Math.max(...heroes.map(v => v.id)) + 1
const heroSort = (a, b) => {
    return b.points - a.points
}

module.exports = {
    heroCreate: (req, res) => {
        const {name, heroName, heroClass, position, picUrl} = req.body

        let points = 0;
        if(heroClass == 'B') points = 1001
        if(heroClass == 'A') points = 5001
        if(heroClass == 'S') points = 15001

        let newHero = {
            id: curID,
            name,
            heroName,
            points,
            heroClass,
            position,
            picUrl
        }

        heroes.push(newHero)
        curID++

        res.status(200).json(heroes)
    },

    heroRead: (req, res) => {
        heroes.sort(heroSort)
        if(req.query.ids) {
            const ids = req.query.ids.split(',').map(v => +v)
            const temp = heroes.filter(v => ids.includes(v.id)).map(v => {return {id: v.id, name: v.name, heroName: v.heroName}})
            res.status(200).json(temp)
        } else if(req.query.startIndex && req.query.numToGet) {
            // const index = heroes.findIndex(v => v.id == req.query.startID)
            // console.log(index)
            const next = heroes.slice(+req.query.startIndex, +req.query.numToGet + (+req.query.startIndex))

            res.status(200).json(next)
        } else {
            res.status(200).json(heroes)
        }
    },

    heroUpdate: (req, res) => {
        const index = heroes.findIndex(v => v.id == req.params.id)
        if(index == -1) {
            res.status(500).json('Hero not found!')
        } else {
            const {name, heroName, heroClass, points, position, picUrl} = req.body

            let updatedHero = {
                id: req.params.id,
                name,
                heroName,
                points,
                heroClass,
                position,
                picUrl
            }

            // heroes.splice(index, 1, updatedHero)
            heroes[index] = updatedHero
            res.status(200).json(heroes)
        }
    },

    heroDelete: (req, res) => {
        const index = heroes.findIndex(v => v.id == req.params.id)

        if(index == -1) {
            res.status(500).json('Hero not found!')
        } else {
            heroes.splice(index, 1)

            res.status(200).json(heroes)
        }
    }
}