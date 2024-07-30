document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('noteInput');
    const saveNoteButton = document.getElementById('saveNoteButton');
    const notesContainer = document.getElementById('notesContainer');

    // Load notes from localStorage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            createNoteElement(note, index);
        });
    }

    // Save note to localStorage
    function saveNote() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
            createNoteElement(noteText, notes.length - 1);
            noteInput.value = '';
        }
    }

    // Create a note element
    function createNoteElement(text, index) {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <p>${text}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    }

    // Delete note
    function deleteNote(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }

    // Event listeners
    saveNoteButton.addEventListener('click', saveNote);

    notesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            deleteNote(parseInt(index, 10)); // Convert to integer
        }
    });

    // Initial load
    loadNotes();
});