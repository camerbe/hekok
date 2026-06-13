import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, input, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import {AdsenseService} from '@org/ads'

@Component({
  selector: 'lib-adsense-component',
  imports: [],
  template: `
    <ins 
      #adElement
      class="adsbygoogle"
      style="display:block;"
      [attr.data-ad-client]="adClient()"
      [attr.data-ad-slot]="adSlot()"
      [attr.data-ad-format]="adFormat()"
      [attr.data-full-width-responsive]="fullWidthResponsive() ? 'true' : 'false'">
    </ins>
  `,
  styles: ``,
})
export class AdsenseComponent implements AfterViewInit {
  
  @ViewChild('adElement')
  adElement!: ElementRef<HTMLElement>;
  /******************************
   * SIGNALS
   */
  readonly adClient = input<string>('ca-pub-8638642715460968');
  readonly adSlot = input<string>('6927429462');
  readonly adFormat = input<string>('auto');
  readonly fullWidthResponsive = input<boolean>(true);
  private readonly isBrowser=signal(false);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly error = signal<string | null>(null);

  /****************************************
   * INJECTS
   */
   private readonly adsenseService=inject(AdsenseService)
  private readonly platformId = inject(PLATFORM_ID);
  /******************************
   * CONSTRUCTOR
   */
  /**
   *
   */
  constructor() {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
    
  }
  
  /*********************************
   * METHODS
   */
  ngAfterViewInit(): void {
   if(!this.isBrowser()) return;
    this.loadAdsense()
  }
  private async loadAdsense() {
    try {
      this.isLoading.set(true);
      await this.adsenseService.loadAdsenseScript(this.adClient());

      await this.delay(100);
      this.adsenseService.pushAd(this.adElement.nativeElement);
    }
    catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to load AdSense script';
      this.error.set(errorMessage);
      console.error('AdSense loading error:', error);
    }
    finally {
      this.isLoading.set(false);
    }
  }
  private delay(ms: number): Promise<void> {
     return new Promise(resolve => setTimeout(resolve, ms));
  }
}
