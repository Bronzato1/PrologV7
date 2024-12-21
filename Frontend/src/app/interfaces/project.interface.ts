export interface IProject {
    id: number;
    title: string;
    content: string;
    tags: string;
    creationDate?: Date;
    modificationDate?: Date;
    status: number;
    category: number;
}

export interface IBackendResponse {
    status: boolean;
    entity: IProject;
}