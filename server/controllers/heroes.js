let heroes = require('../../heroes.json')
let curID = Math.max(...heroes.map(v => v.id)) + 1

module.exports = {
    heroCreate: (req, res) => {
        const {name, heroName, points, heroClass, position, picUrl} = req.body
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
        res.status(200).json(heroes)
    },

    heroUpdate: (req, res) => {
        const index = heroes.findIndex(v => v.id == req.params.id)
        if(index == -1) {
            res.status(500).json('Hero not found!')
        } else {
            const {name, heroName, points, heroClass, position, picUrl} = req.body
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