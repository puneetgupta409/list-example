// Import necessary Angular modules and dependencies
import { Component, OnInit , HostListener, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { HomepageService } from './homepage.service';
import { Subject ,Subscription} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-homepage', // HTML selector for using this component
  templateUrl: './homepage.component.html', // Path to the component's HTML template file
  styleUrls: ['./homepage.component.scss'], // Path to the component's CSS styles file
})

// Define the component class
export class HomepageComponent implements OnInit , OnDestroy {
  protected pageNumber: number = 1;
  protected count: number = 0;
  protected characterList: any = [];
  protected Referhloading: boolean = false;
  protected loadDataLoader: boolean = false;
  protected searchValue: string = '';
  protected searchValueSubject = new Subject<string>();
  protected subscription: Subscription;
  constructor(protected homepageService: HomepageService ,private router: Router , protected messageService: MessageService) {
    // TO SHOW THE RESULT 
    this.subscription = this.searchValueSubject.pipe(debounceTime(300)) // Adjust the debounce time as needed
    .subscribe((value:string) => {
      this.characterList = [];
      this.pageNumber = 1;
      this.loadDataLoader = false;  
      this.loadCharacters(value)
    });
     // TO SHOW THE RESULT 
  }
  ngOnInit(): void {
    this.Referhloading = true;
     // TO SHOW THE CHARACTERAPI RESULTS 
    this.loadCharacters();
  }

  // TO  INFINITE SCROLL
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (!this.Referhloading && this.shouldLoadMoreData() && this.count > this.characterList.length) {
      this.pageNumber++;
      this.loadDataLoader = true;  
      this.loadCharacters(this.searchValue);
    } else {
      this.loadDataLoader = false;  
    }
  }
  // TO  INFINITE SCROLL

  // TO SHOW THE CHARACTERAPI RESULTS 
  loadCharacters(value?: string){
    const page = this.pageNumber;
    const search_value = value ? value : undefined; 
    this.homepageService.getCharacters(page,search_value).subscribe({
      next: (result: any) => {
        this.Referhloading = false;
        this.loadDataLoader = false;  
        if(result && result.info && result.info.count){
            this.count = Number(result.info.count);
        }
        if(result && result.results && result.results.length > 0){
          if(this.searchValue){
            this.characterList.push(...result.results);
          } else {
            this.characterList.push(...result.results);
          }
        }
      },
      error: (error: any) => {
        console.error('Error loading characters:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      }
    });
  }
  // TO SHOW THE CHARACTERAPI RESULTS 

  // TO  INFINITE SCROLL
  shouldLoadMoreData(): boolean {
    // Check if the scroll position is near the end of the list
    const endOfList = document.getElementById('endOfList');
    if (!endOfList) return false; // Ensure the element exists
    const rect = endOfList.getBoundingClientRect();
    return rect.top <= window.innerHeight;
  }
  // TO  INFINITE SCROLL

   // TO SHOW THE RESULT 
  onSearchChange(value: string) {
    this.searchValueSubject.next(value);
  }
  // TO SHOW THE RESULT 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // MOVE UP FUNCTION 
  moveUpYourWebsite(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  // MOVE UP FUNCTION 

  // SCROLL TO PRODUCT DETAILS PAGE
  navigateToProductDetails(productId: string) {
    this.router.navigate(['/ProductsDetails', productId]);
  }
  // SCROLL TO PRODUCT DETAILS PAGE
}
