// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
// import { Observable, of, throwError, } from 'rxjs';
// import { map, catchError, tap } from 'rxjs/operators';
// import { IBackendResponse, IProject } from '@app/interfaces/project.interface';
// import { environment } from '@src/environments/environment';
// import adze from 'adze';

// const logger = adze.namespace('ProjectDataService').seal();

// @Injectable({
//     providedIn: 'root'
// })
// export class ProjectDataService {
//     baseUrl = environment.apiUrl;
//     baseProjectUrl = this.baseUrl + 'projects';

//     constructor(private http: HttpClient) { }

//     /**
//      * Fetches all projects.
//      * @returns An Observable of an array of IProject objects.
//      */
//     getProjects(): Observable<IProject[]> {
//         return this.http.get<IProject[]>(this.baseProjectUrl)
//             .pipe(
//                 tap(() => logger.label('getProjects').info('Projects fetched successfully')),
//                 map(projects => {
//                     // You can perform extra calculation here on each element
//                     return projects;
//                 }),
//                 catchError(this.handleError)
//             );
//     }
//     /**
//      * Fetches a single project by ID.
//      * @param id - The ID of the project to fetch.
//      * @returns An Observable of the IProject object.
//      */
//     getProjectById(id: number): Observable<IProject> {
//         return this.http.get<IProject>(this.baseProjectUrl + '/id/' + id)
//             .pipe(
//                 tap(() => logger.label('getProjectById').info(`project id ${id} fetched successfully`)),
//                 catchError(this.handleError)
//             );
//     }
//     /**
//      * Fetches a single project by slug.
//      * @param slug - The slug of the project to fetch.
//      * @returns An Observable of the IProject object.
//      */
//     getProjectBySlug(slug: string): Observable<IProject> {
//         return this.http.get<IProject>(this.baseProjectUrl + '/slug/' + slug)
//             .pipe(
//                 tap(() => logger.label('getProjectBySlug').info(`project ${slug} fetched successfully`)),
//                 catchError(this.handleError)
//             );
//     }
//     /**
//      * Inserts a new project.
//      * @param project - The project object to insert.
//      * @returns An Observable of the inserted IProject object.
//      */
//     insertProject(project: IProject): Observable<IProject> {
//         return this.http.post<IBackendResponse>(this.baseProjectUrl, project)
//             .pipe(
//                 tap((data: IBackendResponse) => logger.label('insertProject').info('status: ' + data.status)),
//                 map((data: IBackendResponse) => data.entity),
//                 catchError(this.handleError)
//             );
//     }
//     /**
//      * Updates an existing project.
//      * @param project - The project object to update.
//      * @returns An Observable of the updated IProject object.
//      */
//     updateProject(project: IProject): Observable<IProject> {
//         return this.http.put<IBackendResponse>(this.baseProjectUrl + '/' + project.id, project)
//             .pipe(
//                 tap((data: IBackendResponse) => logger.label('updateProject').info('Backend response status: ' + data.status, data)),
//                 map((data: IBackendResponse) => data.entity),
//                 catchError(this.handleError)
//             );
//     }
//     /**
//      * Deletes a project by ID.
//      * @param id - The ID of the project to delete.
//      * @returns An Observable of the IBackendResponse object.
//      */
//     deleteProject(id: string): Observable<IBackendResponse> {

//         // Simulate deleting a project without doing it
//         // const data = { status: true } as IBackendResponse;
//         // return of (data);

//         return this.http.delete<IBackendResponse>(this.baseProjectUrl + '/' + id)
//             .pipe(
//                 tap(() => logger.label('deleteProject').info(`project id ${id} deleted successfully`)),
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
