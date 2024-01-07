document.addEventListener('DOMContentLoaded', function () {
    const createNoteButton = document.getElementById('createNote');
    const foldersContainer = document.getElementById('folders');
    const notesContainer = document.getElementById('notes');
  
    createNoteButton.addEventListener('click', createNote);
  
    // Load existing notes
    loadNotes();
  
    function createNote() {
      const noteId = Date.now().toString();
      const noteContent = prompt('Enter note content:');
      
      if (noteContent !== null) {
        const note = { id: noteId, content: noteContent };
        saveNoteToLocalStorage(note);
        displayNotes();
      }
    }
  
    function saveNoteToLocalStorage(note) {
      let notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    function loadNotes() {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.forEach(note => {
        const noteElement = createNoteElement(note);
        notesContainer.appendChild(noteElement);
      });
    }
  
    function displayNotes() {
      // Clear the existing notes
      notesContainer.innerHTML = '';
      loadNotes();
    }
  
    function editNote(note) {
      const newContent = prompt('Edit note:', note.content);
      if (newContent !== null) {
        note.content = newContent;
        saveNotesToLocalStorage();
        displayNotes();
      }
    }
  
    function deleteNote(note) {
      const confirmDelete = confirm('Are you sure you want to delete this note?');
      if (confirmDelete) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.filter(n => n.id !== note.id);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        displayNotes();
      }
    }
  
    function createNoteElement(note) {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.textContent = note.content;
  
      // Edit note on click
      noteElement.addEventListener('click', () => editNote(note));
  
      // Delete note on right-click
      noteElement.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // Prevent the default context menu
        deleteNote(note);
      });
  
      return noteElement;
    }
  });
  