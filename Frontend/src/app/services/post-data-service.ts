// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
// import { Observable, of, throwError, } from 'rxjs';
// import { map, catchError, tap } from 'rxjs/operators';
// import { IBackendResponse, IPost } from '@app/interfaces/post.interface';
// import { environment } from '@src/environments/environment';
// import adze from 'adze';

// const logger = adze.namespace('PostDataService').seal();

// @Injectable({
//     providedIn: 'root'
// })
// export class PostDataService {
//     baseUrl = environment.apiUrl;
//     basePostUrl = this.baseUrl + 'posts';

//     constructor(private http: HttpClient) { }

//     /**
//      * Fetches all posts.
//      * @returns An Observable of an array of IPost objects.
//      */
//     getPosts(): Observable<IPost[]> {
//         return this.http.get<IPost[]>(this.basePostUrl)
//             .pipe(
//                 tap(() => logger.label('getPosts').info('Posts fetched successfully')),
//                 map(posts => {
//                     // You can perform extra calculation here on each element
//                     return posts;
//                 }),
//                 catchError(this.handleError)
//             );
//     }
//     /**
//      * Fetches a single post by ID.
//      * @param id - The ID of the post to fetch.
//      * @returns An Observable of the IPost object.
//      */
//     getPostById(id: number): Observable<IPost> {
//         return this.http.get<IPost>(this.basePostUrl + '/id/' + id)
//             .pipe(
//                 tap(() => logger.label('getPostById').info(`post id ${id} fetched successfully`)),
//                 catchError(this.handleError)
//             );
//     }
//     /**
//      * Fetches a single post by slug.
//      * @param slug - The slug of the post to fetch.
//      * @returns An Observable of the IPost object.
//      */
//     getPostBySlug(slug: string): Observable<IPost> {
//         return this.http.get<IPost>(this.basePostUrl + '/slug/' + slug)
//             .pipe(
//                 tap(() => logger.label('getPostBySlug').info(`post ${slug} fetched successfully`)),
//                 catchError(this.handleError)
//             );
//     }
//     /**
//      * Inserts a new post.
//      * @param post - The post object to insert.
//      * @returns An Observable of the inserted IPost object.
//      */
//     insertPost(post: IPost): Observable<IPost> {
//         return this.http.post<IBackendResponse>(this.basePostUrl, post)
//             .pipe(
//                 tap((data: IBackendResponse) => logger.label('insertPost').info('status: ' + data.status)),
//                 map((data: IBackendResponse) => data.entity),
//                 catchError(this.handleError)
//             );
//     }
//     /**
//      * Updates an existing post.
//      * @param post - The post object to update.
//      * @returns An Observable of the updated IPost object.
//      */
//     updatePost(post: IPost): Observable<IPost> {
//         return this.http.put<IBackendResponse>(this.basePostUrl + '/' + post.id, post)
//             .pipe(
//                 tap((data: IBackendResponse) => logger.label('updatePost').info('Backend response status: ' + data.status, data)),
//                 map((data: IBackendResponse) => data.entity),
//                 catchError(this.handleError)
//             );
//     }
//     /**
//      * Deletes a post by ID.
//      * @param id - The ID of the post to delete.
//      * @returns An Observable of the IBackendResponse object.
//      */
//     deletePost(id: string): Observable<IBackendResponse> {

//         // Simulate deleting a post without doing it
//         // const data = { status: true } as IBackendResponse;
//         // return of (data);

//         return this.http.delete<IBackendResponse>(this.basePostUrl + '/' + id)
//             .pipe(
//                 tap(() => logger.label('deletePost').info(`post id ${id} deleted successfully`)),
//                 catchError(this.handleError)
//             )
//     }
//     private handleError(error: HttpErrorResponse) {
//         logger.label('handleError').error('server error:', error);
//         if (error.error instanceof Error) {
//             let errMessage = error.error.message;
//             return throwError(() => new Error(errMessage));
//             // Use the following instead if using lite-server
//             //return Observable.throw(err.text() || 'backend server error');
//         }
//         return throwError(() => new Error(error.message || 'Node.js server error'));
//     }
// }
