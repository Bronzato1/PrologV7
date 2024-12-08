/*
 *  production mode
 */

export const environment = {
    production: true,
    apiUrl: 'https://serverless-prologv7.azurewebsites.net/api/',
    msalConfig: {
        auth: {
            clientId: '175fef89-c02f-4e52-bbfe-426af94dee83',
            authority: 'https://login.microsoftonline.com/f4f321ee-5728-48e6-85f7-62dc63501868',
            redirectUri: 'https://www.prolog.red/',
            postLogoutRedirectUri: 'https://www.prolog.red/'
        }
    },
    apiConfig: {
        scopes: ['User.Read'],
        uri: 'https://serverless-prologv7.azurewebsites.net/api/',
    },
};
