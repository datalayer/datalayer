import { gql } from 'apollo-server'

const typeDefs = gql`
  input CreateServiceInput {
    name: String
    manifest: String
  }

  type Mutation {
    createService(input: CreateServiceInput): Service
  }
`

export default typeDefs
