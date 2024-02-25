import {ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {pl_PL, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import pl from '@angular/common/locales/pl';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {HttpExceptionsInterceptor} from "./core/interceptors/http-exceptions-interceptor.service";

registerLocaleData(pl);

export const authInterceptorProvider: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};
export const tokenInterceptor: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true};
export const httpExceptionsInterceptor: Provider =
  {provide: HTTP_INTERCEPTORS, useClass: HttpExceptionsInterceptor, multi: true};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNzI18n(pl_PL),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    importProvidersFrom(AuthInterceptor),
    importProvidersFrom(TokenInterceptor),
    importProvidersFrom(HttpExceptionsInterceptor),
    httpExceptionsInterceptor,
    tokenInterceptor,
    authInterceptorProvider,
  ]
};
