import * as spaceObjects from "./space_objects.js"
import * as hud from "./hud.js"


var jsAssembly = new spaceObjects.USSAssembly("JS Assembly")
var spaceBattles = {
    europaA1: new spaceObjects.spaceBattle("Europa A1", 6)
}
const spaceBattles_as_text = "    " + Object.keys(spaceBattles).join("\n    ")


// Add to global scope
globalThis.jsAssembly = jsAssembly
globalThis.spaceBattles = spaceBattles
for (const key in spaceBattles)
    globalThis[key] = spaceBattles[key]
globalThis.firstPage = hud.Lexicon.firstPage
globalThis.lastPage = hud.Lexicon.lastPage
globalThis.nextPage = hud.Lexicon.nextPage
globalThis.prevPage = hud.Lexicon.prevPage
globalThis.currentPage = hud.Lexicon.currentPage
globalThis.toPage = hud.Lexicon.toPage
globalThis.searchLexicon = hud.Lexicon.search


console.log(`
Welcome to Space!

Your mission is to defend the your planet from space invaders.
Your ship is the jsAssembly, and these are the available 
space battles:
${spaceBattles_as_text}

You can enter a space battle with:
    jsAssembly.enterSpaceBattle()
`)

console.log(`Try:
jsAssembly.enterSpaceBattle(europaA1)
`)
