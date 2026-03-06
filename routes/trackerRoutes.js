import express from "express";
import ReadingProgress from "../models/ReadingProgress.js";

const router = express.Router();

router.post("/", async (req, res) => {

  const data = await ReadingProgress.create(req.body);

  res.json(data);

});

router.get("/:userId", async (req, res) => {

  const list = await ReadingProgress.find({
    userId: req.params.userId
  });

  res.json(list);

});

export default router;