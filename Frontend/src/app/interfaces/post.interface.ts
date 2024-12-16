export interface IPost {
    id?: string;
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
    post: IPost;
}