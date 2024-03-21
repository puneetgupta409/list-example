import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyLoadDirective {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const imgElement = this.elementRef.nativeElement as HTMLImageElement;
    imgElement.loading = 'lazy';
  }
}