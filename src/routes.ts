import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { RegisterController } from "./controllers/RegisterController";

const router = Router();
const registerController = new RegisterController();
const authController = new AuthController();

router.get('/api/v1/register', registerController.index);
router.post('/api/v1/register', registerController.store);
router.post('/api/v1/auth', authController.authenticate);
router.delete('/api/v1/register/:id_chat', registerController.deleteById);

export default router;