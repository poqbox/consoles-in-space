import * as AstronomicalBodies from "./astronomical_bodies.js"
import * as Utils from "./utils.js"


class ship {
    #name
    #hull
    #firepower
    #accuracy
    #battle = undefined

    constructor(name, hull, firepower, accuracy) {
        this.#name = name
        this.#hull = hull
        this.#firepower = firepower
        this.#accuracy = accuracy
    }

    get name() {return this.#name}
    get hull() {return this.#hull}
    get firepower() {return this.#firepower}
    get accuracy() {return this.#accuracy}
    get battle() {return this.#battle}
    takeHullDamage(damage) {
        this.#hull -= damage
        if (this.#hull < 0) {
            this.#hull = 0
        }
    }
    attack(ship) {
        const result = {
            attacking_ship: this,
            defending_ship: ship,
            hit: false,
            damage_dealt: undefined
        }
        if (Math.random() <= this.#accuracy) {
            ship.takeHullDamage(this.#firepower)
            result.hit = true
            result.damage_dealt = this.#firepower
        }
        return result
    }
    retreat(spaceBattle) {
        spaceBattle.retreat(this)
    }
    enterSpaceBattle(spaceBattle) {
        spaceBattle.enter(this)
        this.#battle = spaceBattle
    }
}


class player extends ship {
    constructor(name="USS Assembly") {
        super(name, 20, 5, 0.7)
    }
}


class alienShip extends ship {
    constructor(name) {
        super(name, Utils.randomBetweenRange(3, 6), Utils.randomBetweenRange(2, 4), Utils.randomBetweenRange(0.6, 0.8, 1))
    }
}


class spaceBattle {
    #name
    #enemy_ships = []
    #player = undefined

    constructor(name, numAlienShips=1) {
        this.#name = name
        for (let i=1; i <= numAlienShips; i++) {
            this.#enemy_ships.push(new alienShip(`Alien Ship ${i}`))
        }
    }

    get name() {
        return this.#name
    }
    get enemy_ships() {return this.#enemy_ships}

    #enemyAttack(ship) {
        const enemyTurnResults = ship.attack(this.#player)
        if (enemyTurnResults.hit)
            console.log(`> ${ship.name} hits ${this.#player.name} for ${enemyTurnResults.damage_dealt} damage!`)
        else
            console.log(`> ${ship.name} misses!`)
        if (this.#player.hull === 0) {
            console.log(`> ${this.#player.name} has fallen!`)
            this.#player = undefined
            if (!this.#player) {
                console.log("You have lost the battle.")
            }
        }
    }
    getEnemyInfo() {
        const ship = this.#enemy_ships[0]
        let data = `
> The ${ship.name} comes to face you.\n
  Your ship's sensors tell you that:
    It's hull has ${ship.hull} hitpoints
    It's firepower is ${ship.firepower}
    It's accuracy is ${ship.accuracy}

Start a turn with <enter_ship>.battle.attack()`

        return data
    }

    enter(player) {
        this.#player = player
        console.log(`> There are ${this.#enemy_ships.length} enemy ships.${this.getEnemyInfo()}`)
    }
    attack() {
        if (!this.#player)
            return new Error("> No player has entered this battle.")
        else if (this.#enemy_ships.length === 0) {
            console.log("There are no enemy ships in this battle.")
        }
        else {
            const ship = this.#enemy_ships[0]
            console.log(`> Round begins!\n\n  Your opponent:\n    ${ship.name}\n      hull: ${ship.hull}\n      firepower: ${ship.firepower}\n      accuracy: ${ship.accuracy}`)
            const playerTurnResults = this.#player.attack(ship)
            if (playerTurnResults.hit)
                console.log(`> ${this.#player.name} hits ${ship.name} for ${playerTurnResults.damage_dealt} damage!`)
            else
                console.log(`> ${this.#player.name} misses!`)
            if (ship.hull !== 0) {
                this.#enemyAttack(ship)
                console.log(`> Round has ended.\n\n    ${this.#player.name} survives with ${this.#player.hull} hitpoints.\n    ${ship.name} survives with ${ship.hull} hitpoints.`)
            }
            else {
                this.#enemy_ships.shift()
                console.log(`> ${ship.name} has fallen!\n> Round has ended.\n\n    ${this.#player.name} survives with ${this.#player.hull} hitpoints.`)
                if (this.#enemy_ships.length > 0) {
                    console.log(`> There are ${this.#enemy_ships.length} enemy ships.${this.getEnemyInfo()}`)
                }
                else {
                    console.log(`You have won the battle!\nYou are now leaving ${this.name}.\n    Where to next?`)
                }
            }
        }
    }
    retreat() {
        this.#player = undefined
        console.log(`> ${ship.name} has retreated.`)
    }
}




export {player as USSAssembly, alienShip, spaceBattle}
