import { isPlatformBrowser } from '@angular/common';
import { Component, inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import {MessageApiService} from '@org/message-api';
import {MessageDetail} from '@org/shared'

@Component({
  selector: 'lib-ag-message',
  imports: [],
  template: `
    
    <div class="mt-10  rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6" style="background: linear-gradient(135deg, rgba(200,101,26,0.15), rgba(232,160,32,0.10)); border: 1.5px solid rgba(232,160,32,0.3);">
      @if(isAside()){
        
      <div class="flex-1 text-center md:text-left">
        <p class="font-semibold text-sm uppercase tracking-wider mb-1" style="color: var(--ocre);">Annonce importante</p>
        <p class="font-lora text-sm leading-relaxed" style="color: var(--nuit);" [innerHTML]="ag()">
          
        </p>
      </div>
      }
      @else{
        <div class="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-2xl" style="background: rgba(200,101,26,0.2); border: 2px solid var(--ocre);">
        📢
      </div>
      <div class="flex-1 text-center md:text-left">
        <p class="font-semibold text-sm uppercase tracking-wider mb-1" style="color: var(--ocre);">Annonce importante</p>
        <p class="font-lora text-sm leading-relaxed" style="color: var(--nuit);" [innerHTML]="ag()">
          
        </p>
      </div>
        }
      
      
    </div>
  `,
  styleUrl: './ag-message.css',
})
export class AgMessage {

  /****************
   * INJECT
   */
  
  /*****************************
   * SIGNALS
  */ 
  readonly isAside = input(false);
  readonly ag = input<SafeHtml | null>(null);
  /*********************
   * CONSTRUCTEUR
  
  constructor() {
    this.isBrowser.set(isPlatformBrowser(inject(PLATFORM_ID)));
    
  } */
  /****************
   * METHODS
   
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }*/
}
