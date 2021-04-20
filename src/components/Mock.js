// import react from "react";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql";
import resolvers from "./resolvers";

function Mock() {
  const schemaString = `
    type Author {
      id: Int!
      firstName: String
      lastName: String
      """
      the list of Posts by this author
      """
      posts: [Post]
    }

    type Post {
      id: Int!
      title: String
      author: Author
      votes: Int
      melon: Boolean
    }

    # the schema allows the following query:
    type Query {
      posts: [Post]
      author(id: Int!): Author
    }

    # this schema allows the following mutation:
    type Mutation {
      upvotePost (
        postId: Int!
      ): Post
    }
    `;
  const schema = makeExecutableSchema({ typeDefs: schemaString });

  const schemaWithMocks = addMocksToSchema({ schema });

  const query = `
  query Post {
      posts  {
          id
          title
          author {
              id
          }
          votes
          melon
      }
  }
  `;

  graphql(schemaWithMocks, query).then((result) =>
    console.log("Got result", result)
  );

  return (
    <div>
      <p>This is a test for mocking GraphQL Schema</p>
    </div>
  );
}

export default Mock;
