import express from "express";

const app = express();
const PORT = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.json({ msg: "Hello world" });
  return;
});

app.listen(PORT, () => console.log("Server running"));
