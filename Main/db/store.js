const util = require('util');
const fs = require('fs').promises;
const { v1: uuidv1 } = require('uuid');

class Store {
  async read() {
    try {
      return await fs.readFile('db/db.json', 'utf8');
    } catch (err) {
      return '';
    }
  }

  async write(note) {
    try {
      await fs.writeFile('db/db.json', JSON.stringify(note));
    } catch (err) {
      throw new Error('Error writing to file');
    }
  }

  async getNotes() {
    try {
      const notes = await this.read();
      const parsedNotes = JSON.parse(notes);
      if (!Array.isArray(parsedNotes)) {
        return [];
      }
      return parsedNotes;
    } catch (err) {
      return [];
    }
  }

  async addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv1() };
    const notes = await this.getNotes();
    const updatedNotes = [...notes, newNote];
    await this.write(updatedNotes);
    return newNote;
  }

  async removeNote(id) {
    const notes = await this.getNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);
    await this.write(filteredNotes);
  }
}

module.exports = new Store();