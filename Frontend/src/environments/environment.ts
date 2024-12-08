// This file can be replaced during build by using the `fileReplacements` array.
// `ng build  --configuration production` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:7071/api/',
    msalConfig: {
        auth: {
            clientId: '175fef89-c02f-4e52-bbfe-426af94dee83',
            authority: 'https://login.microsoftonline.com/f4f321ee-5728-48e6-85f7-62dc63501868',
            redirectUri: '/',
            postLogoutRedirectUri: '/'
        }
    },
    apiConfig: {
        scopes: ['User.Read'],
        uri: 'http://localhost:7071/api/',
      },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
