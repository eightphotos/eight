import { Hono } from "hono";
import waitListRoutes from "@/routes/waitlist";

const router = new Hono();

router.route("/waitlist", waitListRoutes);

export default router;
