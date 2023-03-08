import { Router } from "express";

import Books from "../sequelize/db/models/book.js";

const router = Router();

router.get("/", (req, res) => {
  Books.findAll().then((books) => res.status(200).send(books));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Books.findByPk(id).then((book) => {
    if (!book) return next();

    res.status(200).send(book);
  });
});

export default router;
