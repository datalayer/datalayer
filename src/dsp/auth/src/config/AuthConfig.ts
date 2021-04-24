export type IAuthConfig = {
    authServer: string;
    jupyterpoolBaseUrl: string;
    jupyterpoolWsUrl: string;
    libraryServer: string;
}

let config: IAuthConfig = {
    authServer: 'http://localhost:9700',
    jupyterpoolBaseUrl: 'http://localhost:8888',
    jupyterpoolWsUrl: 'ws://localhost:8888',
    libraryServer: 'http://localhost:9800',
}

export const setAuthServer = (authServer: string) => {
    config.authServer = authServer;
}
export const getAuthServer = () => config.authServer;

export const setJupyterpoolBaseUrl = (jupyterpoolBaseUrl: string) => {
    config.jupyterpoolBaseUrl = jupyterpoolBaseUrl;
}
export const getJupyterpoolBaseUrl = () => config.jupyterpoolBaseUrl;

export const setJupyterpoolWsUrl = (jupyterpoolWsUrl: string) => {
    config.jupyterpoolWsUrl = jupyterpoolWsUrl;
}
export const getJupyterpoolWsUrl = () => config.jupyterpoolWsUrl;

export const setLibraryServer = (libraryServer: string) => {
    config.libraryServer = libraryServer;
}
export const getLibraryServer = () => config.libraryServer;
