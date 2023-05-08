import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input()
  public src!: string;
  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.src){
      throw new Error('No image.');
    }
  }

  onLoadImage(): void {
    // setTimeout(() => {
    //   this.hasLoaded = true;
    // }, 1000);
    this.hasLoaded = true;
  }

}
