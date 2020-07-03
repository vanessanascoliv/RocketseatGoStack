

const path = require('path');

module.exports = {
    entry:path.resolve(__dirname,'src','index.js'),
    output:{
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
  
    devServer:{
        contentBase:path.resolve(__dirname, 'public'),
    },

module:{
    rules:[
        {
            test:/\.js$/,
            exclude:/node_modules/,
            use:{
                loader: 'babel-loader',
            }
        },
        {
            test:/\.css$/,
            exclude:/node_modules/,
            use:[
                {loader:'style-loader'},//pega o css interpretado pelo css-loader e joga dentro do HTML
                {loader:'css-loader'},//ler o arquivo css e vai interpretar as importações que tem lá dentro tipo imagens c background
            ]

        },
        {   // * = qtos caracteres quizer 
            //i = se a extensão da imagem for maiscula ou minuscula ela caia em case sensiteve
            test:/.*\.(gif|png|jpe?g)$/i,
            use:{
                loader:'file-loader',
            }

        },
    ]
}
    
}