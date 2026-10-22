# Ficha 4 - Cartas em API

## Como pôr tudo a correr

- Terminal 1 (server): `cd C:/Users/2224126/Downloads/ficha-04/server` e `node --watch server.js`  
- Terminal 2 (client): `cd C:/Users/2224126/Downloads/ficha-04/client` e `npm run dev -- --host 0.0.0.0`  
- Abre `http://localhost:5173/` no browser. O backend fica em `http://localhost:3000`.

## Pergunta 3
`http://localhost:3000/api/cartas` abre no browser e mostra JSON, mas sem o header `Access-Control-Allow-Origin` o `fetch` da app React falha. O problema foi do server, não do browser: o browser só rejeita a resposta, e no terminal do server vemos o pedido chegar sem a resposta correta.  

## Pergunta 4
Na Ficha 3, a app tinha os dados dentro do React e fazia 0 requests ao abrir. Agora faz 1 request ao abrir e 1 por cada filtro, porque os dados vêm do servidor. Os dados vivem no servidor, em memória, e o HTML é construído no React, enquanto o servidor devolve JSON.

## Observações finais

- O repositório tem duas partes: `server/` e `client/`.
- O `server` serve JSON e o `client` mostra os dados em React.
- Não se devem incluir `node_modules` no GitHub.
