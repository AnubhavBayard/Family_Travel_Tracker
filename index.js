import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { LocalStorage } from "node-localstorage";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "10122004",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch'); 

let currentUserId = 1;

async function checkVisisted() {
  // console.log(currentUserId);
  const result = await db.query("SELECT countries.country_code FROM user_visited JOIN users ON users.id = user_visited.user_id JOIN countries ON countries.id = user_visited.visited_id WHERE users.id = $1;", [currentUserId]);
  // console.log(result.rows[0].country_code);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country);
  });
  return countries;
}
async function use() {
  const result = await db.query("SELECT * FROM users");
  let users = [];
  result.rows.forEach((user) => {
    users.push(user);
  });
  const userId = localStorage.getItem("id") || currentUserId;

  const userIndex = users.findIndex((user) => user.id == userId);
  if (userIndex === -1) {
    console.warn("User ID not found in users. Returning index 0.");
    return 0; // fallback to first user
  }
  return userIndex;
}

function countryCode(country) {
  return country.country_code;
}

function countryIndex(country) {
  return country.id;
}

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM users");
  let users = [];
  result.rows.forEach((user) => {
    users.push(user);
  });
  const countries = await checkVisisted();
  const user = await use();

  const country_codes = countries.map(countryCode);
  // const con_index = countries.map(countryIndex);
  
  res.render("index.ejs", {
    countries: country_codes,
    total: countries.length,
    users: users,
    color: users[user].color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT * FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];

    if (!data) {
      console.error("No country found!");
      return res.status(404).send("Country not found");
    }

    await db.query(
      "INSERT INTO user_visited (user_id, visited_id) VALUES ($1, $2)",
      [currentUserId, data.id]
    );

    res.redirect("/");
  } catch (err) {
    console.error("Error adding country:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = parseInt(req.body.user);
    localStorage.setItem("id", currentUserId);
    // console.log(currentUserId)

    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query(
  "INSERT INTO users (user_name, color) VALUES ($1, $2) RETURNING id, user_name, color",
  [name, color]
  );

  const id = result.rows[0].id;
  currentUserId = id;
  localStorage.setItem("id", currentUserId);
  
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
