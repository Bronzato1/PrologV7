export interface IPost {
    id?: string;
    title: string;
    content: string;
    tags: string;
    creationDate?: Date;
    modificationDate?: Date;
    status: number;
    span: number;
    height: number;
    color: number;
    heading: number;
}

export interface IBackendResponse {
    status: boolean;
    post: IPost;
}