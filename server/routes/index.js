import { Router } from "express";
const router = Router();
import booksRouter from "./books.js";

router.use("/books", booksRouter);

export default router;
