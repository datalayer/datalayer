import ServiceAPI from "./datasources/ServiceAPI"
import ManifestAPI from "./datasources/ManifestAPI"
import { Manifest, Service, CreateServiceInput } from './types'

interface DataSources {
  serviceAPI: ServiceAPI
  manifestAPI: ManifestAPI
}

const resolvers = {
  Query: {
    services: (_: null, __: null, { dataSources }: { dataSources: DataSources }): Promise<Service[]> => {
      return dataSources.serviceAPI.getServices()
    },
    service: (_: null, { id }: { id: number }, { dataSources }: { dataSources: DataSources }): Promise<Service> => {
      return dataSources.serviceAPI.getService(id)
    },
    manifests: (_: null, __: null, { dataSources }: { dataSources: DataSources }): Promise<Manifest[]> => {
      return dataSources.manifestAPI.getManifests()
    },
    manifest: (_: null, { id }: { id: number }, { dataSources }: { dataSources: DataSources }): Promise<Manifest> => {
      return dataSources.manifestAPI.getManifest(id)
    },
  },

  Service: {
    manifest({ manifestId }: { manifestId: number }, _: null, { dataSources }: { dataSources: DataSources }): Promise<Manifest> {
      return dataSources.manifestAPI.getManifest(manifestId)
    }
  },

  Mutation: {
    createService: async (_: null, { input }: { input: CreateServiceInput }, { dataSources }: { dataSources: DataSources }): Promise<Service> => {
      const service = dataSources.serviceAPI.createService(input)
      return service
    }
  }
}

export default resolvers
