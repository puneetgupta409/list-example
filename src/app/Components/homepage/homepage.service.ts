import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharactersQuery, CharactersQueryVariables, CharactersDocument } from '../../../generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private apollo: Apollo) { }

  // Method to fetch characters
  getCharacters(page?: number, nameValue: string = ''): Observable<any> {
    return this.apollo.watchQuery<CharactersQuery, CharactersQueryVariables>({
      query: CharactersDocument,
      variables: {
        page: page,
        filter: {
          name: nameValue
        }
      }
    }).valueChanges.pipe(
      map(result => result.data.characters)
    );
  }
}
