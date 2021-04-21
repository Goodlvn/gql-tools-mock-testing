import { useEffect } from "react";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphql } from "graphql";
import { resolvers, typeDefs } from "./resolvers";

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
      console.log("Productfy ProtoQuery", result)
    );
  };

  useEffect(() => {
    runQuery();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f5f7",
      }}
    >
      <img src="./images/productfy.png" alt="productfy logo" />
    </div>
  );
}

export default Mock;
