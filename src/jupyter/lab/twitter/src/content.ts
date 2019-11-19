import { ServerConnection } from '@jupyterlab/services'
import { URLExt } from '@jupyterlab/coreutils'

export interface ContentAPI {
	code: number
}

function ServerRequest(URL, METHOD, REQUEST): Promise<Response> {
  let request = {
    method: METHOD,
    body: JSON.stringify(REQUEST),
  };
  let setting = ServerConnection.makeSettings();
  let url = URLExt.join(setting.baseUrl, URL);
  return ServerConnection.makeRequest(url, request, setting)
}

export class Content {

	public constructor() {
	}

	public async getContent(path): Promise<ContentAPI> {
		try {
			var val = await ServerRequest('/content', 'POST', {path: path})
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

}
