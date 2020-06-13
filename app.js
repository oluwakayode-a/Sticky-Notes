// Note Class Represents a Note
class Note {
    constructor(title, text) {
        this.date = new Date().getMilliseconds()
        this.title = title
        this.text = text
    }
}

// UI Class -- represents note actions
class UI {
    static displayNotes() {
        const notes = Store.getNotes()

        notes.forEach(note => UI.addNoteToList(note))
    }

    static addNoteToList(note) {
        const list = document.querySelector('#note-list');
        const containerDiv = document.createElement('div')

        // add col-md-3 class to created DIV
        containerDiv.classList.add('col-md-3')

        containerDiv.innerHTML = `
        <div class="card bg-secondary mb-3" style="max-width: 20rem; min-height: 10rem;">
            <div class="card-header">${note.title}
                <span class="fas fa-trash float-right delete-btn" style="cursor: pointer;"></span>
                <input type="hidden" value="${note.date}">
            </div>
            <div class="card-body">
                <p class="card-text">${note.text}</p>
            </div>
        </div>
        `
        list.appendChild(containerDiv);

    }

    static deleteNote(el) {
        if(el.classList.contains('delete-btn')) {
            el.parentElement.parentElement.parentElement.remove()
        }
    }


    static clearFields() {
        document.querySelector('#title').value = ''
        document.querySelector('#text').value = ''
    }
}


class Store {
    static getNotes() {
        let notes;

        if (localStorage.getItem('notes') ===  null) {
            notes = []
        } else { 
            // Convert JSON to JavaScript Object
            notes = JSON.parse(localStorage.getItem('notes'))
        }

        return notes
    }

    static addNote(note) {
        // get notes from store
        const notes = Store.getNotes()

        // add note to notes Object
        notes.push(note)

        // Add note to Store
        localStorage.setItem('notes', JSON.stringify(notes))
    }

    static deleteNote(date) {
        const notes = Store.getNotes();
        notes.forEach((note, index) => {
            if (note.date === date) {
                // remove the note at the index
                notes.splice(index, 1)
            }
        })

        localStorage.setItem('notes', JSON.stringify(notes))
    }
}

// Display all books when loaded
document.addEventListener('DOMContentLoaded', UI.displayNotes())

// Submit A New Note
document.getElementById('note-form').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.querySelector('#title').value
    const text = document.querySelector('#text').value

    // Instantiate New Note
    const note = new Note(title, text)

    // Add Note to the list
    UI.addNoteToList(note)

    // Add note to store
    Store.addNote(note)

    // Clear Fields After Submission
    UI.clearFields()
})

//
document.querySelector('#note-list').addEventListener('click', e => {
    // check if the class list has an id of delete
    UI.deleteNote(e.target)
    Store.deleteNote(Number(e.target.parentElement.children[1].value))
})
