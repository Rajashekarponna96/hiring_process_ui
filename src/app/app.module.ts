import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RecruiterService } from './demo/service/recruiter.service';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        RecruiterService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
