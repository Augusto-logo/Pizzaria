import { Router } from 'express';

import PizzaController from '../controllers/pizza_controller.mjs';

const pizzaRouter = Router();

pizzaRouter.use((req, res, next) => {
    if (req.session.logged) {
        next();
    } else {
        res.json({ logged: false });
    }
});

pizzaRouter.get('/', PizzaController.all);
pizzaRouter.get('/:id', PizzaController.one);
pizzaRouter.post('/', PizzaController.new);
pizzaRouter.put('/', PizzaController.edit);
pizzaRouter.delete('/', PizzaController.remove);

export default pizzaRouter;