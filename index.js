const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const tesseract = require('tesseract.js');

const app = express();
app.use(cors());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/upload', multer().single('image'), async (req, res) => {
  const worker = await tesseract.createWorker('eng');
  const { data: { text }} = await worker.recognize(req.file.buffer);

  console.log(text);

  return res.send({ result: text });
});

app.listen(3000, () => console.log('Server started on port 3000'));