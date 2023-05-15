import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const app = express()
const port = 8080

const EmployeeType = new GraphQLObjectType({
    name: "Employee",
    fields: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        dev: { type: GraphQLBoolean },
        price: { type: GraphQLFloat },
        company: {
            type: new GraphQLObjectType({
                name: "Company",
                fields: {
                    name: { type: GraphQLString },
                    id: { type: GraphQLString },
                    description: { type: GraphQLString },
                }
            }),
        }
    }
})

const query = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return `Hello world`
            }
        },
        employee: {
            type: EmployeeType,
            resolve: () => {
                return {
                    name: "Suresh GV",
                    age: 26,
                    dev: true,
                    price: 102.35,
                    company: {
                        name: "Company 1",
                        id: "1",
                        description: "A serviece base company"
                    }
                }
            }
        },
    }
})

const schema = new GraphQLSchema({
    query
})

app.use('/graphql', graphqlHTTP((req, res) => ({
    schema,
    graphiql: true
})))

app.listen(port, () => console.log(`server running on port ${port}`))
