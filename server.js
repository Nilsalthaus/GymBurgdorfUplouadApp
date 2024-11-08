const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Statisches Verzeichnis für HTML, CSS und JS
app.use(express.static(path.join(__dirname, 'public')));

// Speicherort und Dateinamen für hochgeladene Dateien
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// API-Endpunkt für Datei-Upload
app.post('/upload', upload.single('file'), (req, res) => {
  const { teacher, subject } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'Keine Datei hochgeladen.' });
  }
  res.status(200).json({
    message: 'Datei erfolgreich hochgeladen!',
    fileInfo: {
      originalName: req.file.originalname,
      uploadName: req.file.filename,
      teacher: teacher,
      subject: subject
    }
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft unter http://localhost:${PORT}`);
});
