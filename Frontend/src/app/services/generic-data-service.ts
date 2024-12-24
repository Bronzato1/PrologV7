import { Inject, inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IBackendResponse } from '@app/interfaces/backend-response.interface';
import { environment } from '@src/environments/environment';
import adze from 'adze';
import { TPost } from '../types/post.type';
import { TProject } from '../types/project.type';

export const ENDPOINT = new InjectionToken<string>('endpoint');

const logger = adze.namespace('GenericDataService').seal();


@Injectable({
    providedIn: 'root'
})
export class GenericDataService<T extends (TPost | TProject) & { id: number }> {
    baseUrl = environment.apiUrl;

    private http = inject(HttpClient);
    
    constructor(@Inject(ENDPOINT) endpoint: string) {
        this.baseUrl += endpoint;
    }

    /**
     * Fetches all items.
     * @returns An Observable of an array of the typed objects.
     */
    getItems(): Observable<T[]> {
        return this.http.get<T[]>(this.baseUrl)
            .pipe(
                tap(() => logger.label('getItems').info('Items fetched successfully')),
                map(items => {
                    // You can perform extra calculation here on each element
                    return items;
                }),
                catchError(this.handleError)
            );
    }
    /**
     * Fetches a single item by ID.
     * @param id - The ID of the item to fetch.
     * @returns An Observable of the typed object.
     */
    getItemById(id: number): Observable<T> {
        return this.http.get<T>(this.baseUrl + '/id/' + id)
            .pipe(
                tap(() => logger.label('getItemById').info(`item id ${id} fetched successfully`)),
                catchError(this.handleError)
            );
    }
    /**
     * Fetches a single item by slug.
     * @param slug - The slug of the item to fetch.
     * @returns An Observable of the typed object.
     */
    getItemBySlug(slug: string): Observable<T> {
        return this.http.get<T>(this.baseUrl + '/slug/' + slug)
            .pipe(
                tap(() => logger.label('getItemBySlug').info(`item ${slug} fetched successfully`)),
                catchError(this.handleError)
            );
    }
    /**
     * Inserts a new item.
     * @param item - The item object to insert.
     * @returns An Observable of the inserted typed object.
     */
    insertItem(item: T): Observable<T> {
        return this.http.post<IBackendResponse<T>>(this.baseUrl, item)
            .pipe(
                tap((data: IBackendResponse<T>) => logger.label('insertItem').info('status: ' + data.status)),
                map((data: IBackendResponse<T>) => data.entity),
                catchError(this.handleError)
            );
    }
    /**
     * Updates an existing item.
     * @param post - The item object to update.
     * @returns An Observable of the updated typed object.
     */
    updateItem(item: T): Observable<T> {
        return this.http.put<IBackendResponse<T>>(this.baseUrl + '/' + item.id, item)
            .pipe(
                tap((data: IBackendResponse<T>) => logger.label('updateItem').info('Backend response status: ' + data.status, data)),
                map((data: IBackendResponse<T>) => data.entity),
                catchError(this.handleError)
            );
    }
    /**
     * Deletes an item by ID.
     * @param id - The ID of the item to delete.
     * @returns An Observable of the IBackendResponse object.
     */
    deleteItem(id: number): Observable<IBackendResponse<T>> {

        // Simulate deleting anitem without doing it
        // const data = { status: true } as IBackendResponse;
        // return of (data);

        return this.http.delete<IBackendResponse<T>>(this.baseUrl + '/' + id)
            .pipe(
                tap(() => logger.label('deleteItem').info(`item id ${id} deleted successfully`)),
                catchError(this.handleError)
            )
    }
    private handleError(error: HttpErrorResponse) {
        logger.label('handleError').error('server error:', error);
        if (error.error instanceof Error) {
            let errMessage = error.error.message;
            return throwError(() => new Error(errMessage));
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return throwError(() => new Error(error.message || 'Node.js server error'));
    }
}
