import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

    issuer: 'https://testcom-67e-dev-ed.develop.my.salesforce.com',

    redirectUri: window.location.origin + '/dashboard',

    clientId: '3MVG9n_HvETGhr3A8CXLjbiSW.G32QdbrNlm9nSYijmV8WF56baeu6rq2VpxBeGFD5ED9jdrqzkoCtnklhWU9',

    responseType: 'token',

    scope: 'openid offline_access  api',

    showDebugInformation: true,

};