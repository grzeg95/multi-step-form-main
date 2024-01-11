import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideThemeSelector } from '@grzeg95/angular-lib-theme-selector';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideThemeSelector({
      themes: {
        names: ['basic'],
        default: 'basic'
      }
    })
  ]
};
