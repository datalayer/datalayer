import { ClientOptions, RestClient } from './../../../util/rest/RestClient'
import { IHdfsClient } from './HdfsClient'
import { HdfsClient } from './HdfsClient'

export class HdfsClientFactory {
    public static create(options?: ClientOptions): IHdfsClient {
        return new HdfsClient(new RestClient(options))
    }
}
