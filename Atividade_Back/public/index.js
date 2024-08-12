import { checkLogin } from './login/login.js';
import { checkSeExisteRegistro } from './registro/registro.mjs';

const linkLogin = document.getElementById('link_login');

if (await checkSeExisteRegistro()) {
    console.log("existe registro");

    if (await checkLogin()) {
        console.log("usuario logado");
        linkLogin.href = './logout/logout.html';

        linkLogin.innerText = 'Logout';

    } else {

        linkLogin.href = './login/login.html';

        linkLogin.innerText = 'Login';

    }

} else {

    linkLogin.href = './registro/registro.html';

    linkLogin.innerText = 'Registrar';

}