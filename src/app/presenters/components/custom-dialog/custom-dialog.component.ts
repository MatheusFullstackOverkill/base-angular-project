import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.sass'],
  imports: [CommonModule],
  standalone: true,
})
export class CustomDialogComponent implements AfterViewInit {
  @Input() public isVisible = true;
  @Input() public title = '';
  @Input() public customClass = '';
  @Input() public showCloseBtn = true;
  @Input() public allowOutsideClick = false;
  @Input() public scrolledContent = false;
  @Output() public closed: EventEmitter<boolean> = new EventEmitter();

  ngAfterViewInit() {
    this.validateModalContentScroll();
  }

  toggleModal() {
    this.isVisible = false;
    setTimeout(() => {
      this.closed.emit(false);
    }, 200);
  }

  validateModalContentScroll() {
    document.querySelector('.custom-dialog-content')?.addEventListener('scroll', (e) => {
      this.scrolledContent = (e.target as HTMLTextAreaElement).scrollTop > 0;
    })
  }

}