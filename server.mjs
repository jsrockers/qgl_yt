import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const app = express()
const port = 8080

const query = new GraphQLObjectType({
    name: "RootQuery",
    fields:{
        hello: { 
            type: GraphQLString,
            resolve: () => {
                return `Hello world`
            }
        }
    }
})

const schema = new GraphQLSchema({
    query
})

app.use('/graphql', graphqlHTTP((req, res) =>({
    schema,
    graphiql: true
})))

app.listen(port, () => console.log(`server running on port ${port}`))
