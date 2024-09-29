const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, 'database.db');
let db = null;

const initializeDBAndServer = async () => {
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
  
      await db.run('PRAGMA foreign_keys = ON');
  
      app.listen(5000, () => {
        console.log('Server Running at http://localhost:5000/');
      });
    } catch (e) {
      console.log(`DB Error: ${e.message}`);
      process.exit(1);
    }
};

app.post('/register', async (req, res) => {
    const {name, address} = req.body
    const userQuery = `INSERT INTO user(name)
                   VALUES (?)`;

    const addressQuery = `INSERT INTO address(user_id, address)
    VALUES (?, ?)`;

    try{
        const result = await db.run(userQuery, [name])
        await db.run(addressQuery, [result.lastID, address])

        res.status(200).json('Registration Successful')
    } catch (err) {
        res.status(500).json('Internal Server Error')
    }
});


initializeDBAndServer();
