import { stringify } from 'qs'
import * as queryString from 'query-string'

export class Outcome {
  success: boolean
}

export class Result<TValue> extends Outcome {
  result?: TValue
}

export const jsonOpt = { json: true }

export interface ClientOptions {
  name? : string
  url?: string
  path: string
  username?: string
  password?: string
}

export const defaultClientOptions: ClientOptions = {
  name: 'Default Client to localhost:8091',
  url: 'https://localhost:8091',
  path: 'api',
  username: '',
  password: ''
}

export interface IRestClient {
  readonly baseUri: string
  readonly baseParameters: {}
  readonly options: ClientOptions
  buildRequestUri(path: string, params?: {}): string
  get<TReturn>(reqParams: {}, config: any, path: string): Promise<TReturn>
  getOp<TReturn>(op: string, path: string): Promise<TReturn>
  post<TReturn>(body: {}, reqParams: {}, config: any, path: string): Promise<TReturn>
  postForm<TReturn>(body: {}, reqParams: {}, config: any, path: string): Promise<TReturn>
  put<TReturn>(body: {}, reqParams: {}, config: any, path: string): Promise<TReturn>
  delete<TReturn>(reqParams: {}, config: any, path: string): Promise<TReturn>
//  getStream(reqParams: {}, config: any, path: string): stream.Stream
}

export class RestClient implements IRestClient {
  public readonly baseUri: string
  public readonly baseParameters: {}
  public readonly options: ClientOptions

  public constructor(options?: ClientOptions) {
    this.options = { ...defaultClientOptions, ...options }
    this.baseUri = RestClient.createBaseUri(this.options)
    this.baseParameters = {
//      'username': this.options.username
    }
  }

  public async get<TReturn>(reqParams: {}, config: any, path: string): Promise<TReturn> {
    let uri: string = this.buildRequestUriWithParams(path, reqParams);
    return fetch(uri, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: new Headers({ 
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(this.options.username + ":" + this.options.password)
      })
    })
    .then(response => response.json() as any)
    .then(json => json as TReturn)
  }

  public async getOp<TReturn>(op: string, path: string): Promise<TReturn> {
    let params: {} = { op: op }
    let config: any = { json: true }
    return this.get<TReturn>(params, config, path)
  }

  public async post<TReturn>(body: {}, reqParams: {}, config: any, path: string): Promise<TReturn> {
    let uri: string = this.buildRequestUriWithParams(path, reqParams)
    return fetch(uri, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(this.options.username + ":" + this.options.password),
        "Access-Control-Allow-Origin": "*"
      })
    })
    .then(response => response.json() as any)
    .then(json => json as TReturn)
  }

  public async put<TReturn>(body: {}, reqParams: {}, config: any, path: string): Promise<TReturn> {
    let uri: string = this.buildRequestUriWithParams(path, reqParams)
    return fetch(uri, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(this.options.username + ":" + this.options.password)
      })
    })
    .then(response => response.json() as any)
    .then(json => json as TReturn)
  }

  public async postForm<TReturn>(body: {}, reqParams: {}, config: any, path: string): Promise<TReturn> {
    let uri: string = this.buildRequestUriWithParams(path, reqParams)
    return fetch(uri, {
      method: 'POST',
      mode: 'cors',
//      credentials: 'include',
      body: stringify(body),
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": "Basic " + btoa(this.options.username + ":" + this.options.password)
      })
    })
    .then(response => response.json() as any)
    .then(json => json as TReturn)
  }

  public async delete<TReturn>(reqParams: {}, config: any, path: string): Promise<TReturn> {
    let uri: string = this.buildRequestUriWithParams(path, reqParams)
    return fetch(uri, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(this.options.username + ":" + this.options.password)
      })
    })
    .then(response => response.json() as any)
    .then(json => json as TReturn)
  }
/*
  public getStream(reqParams: {}, config: any, path: string): stream.Stream {
    let uri: string = this.BuildRequestUri(path, reqParams);
//    return getRequest(uri, config);
    return response = fetch(uri, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(this.options.username + ":" + this.options.password)
        })
      })
    .then(response => response.body as stream.Stream)
  }
*/
public buildRequestUri(path: string): string {
    path = path || ''
    if (path[0] === '/') {
      path = path.substr(1)
    }
    let uri = `${this.baseUri}${path}`
    if (uri.endsWith("/")) {
      uri = uri.substring(0, uri.length -1)
    }
    return uri
  }

  public buildRequestUriWithParams(path: string, params?: {}): string {
    let uri = this.buildRequestUri(path)
    params = params || {}
    let reqparams: {} = { ...this.baseParameters, ...params }
    let ps = queryString.stringify(reqparams)
    if (ps != '') {
      uri = `${uri}?${ps}`
    }
    return uri
  }

  private static createBaseUri(options: ClientOptions): string {
    if (options.path !== undefined && options.path !== null) {
      if (options.path[options.path.length - 1] !== '/') {
        options.path = options.path + '/'
      }
      if (options.path[0] === '/') {
        options.path = options.path.substring(1)
      }
    }
    const baseUri = `${options.url}/${options.path}`
    return baseUri
  }

}
