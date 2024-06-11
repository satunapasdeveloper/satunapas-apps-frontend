import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { LoadingDialogComponent } from './components/dialog/loading-dialog/loading-dialog.component';

import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './middleware/jwt.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        ToastModule,
        LoadingDialogComponent
    ],
    providers: [
        MessageService,
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
