import * as AstronomicalBodies from "./astronomical_bodies.js"
export {Lexicon}


class Lexicon {
    static toggle() {
        lexiconEl.classList.remove("lexicon-tutorial")
        if (lexiconEl.classList.contains("opened")) {
            lexiconEl.style.top = "var(--lexicon-closed-top)"
            lexiconEl.classList.replace("opened", "closed")
        }
        else if (lexiconEl.classList.contains("closed")) {
            lexiconEl.style.top = "var(--lexicon-opened-top)"
            lexiconEl.classList.replace("closed", "opened")
        }
    }

    static firstPage() {
        Lexicon.#fillPage(0)
        current_page = 1
    }
    static lastPage() {
        Lexicon.#fillPage(entries_num - entries_num%page_entries)
        current_page = Math.floor(entries_num / page_entries)
    }
    static nextPage() {
        if (current_page < Math.ceil(entries_num / page_entries)) {
            Lexicon.#fillPage(current_page * page_entries)
            current_page++
        }
    }
    static prevPage() {
        if (current_page > 1) {
            Lexicon.#fillPage((current_page - 2) * page_entries)
            current_page--
        }
    }
    static currentPage() {
        Lexicon.#fillPage((current_page - 1) * page_entries)
        current_page--
    }
    static async search(name) {
        const pre = document.createElement("pre")
        pre.textContent = ""

        const body = Lexicon.getEntry(await AstronomicalBodies.getBodyById(name))
        for (const key in body)
            pre.textContent += `${key}: ${body[key]}\n`
        lexiconDisplayEl.innerHTML = ""
        lexiconDisplayEl.append(pre)
    }

    static getEntry(body) {
        let obj = {}
        try {obj.name = body.name}
        catch {obj.name = undefined}
        try {obj.englishName = body.englishName}
        catch {obj.englishName = undefined}
        try {obj.bodyType = body.bodyType}
        catch {obj.bodyType = undefined}
        try {obj.density = body.density}
        catch {obj.density = undefined}
        try {obj.mass = body.mass.massValue ** body.mass.massExponent}
        catch {obj.mass = undefined}
        try {obj.volume = body.vol.volValue ** body.vol.volExponent}
        catch {obj.volume = undefined}
        try {obj.meanRadius = body.meanRadius}
        catch {obj.meanRadius = undefined}
        try {obj.gravity = body.gravity}
        catch {obj.gravity = undefined}
        
        return obj
    }
    static async #fillPage(starting_entry_index, entries_per_page=page_entries) {
        const pBodies = AstronomicalBodies.bodies

        lexiconDisplayEl.style.cssText = `
            display: flex;
            justify-content: space-between
        `
        const pre1 = document.createElement("pre")
        const pre2 = document.createElement("pre")
        pre2.style.flexBasis = "140px"
        const bodies = await pBodies

        let j = starting_entry_index + entries_per_page
        if (j > bodies.length) 
            j = bodies.length
        for (let i=starting_entry_index; i < j; i++) {
            let body = bodies[i]
            pre1.textContent += `${body.englishName}\n`
            pre2.textContent += `${body.id}\n`
        }
        lexiconDisplayEl.innerHTML = ""
        lexiconDisplayEl.append(pre1)
        lexiconDisplayEl.append(pre2)
    }
}


const lexiconEl = document.getElementById("lexicon")
const lexiconDisplayEl = document.getElementById("lexicon-display")


const bodies = await AstronomicalBodies.bodies
let current_page = 1
let page_entries = 10
let entries_num = bodies.length
console.log(bodies)


lexiconEl.addEventListener("click", (e) => {
    Lexicon.toggle()
})
Lexicon.firstPage()
