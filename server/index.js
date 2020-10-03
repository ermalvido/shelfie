require('dotenv').config();
const express = require('express');
const massive = require('massive');
const ctrl = require('./controller');
const {SERVER_PORT, CONNECTION_STRING} = process.env;
const app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
}).catch(err => console.log(err));

app.get('/api/inventory', ctrl.retrieveInventory)
app.post('/api/create/inventory', ctrl.addProduct)
app.put('/api/inventory/:id', ctrl.updateProduct)
app.delete('/api/inventory/:id', ctrl.deleteProduct)

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));