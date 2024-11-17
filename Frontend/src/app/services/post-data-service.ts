import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IBackendResponse, IPost } from '@app/interfaces/post.interface';
import { environment } from '@src/environments/environment';
import { ConsoleBeautifierService as beautify } from '@app/services/console-beautifier.service';

@Injectable({
    providedIn: 'root'
})
export class PostDataService {
    baseUrl = environment.apiUrl;
    basePostUrl = this.baseUrl + 'posts';

    constructor(private http: HttpClient) { }

    /**
     * Fetches all posts.
     * @returns An Observable of an array of IPost objects.
     */
    getPosts(): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.basePostUrl)
            .pipe(
                tap(() => console.debug(...beautify.debug('PostDataService.getPosts >>> posts fetched successfully'))),
                map(posts => {
                    // You can perform extra calculation here on each element
                    return posts;
                }),
                catchError(this.handleError)
            );
    }
    /**
     * Fetches a single post by ID.
     * @param id - The ID of the post to fetch.
     * @returns An Observable of the IPost object.
     */
    getPost(id: string): Observable<IPost> {
        debugger;
        return this.http.get<IPost>(this.basePostUrl + '/' + id)
            .pipe(
                tap(() => console.debug(...beautify.debug(`PostDataService.getPost >>> post id ${id} fetched successfully`))),
                catchError(this.handleError)
            );
    }
    /**
     * Inserts a new post.
     * @param post - The post object to insert.
     * @returns An Observable of the inserted IPost object.
     */
    insertPost(post: IPost): Observable<IPost> {
        return this.http.post<IBackendResponse>(this.basePostUrl, post)
            .pipe(
                tap((data: IBackendResponse) => console.debug(...beautify.debug('PostDataService.insertPost %c>>> status: ' + data.status, "border: 1px solid lightgray; padding: 1px 5px; border-radius: 5px;"))),
                map((data: IBackendResponse) => data.post),
                catchError(this.handleError)
            );
    }
    /**
     * Updates an existing post.
     * @param post - The post object to update.
     * @returns An Observable of the updated IPost object.
     */
    updatePost(post: IPost): Observable<IPost> {
        return this.http.put<IBackendResponse>(this.basePostUrl + '/' + post.id, post)
            .pipe(
                tap((data: IBackendResponse) => console.debug(...beautify.debug('PostDataService.updatePost %c>>> status: ' + data.status, "border: 1px solid lightgray; padding: 1px 5px; border-radius: 5px;"))),
                map((data: IBackendResponse) => data.post),
                catchError(this.handleError)
            );
    }
    /**
     * Deletes a post by ID.
     * @param id - The ID of the post to delete.
     * @returns An Observable of the IBackendResponse object.
     */
    deletePost(id: string): Observable<IBackendResponse> {

        // Simulate deleting a post without doing it
        // const data = { status: true } as IBackendResponse;
        // return of (data);

        return this.http.delete<IBackendResponse>(this.basePostUrl + '/' + id)
            .pipe(
                tap(() => console.debug(...beautify.debug(`PostDataService.deletePost >>> post id ${id} deleted successfully`))),
                catchError(this.handleError)
            )
    }
    private handleError(error: HttpErrorResponse) {
        console.error(...beautify.error('server error:'), error);
        if (error.error instanceof Error) {
            let errMessage = error.error.message;
            return throwError(() => new Error(errMessage));
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return throwError(() => new Error(error.message || 'Node.js server error'));
    }
}
