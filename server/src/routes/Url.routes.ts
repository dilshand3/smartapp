import { Router } from "express";
import { createUrl, redirectURL,toggleUrl } from "../controller/url.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
const router = Router();

router.route("/createUrl").post(verifyToken,createUrl);
router.route("/toggleUrl/:Id").get(toggleUrl);
router.route("/:username/:shortUrl").get(redirectURL);

export default router;