import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'
import resolvers from './resolvers'
import ServiceAPI from './datasources/ServiceAPI'
import ManifestAPI from './datasources/ManifestAPI'

const typeDefs = importSchema('src/graphql/schema.graphql')

// The ApolloServer constructor requires two parameters:
// your schema definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: (): { serviceAPI: ServiceAPI, manifestAPI: ManifestAPI } => ({
    serviceAPI: new ServiceAPI(),
    manifestAPI: new ManifestAPI()
  })
})

// The `listen` method launches a web server.
server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
})
