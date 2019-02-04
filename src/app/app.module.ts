import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { StoreModule } from '@ngrx/store';

import { FirestoreSettingsToken, AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AuthService } from './auth/auth.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRouteModule } from './app.route.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthGuard } from './auth/auth.gard';
import { TrainingService } from './training/training.service';
import { environment } from '../environments/environment';
import { UiService } from './shaired/ui.service';
import { Authmodule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { TrainingRoutingModule } from './training/training-routing.module';
import { appReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRouteModule,
    FlexLayoutModule,
    Authmodule,
    AuthRoutingModule,
    AngularFirestoreModule,
    StoreModule.forRoot({ui: appReducer}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule
  ],
  providers: [
    TrainingService,
    AuthService,
    AuthGuard,
    UiService,
    { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
