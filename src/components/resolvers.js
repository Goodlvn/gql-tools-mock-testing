import { find, filter } from "lodash";
// import faker from "faker";

export const typeDefs = `

type Name {
    id: Int!
    firstName: String
    lastName: String
    person: Person
}

type Person {
    id: Int!
    name: Name
    finSightProfile: FinSightProfile
}

type FinSightProfile {
    id: Int!
    person: Person
}

# the schema allows the following query:
type Query {
    finSightProfile: [FinSightProfile]
    person(id: Int!): Person
    name(id: Int!): Name
  }
`;

const names = [
  { id: 1, firstName: "Ted", lastName: "Lasso" },
  { id: 2, firstName: "Mike", lastName: "Winnet" },
];

const persons = [
  { id: 1, nameId: 1 },
  { id: 2, nameId: 2 },
];

const finSightProfiles = [{ id: 1, personId: 1 }];

export const resolvers = {
  Query: {
    finSightProfile: () => finSightProfiles,
    person: (_, { id }) => find(persons, { id }),
    name: (_, { id }) => find(names, { id }),
  },

  Name: {
    person: (name) => filter(persons, { nameId: names.id }),
  },

  Person: {
    finSightProfile: (person) =>
      find(finSightProfiles, { personId: person.id }),
    name: (person) => find(names, { id: person.nameId }),
  },

  FinSightProfile: {
    person: (finSightProfile) =>
      find(persons, { id: finSightProfile.personId }),
  },
};

// Testing Faker.js
// const ranName = faker.name.findName();
// const ranEmail = faker.internet.email();
// const ranAddress = faker.address.streetAddress();
// const ranAccount = faker.finance.account();
// const ranCC = faker.finance.creditCardNumber();

// console.log(`random name ${ranName}`);
// console.log(`random email ${ranEmail}`);
// console.log(`random address ${ranAddress}`);
// console.log(`random account number ${ranAccount}`);
// console.log(`random credit card number ${ranCC}`);
