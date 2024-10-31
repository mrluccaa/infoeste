import express from "express";

const app = express();

app.use(express.json());

let usuarios = [
  { id: 1, nome: "Joao", email: "joao@gmail.com", idade: 25 },
  { id: 2, nome: "Joa", email: "joao@gmail.com", idade: 26 },
  { id: 3, nome: "Jo", email: "joao@gmail.com", idade: 27 },
  { id: 4, nome: "J", email: "joao@gmail.com", idade: 28 },
  { id: 5, nome: "Jao", email: "joao@gmail.com", idade: 29 },
];

app.get("/usuarios", (req, res) => {
  res.status(200).json({ succes: true, data: usuarios });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/usuarios/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ succes: false, message: "Manda o ID:" });
  } else {
    const usuarioencontrado = usuarios.find(
      (usuarios) => usuarios.id === Number(id)
    );

    if (usuarioencontrado !== undefined) {
      res.status(200).json({
        succes: true,
        data: usuarioencontrado,
      });
    } else {
      res.status(404).json({
        succes: false,
        message: "Usuário não encontrado",
      });
    }
  }
});

app.post("/usuarios", (req, res) => {
  const { nome, email, idade } = req.body;

  if (!nome || !email || !idade) {
    res.status(400).json({
      succes: false,
      message: "Informaçoes Invalidas !",
    });
  } else {
    const novousuario = {
      id: usuarios[usuarios.length - 1].id + 1,
      nome,
      email,
      idade,
    };

    usuarios.push(novousuario);

    res
      .status(200)
      .json({ succes: true, message: "Usuario criado com Sucesso!" });
  }
});

app.listen(5000, () => {
  console.log("Servidor rodando em http://localhost:5000");
});
