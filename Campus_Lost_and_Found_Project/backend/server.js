const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
let items;

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validateItem(body) {
  const item = {
    title: cleanText(body.title, 80),
    description: cleanText(body.description, 500),
    type: body.type,
    location: cleanText(body.location, 100),
    contact: cleanText(body.contact, 120),
    date: body.date,
    status: body.status || "Open"
  };

  if (!item.title || !item.description || !item.location || !item.contact || !item.date) {
    return { error: "Please fill in all fields." };
  }
  if (!["Lost", "Found"].includes(item.type)) {
    return { error: "Type must be Lost or Found." };
  }
  if (!["Open", "Returned"].includes(item.status)) {
    return { error: "Status must be Open or Returned." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date) ||
      Number.isNaN(Date.parse(item.date)) ||
      new Date(item.date).toISOString().slice(0, 10) !== item.date) {
    return { error: "Enter a valid date." };
  }
  return { item };
}

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.get("/api/items", async (req, res) => {
  try {
    const { search = "", type = "All", status = "All" } = req.query;
    const filter = {};
    if (type !== "All") filter.type = type;
    if (status !== "All") filter.status = status;

    let results = await items.find(filter).sort({ createdAt: -1 }).toArray();
    const term = String(search).trim().toLowerCase();
    if (term) {
      results = results.filter(item =>
        [item.title, item.description, item.location, item.contact]
          .some(value => String(value || "").toLowerCase().includes(term))
      );
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Could not load notices." });
  }
});

app.get("/api/stats", async (req, res) => {
  try {
    const [lost, found, returned] = await Promise.all([
      items.countDocuments({ type: "Lost", status: "Open" }),
      items.countDocuments({ type: "Found", status: "Open" }),
      items.countDocuments({ status: "Returned" })
    ]);
    res.json({ lost, found, returned });
  } catch (error) {
    res.status(500).json({ error: "Could not load totals." });
  }
});

app.post("/api/items", async (req, res) => {
  const checked = validateItem(req.body);
  if (checked.error) return res.status(400).json({ error: checked.error });

  try {
    const now = new Date();
    const newItem = { ...checked.item, createdAt: now, updatedAt: now };
    const result = await items.insertOne(newItem);
    res.status(201).json({ ...newItem, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Could not save notice." });
  }
});

app.put("/api/items/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "Invalid item ID." });
  const checked = validateItem(req.body);
  if (checked.error) return res.status(400).json({ error: checked.error });

  try {
    const result = await items.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...checked.item, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    if (!result) return res.status(404).json({ error: "Notice not found." });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Could not update notice." });
  }
});

app.patch("/api/items/:id/status", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "Invalid item ID." });
  if (!["Open", "Returned"].includes(req.body.status)) {
    return res.status(400).json({ error: "Status must be Open or Returned." });
  }
  try {
    const result = await items.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: req.body.status, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    if (!result) return res.status(404).json({ error: "Notice not found." });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Could not update status." });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "Invalid item ID." });
  try {
    const result = await items.deleteOne({ _id: new ObjectId(req.params.id) });
    if (!result.deletedCount) return res.status(404).json({ error: "Notice not found." });
    res.json({ message: "Notice deleted." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete notice." });
  }
});

async function start() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("campus_lost_found");
    items = db.collection("items");
    await items.createIndex({ createdAt: -1 });
    app.listen(PORT, () => console.log(`Campus Lost and Found API running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("Could not connect to MongoDB. Make sure MongoDB is running and MONGO_URI is correct.");
    console.error(error.message);
    process.exit(1);
  }
}

start();
