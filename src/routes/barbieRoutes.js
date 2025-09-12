import express from "express";
import {getAllBarbies } from "../controllers/barbieControllers.js";

const router = express.Router();

router.get("/", getAllBarbies);
// router.get("/:id", getBarbieById);

export default router;