const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE = "./players.json";

// Ensure file exists
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
}

function readPlayers() {
    return JSON.parse(fs.readFileSync(FILE));
}

function savePlayers(players) {
    fs.writeFileSync(FILE, JSON.stringify(players, null, 2));
}

// Add player
app.post("/add", (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "No ID provided" });
    }

    let players = readPlayers();

    if (!players.includes(id)) {
        players.push(id);
        savePlayers(players);
    }

    res.json({ success: true });
});

// Get players
app.get("/players", (req, res) => {
    res.json(readPlayers());
});

// Health check
app.get("/", (req, res) => {
    res.send("Backend running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
