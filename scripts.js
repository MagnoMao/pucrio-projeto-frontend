/**
 * novoLivro/Usuario chamam postlivro/usuario para salvar no backend, logo após, chama 
 * insertTableRowLivro/Usuario para adicionar na tabela correspondente
 * **/


/*
  --------------------------------------------------------------------------------------
  Funções para definir qual conteúdo será apresentado: Usuários ou Livros
  --------------------------------------------------------------------------------------
*/
const renderUsuarios = () => {
  document.getElementById('paginacaoLivros').style.display = "none"
  document.getElementById('paginacaoUsuarios').style.display = "block"  
  getListaUsuarios()
}

const renderLivros = () => {
  document.getElementById('paginacaoLivros').style.display = "block"
  document.getElementById('paginacaoUsuarios').style.display = "none"
  getListaLivros()
}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de usuários existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListaUsuarios = async () => {
  // Pega a lista de usuários e monta a tabela

  // Limpa a tabela. Evita duplicação dos dados em alguns casos
  nrows = document.getElementById("usuariosTable").rows.length
  for (let i = 1; i < nrows; i++){
    document.getElementById('usuariosTable').deleteRow(1)
  }

  let url = 'http://127.0.0.1:5000/usuarios';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.usuarios.forEach(item => insertTableRowUsuario(item.nome, item.idade))
    })
    .catch((error) => { 
      console.error('Error:', error);
    });  
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo usuário com nome e idade 
  --------------------------------------------------------------------------------------
*/
const novoUsuario = () => {
  let inputNomeUsuario = document.getElementById("nomeUsuarioNovo").value;
  let inputIdade = document.getElementById("idadeUsuarioNovo").value;

  if (inputNomeUsuario === '') {
    alert("Escreva o nome do usuário!");
  } else if (isNaN(inputIdade)) {
    alert("A idade precisa ser um número!");
  } else {    
    postUsuario(inputNomeUsuario, inputIdade)
    insertTableRowUsuario(inputNomeUsuario, inputIdade)
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um usuário na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postUsuario = async (inputNomeUsuario, inputIdade) => {
  
  const formData = new FormData();
  formData.append('nome', inputNomeUsuario);
  formData.append('idade', inputIdade);

  let url = 'http://127.0.0.1:5000/usuario';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      res = response.json()
      res.then(msg =>{
        if (msg.mensagem) { 
          alert(msg.mensagem) // Houve um erro, usuário não adicionado
        } 
        /* Essas linhas, e a remoção de insertTableRowUsuario em novoUsuario() fariam com que a tabela somente seria
        atualizada após a confirmação do back end, garantindo a regra de negócio no front.*/
        // else{
        //   insertTableRowUsuario(inputNomeUsuario, inputIdade)
        // }
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item das tabelas
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeUsuario = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeUsuario = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteUsuario(nomeUsuario)
        alert("Removido!")
      }
    }
  }
}

const removeLivro = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const idLivro = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteLivro(idLivro)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteUsuario = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/usuario?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


const insertTableRowUsuario = (nomeUsuario, idade) => {
  
  var table = document.getElementById('usuariosTable');
  var item = [nomeUsuario, idade]
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))

  removeUsuario()
}


const novoLivro = () => {
  let inputNomeLivro = document.getElementById("nomeLivroNovo").value;
  let inputAutor = document.getElementById("idadeLivroNovo").value;
  let inputEditora = document.getElementById("editoraLivroNovo").value;

  if (inputNomeLivro === '') {
    alert("Escreva o nome do livro!");
  } else if (inputAutor === '') {
    alert("Escreva o nome do Autor!");
  } else if (inputEditora === '') {
    alert("Escreva o nome da editora!");
  } else {
    
    table = document.getElementById("livrosTable")
    lastElem = document.getElementById("livrosTable").rows.length - 1
    idLastLivro = table.rows[lastElem].firstChild.innerHTML
    idNovoLivro = (parseInt(idLastLivro) ? parseInt(idLastLivro) : 0)  + 1   
    
    postLivro(inputNomeLivro, inputAutor, inputEditora)
    insertTableRowLivros(idNovoLivro,inputNomeLivro, inputAutor, inputEditora)
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na tabela Livros
  --------------------------------------------------------------------------------------
*/
const insertTableRowLivros = (idLivro, nomeLivro, nomeAutor, nomeEditora) => {
  
  var table = document.getElementById('livrosTable');
  var item = [idLivro, nomeLivro, nomeAutor, nomeEditora]
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))

  removeLivro()
}

const getListaLivros = async () => {
  // Pega a lista de usuários e monta a tabela

  
  // Limpa a tabela. Evita duplicação dos dados em alguns casos
  nrows = document.getElementById("livrosTable").rows.length
  for (let i = 1; i < nrows; i++){
    document.getElementById('livrosTable').deleteRow(1)
  } 

  let url = 'http://127.0.0.1:5000/livros';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.livros.forEach(item => insertTableRowLivros(item.id, item.nome, item.autor, item.editora))
    })
    .catch((error) => { 
      console.error('Error:', error);
    });
}


const postLivro = async (inputNomeLivro, inputAutor, inputEditora) => {
  const formData = new FormData();
  formData.append('nome', inputNomeLivro);
  formData.append('autor', inputAutor);
  formData.append('editora', inputEditora);

  let url = 'http://127.0.0.1:5000/livro';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      res = response.json()
      res.then(msg =>{
        if (msg.mensagem) { 
          alert(msg.mensagem) // Houve um erro, livro não adicionado
        }
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const deleteLivro = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/livro?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}