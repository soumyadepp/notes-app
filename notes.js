const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body)=> {
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=>note.title===title) 
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    } 
}

const removeNote =(title) =>{
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

const readNotes =(title=>{
    const note=loadNotes();
    const finder=note.find((note)=>note.title===title)
    if(!finder)
    {
        console.log(chalk.red.inverse('Note not found'))
    }
    else
    {
        console.log(chalk.green.inverse(finder.title))
        console.log(chalk.white.inverse(finder.body))
    }
})
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const listNotes=()=>{
    const notes=loadNotes();
    console.log(chalk.inverse('your notes')) ;
    notes.forEach(note => {
        console.log(note.title);
    });
}
const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}