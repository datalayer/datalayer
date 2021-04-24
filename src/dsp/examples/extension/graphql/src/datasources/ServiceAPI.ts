import { RESTDataSource } from 'apollo-datasource-rest'
import { Service, CreateServiceInput } from '../types'

export default class ServiceAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000'
  }

  async getServices(): Promise<Service[]> {
    return await this.get('/services')
  }

  async getService(id: number): Promise<Service> {
    const response = await this.get(`/services/${id}`)
    return response
  }
  
  async createService(input: CreateServiceInput): Promise<Service> {
    return await this.post('/services', { name: input.name, manifestId: input.manifestId })
  }

}
