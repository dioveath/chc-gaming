const express = require('express');
const path = require('path');

const app = express();

const PORT = 5556;

app.use(express.static(path.join(__dirname, "build")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("React client server running at port:" + PORT);
});

