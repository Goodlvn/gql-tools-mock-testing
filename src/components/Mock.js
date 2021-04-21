import { useEffect } from "react";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql";
import { resolvers, typeDefs } from "./resolvers";
// import { resolvers, typeDefs } from "./resolversControl";

function Mock() {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const schemaWithMocks = addMocksToSchema({
    schema,
    mocks: {},
    preserveResolvers: true,
  });

  const query = `
          query {
              finSightProfile {
                  person {
                      name {
                          firstName
                          lastName 
                      }
                  }
              }
          }
  `;

  const runQuery = () => {
    graphql(schemaWithMocks, query).then((result) =>
      console.log("Got result", result)
    );
  };

  useEffect(() => {
    runQuery();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <p>This is a test for mocking GraphQL Schema</p>
    </div>
  );
}

export default Mock;
