import express from "express";
import mongoose from "mongoose";
import { Conection } from "./src/conection";

const app = express();
app.use(express.json());
const port = 3000;

// Definir o modelo Anime
const Anime = mongoose.model("Anime", {
  title: String,
  description: String,
  image_url: String,
  category: [String],
});

//Listar todos os animes
app.get("/listar_animes", async (req, res) => {
  const animes = await Anime.find();
  return res.json({
    animes,
    mensagem: "Sucesso",
  });
});

// Rota para cadastrar um anime
app.post("/cadastro_anime", async (req, res) => {
  const anime = new Anime({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    category: req.body.category,
  });

  await anime.save();

  res.json({
    anime,
    mensagem: "Cadastrado com sucesso",
  });
});

app.delete("/deletar_anime/:id", async (req, res) => {
  const anime = await Anime.findOneAndDelete(req.params.id);
  return res.json({
    anime,
    mensagem: "Anime Deletado com sucesso",
  });
});

app.listen(port, () => {
  // Conectar ao banco de dados
  Conection();
  console.log("App Running 🫰🚀🚀🚀...");
});
