import { Directive, ViewContainerRef } from '@angular/core';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';

@Directive({
  selector: '[appConfirmation]',
  standalone: true
})
export class ConfirmationDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }

  async showConfirmationModal(title: string, dynamicHtmlContent?: string, customClass?: string) {
    return new Promise((resolve) => {
      this.viewContainerRef.clear();
      const component = this.viewContainerRef.createComponent<ConfirmationModalComponent>(ConfirmationModalComponent);
      component.instance.title = title;
      if(dynamicHtmlContent){
        component.instance.dynamicContent = dynamicHtmlContent;
      }
      if(customClass) {
        component.instance.customClass = customClass;
      }

      const onCloseModal = (boolen: boolean) => {
        component.instance.isVisible = false;
        this.viewContainerRef.clear();
        resolve(boolen);
      }

      setTimeout(() => {
        component.instance.confirmBtn?.nativeElement.addEventListener('click', () => onCloseModal(true));
        component.instance.cancelBtn?.nativeElement.addEventListener('click', () => onCloseModal(false));
      });
    });
  }
}
