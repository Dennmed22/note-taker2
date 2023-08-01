const path = require('path');
const router = require('express').Router();

// "/notes" responds with the notes.html file
router.get('/notes', (req, res) => {
  const notesFilePath = path.join(__dirname, '../public/notes.html');
  res.sendFile(notesFilePath);
});

// All other routes respond with the index.html file
router.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  res.sendFile(indexPath);
});

module.exports = router;