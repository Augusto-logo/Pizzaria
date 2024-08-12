import Pizza from "../models/pizza.mjs";

const PizzaController = {
    "new": async (req, res) => {
        // console.log(req.body);
        const created = await Pizza.create({
            nome: req.body.nome,
            tamanho: req.body.tamanho,
            preco: req.body.preco,
            nota: req.body.nota,
            vegetariana: req.body.vegetariana
        });
        res.send(created);
    },
    "one": async (req, res) => {
        const p = await Pizza.findOne({
            where: { id: req.params.id }
        });
        res.json(p);
    },
    "all": async (req, res) => {
        res.json(await Pizza.findAll());
    },
    "edit": async (req, res) => {
        const p = await Pizza.findOne({
            where: { id: req.body.id }
        });
        p.nome = req.body.nome;
        p.tamanho = req.body.tamanho;
        p.preco = req.body.preco;
        p.nota = req.body.nota;
        p.vegetariana = req.body.vegetariana;
        await p.save();
        res.json(p);
    },
    "remove": async (req, res) => {
        const p = await Pizza.findOne({
            where: { id: req.body.id }
        });
        await p.destroy();
        res.json(p);
    }
};

export default PizzaController;
