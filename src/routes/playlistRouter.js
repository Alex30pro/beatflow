const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistControler");

router.post("/", playlistController.criarPlaylists);

router.get("/", playlistController.obterPlaylist);

router.put("/:id", playlistController.atualizarPlaylist);

router.delete("/:id", playlistController.deletarPlaylist);

module.exports = router;

