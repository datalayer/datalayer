import { ServerConnection } from '@jupyterlab/services';
import { URLExt } from '@jupyterlab/coreutils';
import '../style/index.css';

export interface TwitterAPI {
	code: number;
	data?:{
		showtoplevel?: TwitterShowTopLevelResult;
		branch?: TwitterBranchResult;
		log?: TwitterLogResult;
		status?: TwitterStatusResult;
	}
}

export interface TwitterShowTopLevelResult {
	code: number;
	top_repo_path?: string;
}
export interface TwitterShowPrefixResult {
	code: number;
	under_repo_path?: string;
}
export interface TwitterCheckoutResult {
	code: number;
	message?: string;
}
export interface TwitterBranchResult {
	code: number;
	branches?: [
            {
                current: boolean,
                remote: boolean,
				name: string,
				tag: string,
            }
        ]
}

export interface TwitterStatusFileResult{
    x: string,
    y: string,
    to: string,
    from: string
}

export interface TwitterStatusResult {
	code: number;
	files?: [
            TwitterStatusFileResult
        ]
}

export interface SingleCommitInfo {
    commit: string,
    author: string,
    date: string,
	commit_msg: string,
	pre_commit: string;
}

export interface CommitModifiedFile{
	modified_file_path: string,
	modified_file_name: string,
	insertion: string,
	deletion: string
}

export interface SingleCommitFilePathInfo {
	code:number;
	modified_file_note?: string,
	modified_files_count?: string,
	number_of_insertions?: string,
	number_of_deletions?: string,
	modified_files?: [
		CommitModifiedFile
	]
}

export interface TwitterLogResult {
	code: number;
	commits?: [
			SingleCommitInfo
        ]
}

function HTTP_Twitter_Request(URL, METHOD, REQUEST): Promise<Response> {
  let request = {
    method: METHOD,
    body: JSON.stringify(REQUEST),
  };
  let setting = ServerConnection.makeSettings();
  let url = URLExt.join(setting.baseUrl, URL);
  return ServerConnection.makeRequest(url, request, setting);
}

export class Twitter {

	public constructor() {
	}

	async signout(): Promise<TwitterAPI> {
		try {
			var val = await HTTP_Twitter_Request('/twitter/signout', 'POST', {});
			if (val.status !== 200) {
        		return val.text().then(data=>{
					throw new ServerConnection.ResponseError(val, data);
				})
			}
			return val.json();
		} catch(err){
			console.error(err)
			throw ServerConnection.NetworkError;
		}
	}
	
	async twitterInfo(): Promise<any> {
		try {
			var val = await HTTP_Twitter_Request('/twitter/info', 'POST', {});
			if (val.status !== 200) {
        		return val.text().then(data=>{
					throw new ServerConnection.ResponseError(val, data);
				})
			}
			return val.json();
		} catch(err){
			console.error(err)
			throw ServerConnection.NetworkError;
		}
	}

	async api(path:string):Promise<TwitterAPI>{
		try {
			var val = await HTTP_Twitter_Request('/twitter/API', 'POST', {"current_path": path});
			if (val.status !== 200) {
        		return val.text().then(data=>{
					throw new ServerConnection.ResponseError(val, data);
				})
			}
			return val.json();
		} catch(err){
			console.error(err)
			throw ServerConnection.NetworkError;
		}
	}

	async showtoplevel(path:string):Promise<TwitterShowTopLevelResult>{
		try{
			var val = await HTTP_Twitter_Request('/twitter/showtoplevel','POST',{"current_path": path});
			if (val.status !== 200) {
				  return val.json().then(data=>{
					throw new ServerConnection.ResponseError(val, data.message);
				})
			}
			return val.json();
		}catch(err){
			console.error(err)
			throw ServerConnection.NetworkError;
		}
	}

	async showprefix(path:string):Promise<TwitterShowPrefixResult>{
		try{
			var val = await HTTP_Twitter_Request('/twitter/showprefix','POST',{"current_path": path});
			if (val.status !== 200) {
        		return val.json().then(data=>{
					throw new ServerConnection.ResponseError(val, data.message);
				})
			}
			return val.json();
		}catch(err){
			console.error(err)
			throw ServerConnection.NetworkError;
		}
	}

	async status(path: string):Promise<TwitterStatusResult> {
		try{
			var val = await HTTP_Twitter_Request('/twitter/status','POST',{"current_path":path});
			if (val.status !== 200) {
        		return val.json().then(data=>{
					throw new ServerConnection.ResponseError(val, data.message);
				})
			}
			return val.json();
		}catch(err){
			console.error(err)
			throw ServerConnection.NetworkError;
		}
	}

	async log(path: string):Promise<TwitterLogResult> {
		try{
			var val = await HTTP_Twitter_Request('/twitter/log', 'POST', {"current_path": path});
			if(val.status!== 200) {
        		return val.json().then(data=>{
					throw new ServerConnection.ResponseError(val, data.message);
				})
			}
			return val.json();
		} catch (err) {
			throw ServerConnection.NetworkError;
		}
	}

	async log_1(hash: string, path: string):Promise<SingleCommitFilePathInfo> {
		try{
			var val = await HTTP_Twitter_Request('/twitter/log_1', 'POST', {"selected_hash":hash,"current_path": path});
			if(val.status!== 200) {
        		return val.json().then(data=>{
					throw new ServerConnection.ResponseError(val, data.message);
				})
			}
			return val.json();
		} catch (err) {
			throw ServerConnection.NetworkError;
		}
	}

	async branch(path: string): Promise<TwitterBranchResult>{
		try{
			var val = await HTTP_Twitter_Request('/twitter/branch','POST',{"current_path":path});
			if (val.status !== 200) {
        		return val.json().then(data=>{
					throw new ServerConnection.ResponseError(val, data.message);
				})
			}
			return val.json();
		}catch(err){
			console.error(err)
			throw ServerConnection.NetworkError;
		}
	}

	add(check: boolean, filename: string, path: string) {
		return  HTTP_Twitter_Request('/twitter/add','POST',{"add_all": check , "filename":filename, "top_repo_path": path});
	}

	async add_all_untracked(path: string){
		try {
			var val =  await HTTP_Twitter_Request('/twitter/add_all_untracked','POST',{"top_repo_path": path});
			if (val.status !== 200) {
        		return val.json().then(data=>{
					throw new ServerConnection.ResponseError(val, data.message);
				})
			}
			return val.json();
		} catch(err) {
			console.error(err)
			throw ServerConnection.NetworkError;
		}		
	}

	async checkout(checkout_branch: boolean, new_check: boolean, branchname: string, checkout_all: boolean, filename: string,  path: string):Promise<TwitterCheckoutResult> {
		try {
			var val =  await HTTP_Twitter_Request('/twitter/checkout','POST',{"checkout_branch": checkout_branch, "new_check": new_check, "branchname":branchname, "checkout_all": checkout_all , "filename":filename, "top_repo_path": path});
			if (val.status !== 200) {
        		return val.json().then(data=>{
					throw new ServerConnection.ResponseError(val, data.message);
				})
			}
			return val.json();
		} catch(err) {
			throw ServerConnection.NetworkError;
		}
	}

	commit(message: string, path: string) {
		return HTTP_Twitter_Request('/twitter/commit','POST',{"commit_msg":message, "top_repo_path": path});
	}

	reset(check: boolean, filename: string, path: string) {
		return HTTP_Twitter_Request('/twitter/reset','POST',{"reset_all": check, "filename":filename, "top_repo_path": path});
	}

	async pull(origin: string, master: string, path:string) {
		try {
			var val = await HTTP_Twitter_Request('/twitter/pull', 'POST', {"origin": origin, "master":master,"curr_fb_path": path});
			if (val.status !== 200) {
        		return val.json().then(data=>{
					throw new ServerConnection.ResponseError(val, data.message);
				})
			}
			return val.json();
		} catch(err){
			console.error(err)
			throw ServerConnection.NetworkError;
		}	
	}

	async push(origin: string, master: string, path:string) {
		try {
			var val = await HTTP_Twitter_Request('/twitter/push', 'POST', {"origin": origin, "master":master,"curr_fb_path": path});
			if (val.status !== 200) {
        		return val.json().then(data=>{
					throw new ServerConnection.ResponseError(val, data.message);
				})
			}
			return val.json();
		} catch(err) {
			throw ServerConnection.NetworkError;
		}	
	 }

	init(path:string){
		return HTTP_Twitter_Request('/twitter/init','POST',{"current_path":path});
	}

}
