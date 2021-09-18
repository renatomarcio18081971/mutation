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
    type Usuario {
        id: Int
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
        perfil: Perfil
        status: UsuarioStatus
    }

    type Perfil {
        id: Int!
        nome: String!
    }

    #ponto de entrada da consulta
    type Query {
        usuarioLogado: Usuario
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
        perfil(usuario){
            const selecao = perfis.filter(a => a.id === usuario.perfil_id)
            return selecao ? selecao[0] : null
        }
    },
    Query: {
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