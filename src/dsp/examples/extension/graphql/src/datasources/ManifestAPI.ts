import { RESTDataSource } from 'apollo-datasource-rest'
import { Manifest } from '../types'

export default class ManifestAPI extends RESTDataSource {

  constructor() {
    super()
    this.baseURL = 'http://localhost:3000'
  }

  async getManifests(): Promise<Manifest[]> {
    const response = await this.get('/manifests')
    return response
  }

  async getManifest(id: number): Promise<Manifest> {
    const response = await this.get(`/manifests/${id}`)
    return response
  }

}
