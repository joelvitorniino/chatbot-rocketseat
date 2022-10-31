import { Request, Response, Router } from "express";
import { RegisterController } from "./controllers/RegisterController";

const router = Router();
const registerController = new RegisterController();

router.get('/api/v1/register', registerController.index);
router.post('/api/v1/register', registerController.store);
router.post('/api/v1/login', registerController.findOne);
router.delete('/api/v1/register/:id_chat', registerController.deleteById);

export default router;