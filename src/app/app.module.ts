import { environment } from './../environments/environment';
import { RaceEffects } from './effects/race.effects';
import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { PoneyComponent } from './components/poney/poney.component';

import { FormsModule } from '@angular/forms';
import { BoostDirective } from './directives/boost.directive';
import { RaceComponent } from './components/race/race.component'
import { MaterialModule } from './modules/material/material.module';
import { ClonePipe } from './pipes/clone.pipe';
import { FilterPoniesPipe } from './pipes/filter-ponies.pipe';
import { UpperCasePipe, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/race.reducer'
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import localeFr from '@angular/common/locales/fr'
import { TranslationModule, L10nConfig, ProviderType, L10nLoader } from 'angular-l10n'

registerLocaleData(localeFr, 'fr')

let l10nConfig: L10nConfig = {
  locale: {
    languages: [
      {
        code: 'en',
        dir: 'ltr'
      },
      {
        code: 'fr',
        dir: 'ltr'
      }
    ],
    language: 'en'
  },
  translation: {
    providers: [
      {
        type: ProviderType.Static,
        prefix: './assets/locale-'
      }
    ],
    missingValue: 'No key'
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PoneyComponent,
    BoostDirective,
    RaceComponent,
    ClonePipe,
    FilterPoniesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    StoreModule.forRoot({
      race: reducer
    }),
    EffectsModule.forRoot([RaceEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    TranslationModule.forRoot(l10nConfig)
  ],
  providers: [
    UpperCasePipe,
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load()
  }

}
