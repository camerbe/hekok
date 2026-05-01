import { Component,input, output} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-crud-button',
  imports: [
    ButtonModule
  ],
  template: `
   <button 
      pButton 
      type="button" 
      [icon]="icon()"
      (click)="clicked.emit()"
      [disabled]="disabled()"
      class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg">
      {{ label() }}
    </button>
  `,
  styleUrl: './crud-button.css',
})
export class CrudButton {
  label = input<string>('Button');
  icon = input<string>('pi pi-check');
  clicked = output<void>();
  disabled=input<boolean>(false);
}
