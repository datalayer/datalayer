import * as stream from 'stream'
import { RestClient, Result, Outcome } from './../../../util/rest/RestClient'

export type FileStatusType = 'FILE' | 'DIRECTORY' | 'SYMLINK';

export interface CreateFileOptions {
  blockSize?: number
  bufferSize?: number
  permissionOctal?: string
  overwrite?: boolean
  replication?: number
}

export interface OpenFileOptions {
  offset?: number
  length?: number
  bufferSize?: number
}

export interface FileStatusProperties {
  accessType: number
  blockSize: number
  group: string
  length: number
  modificationTime: number
  owner: string
  pathSuffix: string
  permission: string
  replication: number
  symlink: string
  type: FileStatusType
}

export interface FileChecksum {
  algorithm: string
  bytes: string
  length: number  
}

export interface ContentSummary {
  directoryCount: number
  fileCount: number
  length: number
  quota: number
  spaceConsumed: number
  spaceQuota: number
}

export interface BooleanResponse {
  boolean: boolean
}

export interface Token {
  urlString: string
}

export interface IHdfsClient {
  append(file: stream.Stream, path: string, bufferSize?: number): Promise<Outcome>
  createFile(
    file: stream.Stream,
    path: string,
    options?: CreateFileOptions
  ): Promise<Result<string>>
  delete(path: string, recursive?: boolean): Promise<Outcome>
  exists(path: string): Promise<Outcome>
  getContentSummary(path: string): Promise<Result<ContentSummary>>
  getDelegationToken(renewer: string): Promise<Result<Token>>
  getFileChecksum(path: string): Promise<Result<FileChecksum>>
  getFileStatus(path: string): Promise<Result<FileStatusProperties>>
  getHomeDirectory(): Promise<Result<string>>
  listStatus(path: string): Promise<Result<FileStatusProperties[]>>
  makeDirectory(path: string, permissionOctal?: string): Promise<Outcome>
//  OopenFile(path: string, options?: OpenFileOptions): stream.Stream
  rename(source: string, destination: string): Promise<Outcome>
}

export class HdfsClient implements IHdfsClient {
  private readonly jsonOpt = { json: true }
  private readonly restClient: RestClient

  public constructor(restClient: RestClient) {
    this.restClient = restClient
  }

  public async append(file: stream.Stream, path: string, bufferSize?: number): Promise<Outcome> {
//    const op: string = 'APPEND'
//    const locHeader: string = 'location'
//    const reqParams = { op, bufferSize }
//    const uri = this.restClient.buildRequestUriWithParams(path, reqParams)

    return this.wrapOutcome(async () => {
      // two-part creation per docs
      // reference: http://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/Hdfs.html#Append_to_a_File
//      let request1 = await post(uri, this.jsonOpt);
/*
      const request1 = await fetch(uri, {
        method: "POST",
        body: JSON.stringify({}),
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
      const dataUri = request1.headers[locHeader];
//      let request2 = post(dataUri, this.jsonOpt)
//      file.pipe(request2.body)
*/
/*
      const request2 = await fetch(dataUri, {
        method: "POST",
        body: file,
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
      await request2
*/      
      return true
    })
  }


  public async createFile(file: stream.Stream, path: string, options?: CreateFileOptions): Promise<Result<string>> {
    const op: string = 'CREATE'
    const locHeader: string = 'location'

    options = options || {};
    let parameters: {} = {
      blocksize: options.blockSize,
      buffersize: options.bufferSize,
      overwrite: options.overwrite,
      permission: options.permissionOctal,
      replication: options.replication,
      op: op,
      noredirect: true
    }
/*
    let requestOpts: RequestPromiseOptions = {
      followRedirect: false,
      followAllRedirects: false,
      resolveWithFullResponse: true,
      simple: false
    }
*/
    let success: boolean = false
    let location: string = ''
    try {
      // two-part creation per docs
      // reference: https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/Hdfs.html#Create_and_Write_to_a_File
      let uri = this.restClient.buildRequestUriWithParams(path, parameters)
//      let req1: RequestResponse = await put(uri, requestOpts)
/*
      const req1 = await fetch(uri, {
        method: "PUT",
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
*/
      //      let dataUri = req1.headers[locHeader]
//      let req2 = put(dataUri, requestOpts)
//      file.pipe(req2)
/*
      const req2 = await fetch(uri, {
        method: "PUT",
        body: file,
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
      let response: Response = await req2
      location = response.headers[locHeader]
      success = location !== null
    } 
    catch (error) {
      success = false
    }
*/
    let result = new Result<string>()
    result.success = success
    result.result = location
    return result
  }

  public async delete(path: string, recursive: boolean = false): Promise<Outcome> {
    const op: string = 'DELETE'
    const reqParams = { op, recursive }
    return this.wrapOutcome(async () => {
      let raw = await this.restClient.delete<BooleanResponse>(reqParams, this.jsonOpt, path)
      return raw.boolean
    })
  }

  public async exists(path: string): Promise<Outcome> {
    return this.wrapOutcome(async () => {
      let stat = await this.getFileStatus(path);
      return stat !== undefined && stat.success;
    })
  }

  public async getContentSummary(path: string): Promise<Result<ContentSummary>> {
    interface ContentSummaryResponse {
      ContentSummary: ContentSummary
    }
    const op: string = 'GETCONTENTSUMMARY'
    return this.wrapResult<ContentSummaryResponse, ContentSummary>(
      r => r.ContentSummary,
      async () => this.restClient.getOp<ContentSummaryResponse>(op, path)
    )
  }

  public async getDelegationToken(renewer: string): Promise<Result<Token>> {
    interface DelegationTokenResponse {
      Token: Token
    }
    const op: string = 'GETDELEGATIONTOKEN'
    let params = { op: op, renewer: renewer }
    return this.wrapResult<DelegationTokenResponse, Token>(
      r => r.Token,
      async () => this.restClient.get<DelegationTokenResponse>(params, this.jsonOpt, '')
    )
  }

  public async getFileChecksum(path: string): Promise<Result<FileChecksum>> {
    interface FileChecksumResponse {
      FileChecksum: FileChecksum;
    }
    const op: string = 'GETFILECHECKSUM';
    return this.wrapResult<FileChecksumResponse, FileChecksum>(
      r => r.FileChecksum,
      async () => this.restClient.getOp<FileChecksumResponse>(op, path)
    )
  }

  public async getFileStatus(path: string): Promise<Result<FileStatusProperties>> {
    interface FileStatus {
      FileStatus: FileStatusProperties;
    }
    const op: string = 'GETFILESTATUS';
    return this.wrapResult<FileStatus, FileStatusProperties>(
      r => r.FileStatus,
      async () => this.restClient.getOp<FileStatus>(op, path)
    )
  }

  public async getHomeDirectory(): Promise<Result<string>> {
    interface HomeDirectoryResponse {
      Path: string;
    }
    const op: string = 'GETHOMEDIRECTORY';
    return this.wrapResult<HomeDirectoryResponse, string>(
      r => r.Path,
      async () => this.restClient.getOp<HomeDirectoryResponse>(op, '')
    )
  }

  public async listStatus(path: string): Promise<Result<FileStatusProperties[]>> {
    interface ListStatusResponse {
      FileStatuses: {
        FileStatus: FileStatusProperties[]
      }
    }
    const op: string = 'LISTSTATUS';
    return this.wrapResult<ListStatusResponse, FileStatusProperties[]>(
      r => r.FileStatuses.FileStatus,
      async () => this.restClient.getOp<ListStatusResponse>(op, path)
    )
  }

  public async makeDirectory(path: string, permissionOctal?: string): Promise<Outcome> {
    const op: string = 'MKDIRS'
    let reqParams = { op, permission: permissionOctal }
    return this.wrapOutcome(async () => {
      let raw = await this.restClient.put<BooleanResponse>(reqParams, this.jsonOpt, path, '')
      return raw.boolean
    });
  }
/*
  public openFile(
    path: string,
    options?: OpenFileOptions
  ): stream.Stream {
    options = options || {};
    let param: {} = {
      op: 'OPEN',
      buffersize: options.BufferSize,
      length: options.Length,
      offset: options.Offset,
    };

    let coreOptions = {
      followRedirect: true
    };
    return this.restClient.GetStream(param, coreOptions, path);
  }
*/
  public async rename(source: string, destination: string): Promise<Outcome> {
    const op: string = 'RENAME'
    let reqParam = { op, destination }
    return this.wrapOutcome(async () => {
      let raw = await this.restClient.put<BooleanResponse>(reqParam, this.jsonOpt, source, '')
      return raw.boolean
    })
  }

  private async wrapOutcome(action: () => Promise<boolean>): Promise<Outcome> {
    let outcome = new Outcome()
    try {
      outcome.success = await action()
    } catch (error) {
      outcome.success = false
    }
    return outcome
  }

  private async wrapResult<TRaw, TOut>(selector: (input: TRaw) => TOut, action: () => Promise<TRaw>): Promise<Result<TOut>> {
    let result: Result<TOut> = new Result<TOut>()
    try {
      let raw = await action()
      let selection = selector(raw)
      result.success = raw !== undefined && selection !== undefined
      result.result = selection
    } catch (error) {
      result.success = false
    }
    return result
  }

}
  