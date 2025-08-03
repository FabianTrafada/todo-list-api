import express from "express"
import { verifyToken } from "@/services/token.service"
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/controllers/toDoController.controller"

const toDoRouter = express.Router()


toDoRouter.post("/", verifyToken, createTodo)
toDoRouter.patch("/:id", verifyToken, updateTodo)
toDoRouter.delete("/:id", verifyToken, deleteTodo)
toDoRouter.get("/", verifyToken, getTodos)

export default toDoRouter