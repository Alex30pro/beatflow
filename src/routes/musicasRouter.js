const express = require("express");
const router = express.Router();
const musicaController = require("../controllers/musicaController");

router.post("/", musicaController.criarMusica);

router.get("/", musicaController.listarMusicas);

router.put("/:id", musicaController.atualizarMusica);

router.delete("/:id", musicaController.deletarMusica);

module.exports = router;

