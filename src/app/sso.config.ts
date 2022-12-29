import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

    issuer: 'https://testcom-67e-dev-ed.develop.my.salesforce.com',

    redirectUri: 'http://validationrule-8ec53.firebaseapp.com/dashboard',

    clientId: '3MVG9n_HvETGhr3A8CXLjbiSW.G32QdbrNlm9nSYijmV8WF56baeu6rq2VpxBeGFD5ED9jdrqzkoCtnklhWU9',

    responseType: 'token',

    scope: 'refresh_token offline_access api ',

    showDebugInformation: true,

};