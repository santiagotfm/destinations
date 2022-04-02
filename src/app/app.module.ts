import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent
  ],
  imports: [
    BrowserModule, 
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
