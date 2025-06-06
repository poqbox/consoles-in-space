import * as AstronomicalBodies from "./astronomical_bodies.js"
export {Lexicon}


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
        current_page = Math.floor(lastPage)
        Lexicon.#fillPage(entries_num - entries_num%page_entries)
    }
    static nextPage() {
        Lexicon.open()
        if (current_page < Math.ceil(entries_num / page_entries)) {
            current_page++
            Lexicon.#fillPage(current_page * page_entries)
        }
    }
    static prevPage() {
        Lexicon.open()
        if (current_page > 1) {
            current_page--
            Lexicon.#fillPage((current_page - 2) * page_entries)
        }
    }
    static currentPage() {
        Lexicon.open()
        current_page--
        Lexicon.#fillPage((current_page - 1) * page_entries)
    }
    static async search(name) {
        Lexicon.open()
        const pre = document.createElement("pre")
        pre.textContent = ""

        let iterator_t = 1
        const body = Lexicon.getEntry(await AstronomicalBodies.getBodyById(name))
        for (const key in body) {
            window.setTimeout(() => {
                pre.textContent += `${key}: ${body[key]}\n`
            }, 100 * iterator_t)
            iterator_t++
        }
        lexiconDisplayBodyEl.innerHTML = ""
        lexiconDisplayFooterEl.textContent = ""
        lexiconDisplayBodyEl.append(pre)
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

        lexiconDisplayBodyEl.style.cssText = `
            display: flex;
            justify-content: space-between
        `
        const pre1 = document.createElement("pre")
        const pre2 = document.createElement("pre")
        pre2.style.flexBasis = "140px"
        const bodies = await pBodies

        let iterator_t = 1
        let j = starting_entry_index + entries_per_page
        if (j > bodies.length)
            j = bodies.length
        for (let i=starting_entry_index; i < j; i++) {
            let body = bodies[i]
            window.setTimeout(() => {
                pre1.textContent += `${body.englishName}\n`
                pre2.textContent += `${body.id}\n`
            }, 100 * iterator_t)
            iterator_t++
        }
        lexiconDisplayBodyEl.innerHTML = ""
        lexiconDisplayFooterEl.textContent = ""
        lexiconDisplayBodyEl.append(pre1)
        lexiconDisplayBodyEl.append(pre2)
        window.setTimeout(() => {
            lexiconDisplayFooterEl.textContent = `Pg. ${current_page}/${lastPage}`
        }, 100 * iterator_t)
    }
}


const lexiconEl = document.getElementById("lexicon")
const lexiconDisplayBodyEl = document.getElementById("lexicon-display-body")
const lexiconDisplayFooterEl = document.getElementById("lexicon-display-footer")


const bodies = await AstronomicalBodies.bodies
let current_page = 1
let page_entries = 10
let entries_num = bodies.length
let lastPage = Math.floor(entries_num / page_entries)
console.log(bodies)


lexiconEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("closable") || !lexiconEl.classList.contains("opened"))
        Lexicon.toggle()
})
Lexicon.initialLoad()
