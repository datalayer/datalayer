import { IHdfsClient } from './client/HdfsClient'
import { HdfsClientFactory } from './client/HdfsClientFactory'
import { FileStatusProperties } from './client/HdfsClient'
import { Result } from './../../util/rest/RestClient'

export default class HdfsApi {
  private hdfsClient: IHdfsClient
//  private fileStatuses: Array<FileStatusProperties>

  public constructor(props) {
    this.hdfsClient = HdfsClientFactory.create({
      url: "",
      path: 'webhdfs/v1',
      username: ''
    })
  }

  async listStatus(path: string) {
    let out: Promise<Result<FileStatusProperties[]>>
    out = this.hdfsClient.listStatus(path)
    return out
  }

}
