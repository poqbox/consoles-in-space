import * as AstronomicalBodies from "./astronomical_bodies.js"
export {Lexicon}


const lexiconEl = document.getElementById("lexicon")
const lexiconDisplayBodyEl = document.getElementById("lexicon-display-body")
const lexiconDisplayFooterEl = document.getElementById("lexicon-display-footer")


const bodies = await AstronomicalBodies.bodies
let current_page = 1
let page_entries = 10
let entries_num = bodies.length
let last_page = Math.ceil(entries_num / page_entries)


class Lexicon {
    static initialLoad() {
        Lexicon.#fillPage(0)
        current_page = 1
    }
    static toggle() {
        if (lexiconEl.classList.contains("opened")) {
            lexiconEl.style.top = "var(--lexicon-closed-top)"
            lexiconEl.classList.replace("opened", "closed")
        }
        else {
            Lexicon.open()
        }
    }
    static open() {
        lexiconEl.classList.remove("lexicon-tutorial")
        if (lexiconEl.classList.contains("closed")) {
            lexiconEl.style.top = "var(--lexicon-opened-top)"
            lexiconEl.classList.replace("closed", "opened")
        }
    }

    static firstPage() {
        Lexicon.open()
        current_page = 1
        Lexicon.#fillPage(0)
    }
    static lastPage() {
        Lexicon.open()
        current_page = last_page
        Lexicon.#fillPage(entries_num - entries_num%page_entries)
    }
    static nextPage() {
        Lexicon.open()
        if (current_page < last_page) {
            current_page++
            Lexicon.#fillPage((current_page - 1) * page_entries)
        }
    }
    static prevPage() {
        Lexicon.open()
        if (current_page > 1) {
            current_page--
            Lexicon.#fillPage((current_page - 1) * page_entries)
        }
    }
    static currentPage() {
        Lexicon.open()
        Lexicon.#fillPage((current_page - 1) * page_entries)
    }
    static toPage(page_number) {
        Lexicon.open()
        if (page_number > 0 && page_number < last_page) {
            current_page = page_number
            Lexicon.#fillPage((current_page - 1) * page_entries)
        }
    }
    static async search(name) {
        const pBody = AstronomicalBodies.getBodyById(name)
        Lexicon.open()

        // setup page
        Lexicon.#resetPage()
        const pre = lexiconDisplayBodyEl.appendChild(document.createElement("pre"))

        let iterator_t = 1
        const entry = Lexicon.#getEntry(await pBody)
        // populate page
        for (const key in entry) {
            window.setTimeout(() => {
                pre.textContent += `${key}: ${entry[key]}\n`
            }, 100 * iterator_t)
            iterator_t++
        }
    }

    static #getEntry(body) {
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

        // setup page
        this.#resetPage()
        const pre1 = lexiconDisplayBodyEl.appendChild(document.createElement("pre"))
        const pre2 = lexiconDisplayBodyEl.appendChild(document.createElement("pre"))
        lexiconDisplayBodyEl.style.cssText = `
            display: flex;
            justify-content: space-between
        `
        pre2.style.flexBasis = "140px"

        let iterator_t = 1
        let j = starting_entry_index + entries_per_page
        const bodies = await pBodies
        if (j > bodies.length)
            j = bodies.length
        // populate page
        for (let i=starting_entry_index; i < j; i++) {
            let body = bodies[i]
            window.setTimeout(() => {
                pre1.textContent += `${body.englishName}\n`
                pre2.textContent += `${body.id}\n`
            }, 100 * iterator_t)
            iterator_t++
        }
        window.setTimeout(() => {
            lexiconDisplayFooterEl.textContent = `Pg. ${current_page}/${last_page}`
        }, 100 * iterator_t)
    }
    static #resetPage() {
        lexiconDisplayBodyEl.innerHTML = ""
        lexiconDisplayFooterEl.textContent = ""
    }
}


lexiconEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("closable") || !lexiconEl.classList.contains("opened"))
        Lexicon.toggle()
})
Lexicon.initialLoad()
