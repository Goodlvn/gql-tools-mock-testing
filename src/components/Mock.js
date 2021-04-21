// import react from "react";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql";
import { resolvers, typeDefs } from "./resolvers";

function Mock() {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  //   const schemaWithMocks = addMocksToSchema({ schema });

  const query = `
    query {
        posts  {
            id
            title
            votes
            melon
        }
    }
    `;

  graphql(schema, query).then((result) => console.log("Got result", result));

  return (
    <div>
      <p>This is a test for mocking GraphQL Schema</p>
    </div>
  );
}

export default Mock;
