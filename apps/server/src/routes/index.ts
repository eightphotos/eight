import express from "express";
import waitlistRouter from "@/routes/waitlist";

const router = express.Router();

router.use("/waitlist", waitlistRouter);

export default router;
