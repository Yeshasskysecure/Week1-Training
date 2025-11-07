const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

//  Logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  const now = new Date().toISOString();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${now}] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// In-memory data
let items = [
  { id: 1, name: 'Apple', qty: 10 },
  { id: 2, name: 'Banana', qty: 5 }
];
let nextId = 3;

//  Frontend
app.get('/', (req, res) => {
  res.send(`
    <h2> First Express API</h2>
    <button onclick="getItems()">GET Items</button>
    <button onclick="addItem()">POST Add Item</button>
    <button onclick="showUpdate()">PUT Update Item</button>
    <button onclick="showDelete()">DELETE Item</button>

    <div id="updateForm" style="display:none; margin-top:10px;">
      <h4>Update Item</h4>
      ID: <input id="updateId" type="number" placeholder="ID">
      Name: <input id="updateName" placeholder="New Name">
      Qty: <input id="updateQty" type="number" placeholder="New Qty">
      <button onclick="updateItem()">Submit Update</button>
      <button onclick="hideForms()">Cancel</button>
    </div>

    <div id="deleteForm" style="display:none; margin-top:10px;">
      <h4>Delete Item</h4>
      ID: <input id="deleteId" type="number" placeholder="ID">
      <button onclick="deleteItem()">Confirm Delete</button>
      <button onclick="hideForms()">Cancel</button>
    </div>

    <pre id="output">Click a button to see results here</pre>

    <script>
      function showUpdate() {
        hideForms();
        document.getElementById('updateForm').style.display = 'block';
      }

      function showDelete() {
        hideForms();
        document.getElementById('deleteForm').style.display = 'block';
      }

      function hideForms() {
        document.getElementById('updateForm').style.display = 'none';
        document.getElementById('deleteForm').style.display = 'none';
      }

      async function getItems() {
        const res = await fetch('/api/items');
        document.getElementById('output').textContent = JSON.stringify(await res.json(), null, 2);
      }

      async function addItem() {
        const res = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Orange', qty: 7 })
        });
        document.getElementById('output').textContent = JSON.stringify(await res.json(), null, 2);
      }

      async function updateItem() {
        const id = document.getElementById('updateId').value;
        const name = document.getElementById('updateName').value;
        const qty = document.getElementById('updateQty').value;
        const res = await fetch('/api/items/' + id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, qty })
        });
        document.getElementById('output').textContent = JSON.stringify(await res.json(), null, 2);
        hideForms();
      }

      async function deleteItem() {
        const id = document.getElementById('deleteId').value;
        const res = await fetch('/api/items/' + id, { method: 'DELETE' });
        document.getElementById('output').textContent = JSON.stringify(await res.json(), null, 2);
        hideForms();
      }
    </script>
  `);
});

//  API Routes
app.get('/api/items', (req, res) => res.json(items));

app.post('/api/items', (req, res) => {
  const { name, qty } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const newItem = { id: nextId++, name, qty: Number(qty) || 0 };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  const { name, qty } = req.body;
  items[idx] = { id, name, qty };
  res.json(items[idx]);
});

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  const deleted = items.splice(idx, 1);
  res.json({ message: 'Item deleted', deleted });
});

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
