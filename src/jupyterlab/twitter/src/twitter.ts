import { ServerConnection } from '@jupyterlab/services'
import { URLExt } from '@jupyterlab/coreutils'

export interface TwitterAPI {
	code: number
}

function ServerRequest(url, method, req): Promise<Response> {
  let request = {
    method: method,
    body: JSON.stringify(req),
  }
  let setting = ServerConnection.makeSettings()
  let url_ext = URLExt.join(setting.baseUrl, url)
  return ServerConnection.makeRequest(url_ext, request, setting)
}

export class Twitter {

	public constructor() {
	}

	public async signout(): Promise<TwitterAPI> {
		try {
			var val = await ServerRequest('/twitter/signout', 'POST', {})
			if (val.status !== 200) {
        		return val.text().then(data => {
					throw new ServerConnection.ResponseError(val, data)
				})
			}
			return val.json()
		} catch(err) {
			console.error(err)
			throw ServerConnection.NetworkError
		}
	}
	
	public async twitterInfo(): Promise<any> {
		try {
			var val = await ServerRequest('/twitter/info', 'POST', {})
			if (val.status !== 200) {
        		return val.text().then(data => {
					console.log('---', data)
					throw new ServerConnection.ResponseError(val, data)
				})
			}
			return val.json()
		} catch(err) {
			console.error(err)
			throw ServerConnection.NetworkError
		}
	}

	public async post(tweet): Promise<any> {
		try {
			var val = await ServerRequest('/twitter/post', 'POST', tweet)
			if (val.status !== 200) {
        		return val.text().then(data => {
					throw new ServerConnection.ResponseError(val, data)
				})
			}
			return val.json()
		} catch(err) {
			console.error(err)
			throw ServerConnection.NetworkError
		}
	}

	public async api(path:string):Promise<TwitterAPI>{
		try {
			var val = await ServerRequest('/twitter/API', 'POST', {current_path: path})
			if (val.status !== 200) {
        		return val.text().then(data => {
					throw new ServerConnection.ResponseError(val, data)
				})
			}
			return val.json()
		} catch(err) {
			console.error(err)
			throw ServerConnection.NetworkError
		}
	}

	public init(path: string){
		return ServerRequest('/twitter/init', 'POST', { 'current_path': path })
	}

}
