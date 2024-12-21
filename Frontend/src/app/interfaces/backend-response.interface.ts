export interface IBackendResponse<T> {
    status: boolean;
    entity: T;
}