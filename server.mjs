import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const app = express()
const port = 8080

const Types = new GraphQLObjectType({
    name: "Types",
    fields: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        dev: { type: GraphQLBoolean },
        price: { type: GraphQLFloat }
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
        types: {
            type: Types,
            resolve: () => {
                return {
                    name: "Suresh GV",
                    age: 26,
                    dev: true,
                    price: 102.35
                }
            }
        },
        List: {
            type: new GraphQLList(Types),
            resolve: () => {
                return [
                    {
                        name: "Suresh GV",
                        age: 26,
                        dev: true,
                        price: 102.35
                    },
                    {
                        name: "Pradeep K",
                        age: 25,
                        dev: false,
                        price: 50.35
                    }
                ]
            }
        }
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
