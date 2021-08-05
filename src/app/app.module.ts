import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule.forRoot(),
  ],
  exports:[HeaderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
