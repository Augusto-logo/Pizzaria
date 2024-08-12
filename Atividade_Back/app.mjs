import express from 'express';

import session from 'express-session';

import sequelize from './database/mysql.mjs';

import CSS from 'connect-session-sequelize';



import userRouter from './routers/user_router.mjs';

import veiculoRouter from './routers/veiculo_router.mjs';

import locacaoRouter from './routers/locacao_router.mjs';



const app = express();

const port = 3000;



const SequelizeStore = CSS(session.Store);



app.use(

    session({

        secret: '#7UIERU933E00LERI##327345&6',

        store: new SequelizeStore({

            db: sequelize

        })

    })

);



app.use(express.json());

app.use(express.urlencoded());



app.use(express.static('public'));



app.use('/user', userRouter);

app.use('/veiculos', veiculoRouter);

app.use('/locacoes', locacaoRouter);



app.listen(port, () => {

    console.log(`Example app listening on port ${port}`);

});