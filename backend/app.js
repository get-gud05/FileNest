const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Helpers for user reading and writing
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE));
  } catch {
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Registration & login
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists' });
  }
  users.push({ username, password });
  saveUsers(users);
  fs.mkdirSync(path.join(UPLOADS_DIR, username), { recursive: true });
  res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ success: true });
});

// Fix: Here the username comes from the route, not body
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userDir = path.join(UPLOADS_DIR, req.params.username); // <<< CHANGED
    fs.mkdirSync(userDir, { recursive: true });
    cb(null, userDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Fix: Route now expects username in URL param, not body
app.post('/api/upload/:username', upload.single('image'), (req, res) => {
  res.json({ success: true, filename: req.file.filename });
});

app.get('/api/images/:username', (req, res) => {
  const dir = path.join(UPLOADS_DIR, req.params.username);
  if (!fs.existsSync(dir)) return res.json([]);
  const files = fs.readdirSync(dir);
  res.json(files);
});

app.use('/uploads', express.static(UPLOADS_DIR));

app.get('/api/download/:username/:image', (req, res) => {
  const file = path.join(UPLOADS_DIR, req.params.username, req.params.image);
  res.download(file);
});

app.get('/api/share/:username/:image', (req, res) => {
  const url = `http://localhost:${PORT}/uploads/${req.params.username}/${req.params.image}`;
  res.json({ url });
});

app.listen(PORT, () => console.log('Backend running on port ' + PORT));
