require("dotenv").config();
const express = require("express");
const cors = require("cors");
const agentRoutes = require("./routes/agentRoutes");

const app = express();
const PORT = process.env.APP_PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/agent", agentRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
