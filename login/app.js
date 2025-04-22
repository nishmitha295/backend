const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/auth.routes")(app);

const PORT = process.env.PORT || 3001;

db.sequelize.authenticate()
  .then(async () => {
    // ✅ Get MySQL connection ID the safe way
    const [results] = await db.sequelize.query("SELECT CONNECTION_ID() AS id");
    console.log(`Connected to MySQL as ID ${results[0].id}`);

    return db.sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MySQL:", err.message);
  });
