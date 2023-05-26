import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-custom-file-input',
  templateUrl: './custom-file-input.component.html',
  styleUrls: ['./custom-file-input.component.sass'],
  imports: [CommonModule],
  standalone: true
})
export class CustomFileInputComponent {
  draggedOver = false
  // filetypesMap = {
  //   image: ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'],
  //   sheet: ['text/csv']
  // };
  @Input() files: File[] = []
  // @Input() allowedType: 'image' | 'sheet' = 'image'
  @Input() errors: string[] | undefined = []
  @Input() value!: File | undefined
  @Output() valueChange: EventEmitter<File | undefined> = new EventEmitter()
  @Output() changed: EventEmitter<File | undefined> = new EventEmitter()

  constructor(
    private sanitizer: DomSanitizer,
    private messageiService: MessageService
  ) {}

  dragOverHandler(e: DragEvent) {
    e.preventDefault();
    this.draggedOver = true;
  }

  validateClick(e: MouseEvent) {
    if((e.target as HTMLElement).className !== 'remove-file') {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
  }

  fileTypeValidator(type: string) {
    // return this.filetypesMap[this.allowedType].includes(target.files[0].type)
    return true
  }

  addFile(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.files = [];
    this.value = undefined;
    this.valueChange.emit(undefined);
    const target: HTMLInputElement = e.target as HTMLInputElement;

    if(target.files && target.files.length > 0 && this.fileTypeValidator(target.files[0].type)) {
      this.files.push(target.files[0]);
      this.value = target.files[0];
      this.valueChange.emit(target.files[0]);
      this.changed.emit(target.files[0]);
    }else {
      this.messageiService.add({ 
          severity: 'warn', summary: "Envie um arquivo com o formato válido"
       });
    }

    target.value = '';
  }

  createURL(file: File) {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  deleteFile() {
    this.files = [];
    this.value = undefined;
    this.changed.emit(undefined);
    this.valueChange.emit(undefined);
  }

  dropHandler(e: DragEvent) {
    if (!e.dataTransfer) {
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    this.files = [];
    this.value = undefined;
    if (e.dataTransfer.items) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const files = [...e.dataTransfer.items].filter(x => x.kind === 'file');
      if(files.length > 0 && this.fileTypeValidator(files[0].type)) {
        this.files.push(files[0]);
        this.value = files[0];
        this.changed.emit(files[0]);
        this.valueChange.emit(files[0]);
      }
    } else {
      this.messageiService.add({
        severity: 'warn', summary: "Envie um arquivo com o formato válido"
      });
    }

    if (e.dataTransfer.files && this.fileTypeValidator(e.dataTransfer.files[0].type)) {
      this.files.push(e.dataTransfer.files[0]);
      this.changed.emit(e.dataTransfer.files[0]);
    } else {
      this.messageiService.add({
        severity: 'warn', summary: "Envie um arquivo com o formato válido"
      });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    e.target.value = null;
    this.draggedOver = false;
  }
}
