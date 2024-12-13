# Biblioteca - front end

Este pequeno projeto foi feito com base no material diático da Disciplina **Desenvolvimento Full Stack Básico**, aula 3

A idéia inicial é um pequeno sistema de biblioteca onde é possível adicionar usuários e livros, bem como removê-los. Também é possivel que um usuário pegue um livro emprestado. Isso feito através de uma coluna na tabela "livro" chamada "emprestado_para_id", que é FK da PK da tabela "usuario". Porém infelizmente não consegui implementar esta funcionalidade no front-end a tempo.

Meu projeto possui a mesma regra de negócio que a da aula 3, onde não é possível ter 2 pessoas com o mesmo nome, porém para garantir que o front-end e o back-end sejam independentes permiti que múltiplos usuários sejam adicionados durante o front, mesmo que essa mudança não seja possível no back. O resultado é que o usuário repetido é adicionado no front porém ao atualizar a página ele não será carregado do back, porém pelo menos há a mensagem informando que não foi possível adicionar.

---
## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.
