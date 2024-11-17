export interface IPost {
    id?: string;
    title: string;
    content: string;
    tags: string;
    creationDate?: Date;
    modificationDate?: Date;
    status: number;
}

export interface IBackendResponse {
    status: boolean;
    post: IPost;
}