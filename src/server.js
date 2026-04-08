const restify = require("restify");
const UsuariosController = require("./controllers/usuarios.controller");

const server = restify.createServer({
  name: "api-usuarios-restify"
});

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get("/usuarios", UsuariosController.listar);
server.get("/usuarios/:id", UsuariosController.buscarPorId);
server.post("/usuarios", UsuariosController.criar);
server.put("/usuarios/:id", UsuariosController.atualizar);
server.del("/usuarios/:id", UsuariosController.deletar);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`${server.name} rodando em ${server.url}`);
});