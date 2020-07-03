
const express = require('express');
const cors = require('cors');
//uuid > gera um id automatico
//isUuid > verifica se o id é valido
const {uuid, isUuid} = require('uuidv4');

const app = express();
app.use(cors());
//para que o express consiga entender a reqisição no formato JSON
//enterder o que esta sendo criado no POST lá em baixo;
app.use(express.json());

const projects = [];

//inserindo um middlewares
function logRequests (request, response, next){
    const{ method, url} = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();//proximo middleware

    console.timeEnd(logLabel);
}

function validateProjectId(request, response, next){
    const{id} = request.params;//parametros routes params qe ve atraves das rotas PUT e DELETE
    if(!isUuid(id)){//! =  se não for uma id valido
        /*dentro do mindlewares quando é feito um return q não é o return do next()
        ele interrompe totalmente a requisição caso ele não valide o ID*/
        return response.status(400).json({error:'Invalid project ID'});
    }

    //se o ID passar ai chama o next(), ou seja proxima rota
    return next();
    
}
app.use(logRequests);
app.use('/projects/:id',validateProjectId);





//buscando informação
app.get('/projects', (request,response)=>{
    //const query = request.query
    const {title} = request.query
    //console.log(title);
    //console.log(name);

    const results = title ? projects.filter(project => project.title.includes(title) )
    :projects;

    return response.json(results);
});

//criando informação
app.post('/projects', (request,response)=>{
    const {title,owner} = request.body;
    //console.log(title);
    //console.log(owner);
    const project = {id: uuid(),title, owner};

    //pegando o vetor criado la em cima de projetos
    //push joga o novo projeto criado no final do array
    projects.push(project)
    // peço p mostrar apenas o novo projecto inserido
    return response.json(project);
});
//atualizando informação(deve ser passado o id do projeto q vai ser alterado)
app.put('/projects/:id', (request,response)=>{
    const {id} = request.params;
    const {title,owner} = request.body;
    //console.log(id);

    //findIndex = serve para pecorrer o array e trazer o indice do projeto
    const projectIndex = projects.findIndex(project => project.id ===id);

    //status= função para trocar o codigo de erro 
    if(projectIndex < 0){
        return response.status(400).json({error:'project not found.'})
    }

    const project = {
        id,
        title,
        owner,
    };
    //vai dentro do array de projects e procura a posição projectIndex e substitui pelo objeto project

    projects[projectIndex] = project;

    return response.json(project);
});

//excluindo informação(deve ser passado o id do projeto q vai ser excluido)
app.delete('/projects/:id',(request,response)=>{
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id ===id);

    //status= função para trocar o codigo de erro 
    if(projectIndex < 0){
        return response.status(400).json({error:'project not found.'})
    }
    //splice= metodo para tirar alguma informação de dentro do array
    //projectInex > qual o index que quero remover
    //1 = quantas posições eu quero remover apartir do indice
    // 1 = removerá apenas a informação q está contida no indice
    projects.splice(projectIndex, 1);

    //send() > retornara em branco
    //status(204)codigo quando retorno uma respota sem conteudo
    return response.status(204).send();
});

//Metodos POST,PUT E DELETE não pode ser simulado pelo navegador é necessário usar o insomnia.


app.listen(3333, () => {
    console.log('✅Back-end started');
});//3333(porta)
