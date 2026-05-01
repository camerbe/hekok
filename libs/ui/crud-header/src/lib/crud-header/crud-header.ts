import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-crud-header',
  imports: [
    ButtonModule,
    RouterLink,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule

  ],
  template: `
    <div class="flex flex-col border-b border-slate-200 pb-4 mb-4">
    
    <div class="flex items-center justify-between mb-4"> 
      <h1 class="font-bold uppercase text-left">
        <i class="pi pi-folder-plus mr-2 text-emerald-700"></i>
        {{ title() }}
      </h1>
      <a 
        pButton
        [icon]="actionIcon()"
        [routerLink]="actionLink()"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg">
          {{ actionLabel() }}
      </a>
    </div>
    
    @if(isSearch()){
      <div class="relative w-full">
        <p-iconfield class="w-full">
          <p-inputicon class="pi pi-search" />
          <input 
            type="text" 
            pInputText 
            placeholder="Recherche" 
            [(ngModel)]="searchValue"
            class="w-full pr-24" />
        </p-iconfield>
       <p-button
          
          icon="pi pi-search"
          class="absolute right-1 top-1/2 -translate-y-1/2"
          (click)="onSearch()"
        ></p-button>
      </div>
      
    }
    
  </div>
  `,
  styleUrl: './crud-header.css',
})
export class CrudHeader {
  title = input.required<string>();
  actionLabel = input.required<string>();
  actionLink = input.required<string>();
  actionIcon = input<string>('<i class="pi pi-arrow-left"></i>');
  isSearch=input<boolean>(false)
  search = output<string>();
  searchValue = '';

  onSearch() {
    this.search.emit(this.searchValue);
  }
}
