import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.sass'],
  standalone: true,
  imports:[CommonModule, CustomDialogComponent]
})
export class ConfirmationModalComponent {
  @ViewChild('confirmBtn') confirmBtn: ElementRef | undefined;
  @ViewChild('cancelBtn') cancelBtn: ElementRef | undefined;
  @Input() public title = '';
  @Input() public dynamicContent = "";
  @Output() public selected: EventEmitter<boolean> = new EventEmitter();
  public isVisible = true;
  @Input() public customClass = "";

  onSelectOption(boolean: boolean) {
    this.isVisible = false;
    setTimeout(() => {
      this.selected.emit(boolean);
    }, 200);
  }
}
