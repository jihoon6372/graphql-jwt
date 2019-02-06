const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

// Define our schema using the GraphQL schema language
const typeDefs = `
    type User {
        id: Int!
        username: String!
        email: String!
    }

    type Post { 
        id: Int!
        title: String
        replies: [Reply]
        createdAt: String!
        updatedAt: String!
    }

    type Reply {
        id: Int!
        postId: Int!
        writer: Int!
        content: String!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        me: User
        posts: [Post]
        replies: [Reply]
    }

    type Mutation {
        signup (username: String!, email: String!, password: String!): String
        login (email: String!, password: String!): String
        create (title: String): Post
        comment (id: Int!, content: String!): Reply
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
