const express = require("express");
const app = express();
const { Pool } = require("pg");
const port = 5432;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "postgres",
  port: port, // Porta padrão do PostgreSQL
});
app.use(express.json());

app.post('/sellers', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO sellers (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, password]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error in create a seller:', error)
    res.status(500).json({ error: 'Error creating seller' });
  }
})

app.post('/buyers', async (req, res) => {
  const { first_name, last_name, email, password, seller_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO sellers (first_name, last_name, email, password, seller_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, email, password, seller_id]
    );
    res.json(result.rows[0]);
  } catch(error) {
    console.error('Error in create a buyer:', error)
    res.status(500).json({ error: 'Error creating buyer' });
  }
})

app.get('/sellers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sellers');
    res.json(result.rows);
    console.log(result)
  } catch (error) {
    console.error('Error fetching sellers:', error);
    res.status(500).json({ error: 'Error fetching sellers' });
  }
});

app.get('/buyers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM buyers');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ error: 'Error fetching buyers' });
  }
});



app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3000, () => console.log("server liston on port", 3000));
