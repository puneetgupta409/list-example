import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductDetailsService } from './product-detail.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-product-details', // HTML selector for using this component
  templateUrl: './product-detail.component.html', // Path to the component's HTML template file
  styleUrls: ['./product-detail.component.scss'], // Path to the component's CSS styles file
})

// Define the component class
export class ProductDetailsComponent implements OnInit {
    protected productDetailsObject: any;
    protected showEpisodeModal: boolean = false;
    protected Referhloading: boolean = false;
    constructor(private route: ActivatedRoute,private location: Location , protected productDetailsService: ProductDetailsService,
        protected messageService: MessageService){}

    ngOnInit(): void {
        this.Referhloading = true;
        // TO GET THE PRODUCT ID FROM THE ROUTER
        let productId = this.route.snapshot.paramMap.get('id');
        this.productDetails(Number(productId));
    }
    // GOBACK TO LIST PAGE
    goBack(){
        this.location.back();
    }
     // GOBACK TO LIST PAGE

    // TO GET THE PRODUCT DETAILS 
    productDetails(id: number) {
        this.productDetailsService.getCharacterDetails(id).subscribe({
          next: (result: any) => {
            // Handle the result here
            this.productDetailsObject = result;
            this.Referhloading = false;
          },
          error: (error: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          }
        });
    }
    // TO GET THE PRODUCT DETAILS 

    // TO SHOW ALL EPISODES IN POPUP
    showEpisode(){
        if(this.productDetailsObject.episode && this.productDetailsObject.episode.length){
            this.showEpisodeModal = true;
        }
    }
    // TO SHOW ALL EPISODES IN POPUP
}