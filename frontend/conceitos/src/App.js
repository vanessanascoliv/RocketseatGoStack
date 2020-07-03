//useEffect > dispara funções sempre que tiver uma informação alterada , ou não qdo quiser apenas disparar função
//assim que o componente for exibido em tela

import React, { useState,useEffect } from 'react';
import api from './services/api';

import './App.css';
//importando imagem da pasta assets
//import backgroundImage from './assets/background.jpg';

import Header from './components/Header';
//import './App.css';
//Estado = Serve para quando for inserido um novo projeto as alterações sejam altomaticas
//e como não se pode usar variavel tradicional é necessário usar o conceito de Estado
//acresncentar no React o useState

//Imutabilidade = não se pode mutar variavel ou seja alterar informações de forma direta
//usando esse conceito em vez de mudar o array principal é criado um novo contendo os novos dados inseridos
function App(){
  //useState retorna uma array com 2 posições 
  //1 - Variável com o seu valor inicial
  //2- Função para atualizamos esse valor

  /*Apos a conexão com a API como cada projeto é um objeto não posso inicializar meus projetos com string 
  È necessario iniciar com o mesmo formato da variavel ou seja, se a variavel for um objeto iniciar com objeto
  se for um array iniciar com array, porque se não dará erro*/
  const [projects, setProjects] = useState([]);
 
  //UseEffect = Conexão com a API(backend)
  useEffect(() => {
    //to indo busca na rota projects, o then > quando o get tiver uma resposta eu vou ter essa respota 
    //disponivel dentro do response
    api.get('/projects').then(response =>{
      //console.log(response);
      setProjects(response.data);
    });
  },[]);

  /*função para adicionar projetos 
  toda vez q lidar c ação do usuário usar o handle*/
  async function handleAddProject(){
    //projects.push(`Novo projeto ${Date.now()}`);
    //sempre que for alterar o valor de projects,ou seja inserir um novo valor usar o setProject
    //os 3 ... quer dizer copia tudo o q já tem dentro de projects e só depois adciona o novo projeto
    //setProjects([...projects, `Novo projeto ${Date.now()}` ]);
    //console.log(projects); //p garantir q o projeto esta sendo inserido
    //Fazendo a função adicionar um novo projeto na API(backend);
    //forma statica
    /*api.post('projects',{
      title: `Novo projeto ${Date.now()}`,
	    owner: "Vanessa Oliveira"
    })

  }*/
  //Adicionando de forma automatica
  //o mesmo response que eu tenho acesso dentro do then eu também vou ter acesso aqui por conta do await
   const response = await api.post('projects',{
    title: `Novo projeto ${Date.now()}`,
    owner: "Vanessa Oliveira"
   });

   //dentro do response.data eu tenho o novo projeto por isso agora é necessario criar uma varial p receber esse valor
   const project = response.data;
   //Adicionando o projeto novo no final do array de projetos
   /*Para isso é necessario usar o setProjects criar um novo array,com ...projects copiar tudo que ja tem lá dentro e so 
   depois incluir o novo projeto no final*/
   setProjects([...projects,project]);

   /*Ao ir conferir no browser vai dar o erro: regeneratorRuntime is not defined pq por padram o babel não consegue entender
   requisição com async, para corrigir é necessario instalar o plugin> yarn add @babel/plugin-transform-runtime -D e inserir no babel*/

  } 
  
  return (
      <>
        <Header title ="Projects"/>
        {/*<img width ={300} src = {backgroundImage}/>*/}
        <ul>
          {/*Key = precisar informar qual informação é unica dentro de cada projeto*
          no caso está sendo usado o proprio titulo{project}, por serem diferentes*/}
         {/* {projects.map(project => <li key={project}>{project}</li>)}{/*pega objeto inteiro*/}
         {/*Pegando apenas o titulo do projeto  e passando o identificador unico na Key = ID*/}
         {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>
        <button type = "button" onClick={handleAddProject}>Adicionar projeto</button>                
     </>
   );
}
export default App;