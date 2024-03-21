import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterDocument, CharacterQuery, CharacterQueryVariables } from '../../../generated/graphql';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailsService {

    constructor(private apollo: Apollo) { }

    //   // Method to fetch characters
    getCharacterDetails(characterId: number = 0): Observable<any> {
        return this.apollo.watchQuery<CharacterQuery, CharacterQueryVariables>({
            query: CharacterDocument,
            variables: {
                characterId: characterId.toString() // Convert characterId to string
            }
        }).valueChanges.pipe(
            map(result => result.data.character)
        );
    }
}
