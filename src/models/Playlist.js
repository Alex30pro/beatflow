const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;