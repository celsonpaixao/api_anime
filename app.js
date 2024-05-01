import express from "express";
import mongoose from "mongoose";
import DbString from "./src/connectionString.js";

const app = express();
app.use(express.json());
const port = 3000;
const connectionString = DbString();

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
  const anime = await Anime.findOneAndDelete({ _id: req.params.id });
  return res.json({
    anime,
    mensagem: "Anime Deletado com sucesso",
  });
});

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log("App Running 🫰🚀🚀🚀...");

    });
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });
