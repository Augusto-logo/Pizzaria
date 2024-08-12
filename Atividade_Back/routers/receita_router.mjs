import { Router } from 'express';

import ReceitaController from '../controllers/receita_controller.mjs';

const receitaRouter = Router();

receitaRouter.use((req, res, next) => {
    if (req.session.logged) {
        next();
    } else {
        res.json({ logged: false });
    }
});

receitaRouter.get('/', ReceitaController.all);
receitaRouter.get('/:id', ReceitaController.one);
receitaRouter.post('/', ReceitaController.new);
receitaRouter.put('/', ReceitaController.edit);
receitaRouter.delete('/', ReceitaController.remove);

export default receitaRouter;