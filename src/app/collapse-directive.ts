import {Directive, Input, HostBinding, ElementRef} from '@angular/core';
@Directive({selector: '[collapse]'})
export class CollapseDirective {

  @HostBinding('class.collapsing')
  private isCollapsing: boolean;

    // style
  @HostBinding('style.height')
  private height: string;

  private h: number;

  @Input()
  private set collapse(value: boolean) {
    if (value !== undefined) {
      if (value) {
        this.hide();
      }else {
        this.show();
      }
    }
  }
  constructor(public el: ElementRef) {

    this.measureHeight();
  }
  measureHeight() {
    const elem = this.el.nativeElement;
    // lets be sure the element has display:block style
    elem.className = elem.className.replace('collapse', '');
    this.h = elem.scrollHeight;

  }
  hide() {
    this.height = this.h + 'px';
    setTimeout(() => {
        this.height = '0px';
        this.isCollapsing = true; // apply 'collapsing' class
    }, 1);
  }
  show() {
    this.height = '0px';
    setTimeout(() => {
        this.height = this.h + 'px';
        this.isCollapsing = true; // apply 'collapsing' class
    }, 1);
  }

}
