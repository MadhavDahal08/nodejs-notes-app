const chalk = require("chalk");
const fs = require("fs");

// adding a note to data storage
const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

// removing a note
const removeNote = (title) => {
  const notes = loadNotes();
  const modifiedNotes = notes.filter((note) => note.title !== title);

  if (modifiedNotes.length < notes.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(modifiedNotes);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

// listing all the notes
const listNotes = () => {
  console.log(chalk.yellow.bold.inverse("Your Notes"));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(note.title);
  });
};

// read a particular note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.green.inverse.bold(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.bold.inverse("Unabel to find the notes"));
  }
};

// saving  all the notes in json format
const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};

// function to get all data from json file and converting them to js object
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNotes,
  removeNote,
  listNotes,
  readNote,
};
