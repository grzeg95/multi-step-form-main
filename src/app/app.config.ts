import { ApplicationConfig } from '@angular/core';
import { provideThemeSelector } from '@grzeg95/angular-lib-theme-selector';

export const appConfig: ApplicationConfig = {
  providers: [
    provideThemeSelector({
      themes: {
        names: ['basic'],
        default: 'basic'
      }
    })
  ]
};
