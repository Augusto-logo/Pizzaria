import Receita from "../models/receita.mjs";

const ReceitaController = Object.create(Object.prototype);

ReceitaController.new = async (req, res) => {
    const created = await Receita.create({
        PizzaId: req.body.PizzaId, 
        ingrediente: req.body.ingrediente, 
        modoPreparo: req.body.modoPreparo, 
        tempoPreparo: req.body.tempoPreparo,
        temperaturaForno: req.body.temperaturaForno
    });
    res.send(created);
};

ReceitaController.one = async (req, res) => {
    const r = await Receita.findOne({
        where: { id: req.params.id }
    });
    res.json(r);
};

ReceitaController.all = async (req, res) => {

    const all = await Receita.findAll();
    const ret = [];
    for (let i = 0; i < all.length; i++) {
        ret.push({
            ...all[i].dataValues,
            pizza: await all[i].getPizza()
        });     
    }
    res.json(ret);
};

ReceitaController.edit = async (req, res) => {
    const r = await Receita.findOne({
        where: { id: req.body.id }
    });
    r.ingrediente = req.body.ingrediente;
    r.modoPreparo = req.body.modoPreparo;
    r.tempoPreparo = req.body.tempoPreparo;
    r.temperaturaForno = req.body.temperaturaForno;
    await r.save();
    res.json(r);
};

ReceitaController.remove = async (req, res) => {
    const r = await Receita.findOne({
        where: { id: req.body.id }
    });
    await r.destroy();
    res.json(r);
};

export default ReceitaController;
