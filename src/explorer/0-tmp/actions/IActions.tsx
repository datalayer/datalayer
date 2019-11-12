export type RequestType<T> = { request: T }
export type ResponseType<T> = { response: T }
export type ErrorType = { error: Error }

export type EmptyRequest = RequestType<null>
export type ValueRequest = RequestType<{ value: number }>
