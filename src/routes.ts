import { Request, Response, Router } from "express";
import { RegisterController } from "./controllers/RegisterController";

const router = Router();
const registerController = new RegisterController();

router.get('/api/v1/register', registerController.index);
router.post('/api/v1/register', registerController.store);

export default router;