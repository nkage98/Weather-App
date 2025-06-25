Aplicação de cadastro e listagem de usuário com pagina de clima

Feito em JS e Vue.js

Como não sabia mexer no Vue.js, decidi deixar ele embutido ao html pra facilitar

o aplicativo está sem login e o cadastro de usuário é apenas com as informaçoes fornecidas pelo .csv

A pagina de clima pode ser acessado pela navbar a direita.

bootstrap para estilizar.

Estava desenvolvendo/estudando usando django, então esse aplicativo acabou ficando bem simples mas acho ta funcionando bem.

O Site tem 3 paginas 
rotas:  ('/', home);                        // pagina inicial
        ('/weather', weather);              // pagina de previsao do tempo
        ('/users/details/:id', infoPage);   // informaçoes de usuários
