import { Hono } from "hono";
import waitListRoutes from "@/routes/waitlist";
import photoRoutes from "@/routes/photos";
import authRoutes from "@/routes/auth";

const router = new Hono();

router.route("/waitlist", waitListRoutes);
router.route("/photos", photoRoutes);
router.route("/auth", authRoutes);

export default router;