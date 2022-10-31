import { RegisterRepository } from "../repositories/RegisterRepository";

export class RegisterController {
    public repository: RegisterRepository = new RegisterRepository();

    async index() {
        return await this.repository.findAll();
    };

    async store(register: any) {
        const { name, email, password } = register;
        return await this.repository.create({
            name_chat: name,
            email_chat: email,
            password_chat: password
        });
    };
};