// Import necessary Angular modules and dependencies
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Ensure correct path
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomepageModule } from './Components/homepage/homepage.module';
import { DropdownModule } from 'primeng/dropdown';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';
import { CommonService } from './common.service';
import { ApolloLink } from '@apollo/client/core';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HomepageModule,
    DropdownModule,
    ApolloModule,
    HttpClientModule,
    ],
  bootstrap: [AppComponent],
  providers: [
    CommonService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        let decryptedToken = '';
        const http = httpLink.create({ uri: 'https://rickandmortyapi.com/graphql' });
        const middleware = new ApolloLink((operation, forward) => {
          return forward(operation);
        });
        const link = middleware.concat(http);
        return {
          link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
})
// Define the module class
export class AppModule {
 }


 