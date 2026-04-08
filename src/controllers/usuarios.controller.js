const prisma = require("../config/prisma");

class UsuariosController {

 static async listar(req, res) {
  try {
   const usuarios = await prisma.usuario.findMany({
    orderBy: { id: "asc" }
   });

   res.send(200, usuarios);
  } catch (error) {
   res.send(500, { message: "Erro ao listar usuários." });
  }
 }

 static async buscarPorId(req, res) {
  try {
   const { id } = req.params;

   const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) }
   });

   if (!usuario) {
    return res.send(404, { message: "Usuário não encontrado." });
   }

   res.send(200, usuario);
  } catch (error) {
   res.send(500, { message: "Erro ao buscar usuário." });
  }
 }

 static async criar(req, res) {
  try {
   const { nome, email } = req.body;

   if (!nome || !email) {
    return res.send(400, { message: "Nome e email são obrigatórios." });
   }

   const novoUsuario = await prisma.usuario.create({
    data: { nome, email }
   });

   res.send(201, novoUsuario);
  } catch (error) {
   if (error.code === "P2002") {
    return res.send(409, { message: "Já existe usuário com esse email." });
   }

   res.send(500, { message: "Erro ao cadastrar usuário." });
  }
 }

 static async atualizar(req, res) {
  try {
   const { id } = req.params;
   const { nome, email } = req.body;

   if (!nome || !email) {
    return res.send(400, { message: "Nome e email são obrigatórios." });
   }

   const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) }
   });

   if (!usuario) {
    return res.send(404, { message: "Usuário não encontrado." });
   }

   const usuarioAtualizado = await prisma.usuario.update({
    where: { id: Number(id) },
    data: { nome, email }
   });

   res.send(200, usuarioAtualizado);
  } catch (error) {
   if (error.code === "P2002") {
    return res.send(409, { message: "Já existe usuário com esse email." });
   }

   res.send(500, { message: "Erro ao atualizar usuário." });
  }
 }

 static async deletar(req, res) {
  try {
   const { id } = req.params;

   const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) }
   });

   if (!usuario) {
    return res.send(404, { message: "Usuário não encontrado." });
   }

   await prisma.usuario.delete({
    where: { id: Number(id) }
   });

   res.send(204);
  } catch (error) {
   res.send(500, { message: "Erro ao deletar usuário." });
  }
 }

}

module.exports = UsuariosController;