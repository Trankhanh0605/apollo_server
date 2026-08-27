const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const {v1: uuid}=require('uuid')

let persons=require('./persons')

const typeDefs = /* GraphQL */ `
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }  

  type Mutation {
    addPerson(
    name: String!
    phone: String
    street: String!
    city: String!
  ): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  },

  Person: {
    address:({street, city}) =>{
      return {
        street: street,
        city: city
      }
    }
  },

  Mutation: {
    addPerson: (root, args)=>{
      const person={...args, id: uuid()}
      persons=persons.push(person)
      return person
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})