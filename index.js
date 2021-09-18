const { ApolloServer, gql } = require('apollo-server')

const usuarios = [
    {
        id: 1,
        nome: 'renato',
        email: 'renato@teste',
        idade: 50,
        perfil_id: 2,
        status: 'ATIVO'
    },
    {
        id: 2,
        nome: 'marcio',
        email: 'marcio@teste',
        idade: 51,
        perfil_id: 1,
        status: 'INATIVO'
    },
    {
        id: 3,
        nome: 'silva',
        email: 'silva@teste',
        idade: 52,
        perfil_id: 1,
        status: 'BLOQUEADO'
    }
]

const perfis = [
    {
        id: 1,
        nome: 'comum'
    },
    {
        id: 2,
        nome: 'administrador'
    }
]

const typeDefs = gql`
    scalar Date

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Usuario {
        id: Int
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
        nomeMaisIdade: String
        perfil: Perfil
        status: UsuarioStatus
    }

    type Perfil {
        id: Int!
        nome: String!
    }

    #ponto de entrada da consulta
    type Query {
        ola: String!
        horaCerta: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numeroMegaSena: [Int]!
        usuarios: [Usuario]!
        usuario(id: Int): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil
    }

    enum UsuarioStatus {
        ATIVO,
        INATIVO,
        BLOQUEADO
    }

`
const resolvers = {
    Usuario: {
        salario(usuario){
            return (usuario.salario_real * 2) /2
        },
        nomeMaisIdade(usuario){
            return usuario.nome + ' - ' + usuario.idade
        },
        perfil(usuario){
            const selecao = perfis.filter(a => a.id === usuario.perfil_id)
            return selecao ? selecao[0] : null
        }
    },
    Produto: {
        precoComDesconto(produto){
            return produto.preco - ((produto.preco * produto.desconto) / 100)
        }
    },
    Query: {
        ola(){
            return 'Bom dia !!!!'
        },
        horaCerta() {
            var agora = new Date()
            return `${new Date()}`
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: "dora",
                email: "dora.teste@gmail.com",
                idade: 54,
                salario_real: 6000,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: "Guarana",
                preco: 35.50,
                desconto: 10
            }
        },
        numeroMegaSena() {
            return [10, 20, 30, 40, 50, 60]
        },
        usuarios() {
            return usuarios
        },
        usuario(_, { id }){
            const selecao = usuarios.filter( a => a.id === id)
            return selecao ? selecao[0] : null
        },
        perfis() {
            return perfis
        },
        perfil(_, { id }){
            const selecao = perfis.filter(a => a.id === id)
            return selecao ? selecao[0] : null
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(url)
})