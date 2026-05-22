import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Nav,StatComponent } from '@org/front-nav';
import {Communaute } from '@org/communaute'

import {News} from '@org/news';

import {MembreApiService} from '@org/membre-api'
import { Article, ArticleDetail, Membre } from '@org/shared';
import { ArticleApiService } from '@org/article-api';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { LayoutStore } from './layout-store';

type Tab = 'ndiki' | 'nitoukou' | 'yingui';

@Component({
  selector: 'lib-layout-front',
  imports: [
    StatComponent,
    Communaute,
    News
    
  ],
  template: `
   
    <!-- ═══════════════════════════════════════════
     HERO / PRÉSENTATION
    ═══════════════════════════════════════════ -->
<section id="accueil" class="hero-section flex flex-col items-center justify-center px-4 py-24 relative z-10">

  <!-- Decorative circles -->
  <div class="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 border-2" style="border-color: var(--ocre);"></div>
  <div class="absolute top-28 right-18 w-44 h-44 rounded-full opacity-8 border" style="border-color: var(--or); right: 3.5rem;"></div>
  <div class="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-8 border" style="border-color: var(--vert);"></div>

  <!-- Adinkra decoration top -->
  <div class="flex gap-6 mb-8 animate-fade-in">
    <svg class="adinkra-symbol" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="none" stroke="#E8A020" stroke-width="1.5" opacity="0.6"/>
      <circle cx="24" cy="24" r="10" fill="none" stroke="#C8651A" stroke-width="1.5" opacity="0.6"/>
      <circle cx="24" cy="24" r="3" fill="#E8A020" opacity="0.8"/>
      <line x1="24" y1="4" x2="24" y2="44" stroke="#E8A020" stroke-width="1" opacity="0.3"/>
      <line x1="4" y1="24" x2="44" y2="24" stroke="#E8A020" stroke-width="1" opacity="0.3"/>
    </svg>
    <svg class="adinkra-symbol" viewBox="0 0 48 48">
      <path d="M24 4 L44 24 L24 44 L4 24 Z" fill="none" stroke="#C8651A" stroke-width="1.5" opacity="0.6"/>
      <path d="M24 12 L36 24 L24 36 L12 24 Z" fill="none" stroke="#E8A020" stroke-width="1.5" opacity="0.6"/>
      <circle cx="24" cy="24" r="4" fill="#B5251E" opacity="0.7"/>
    </svg>
    <svg class="adinkra-symbol" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="none" stroke="#2D6A4F" stroke-width="1.5" opacity="0.6"/>
      <path d="M14 24 Q24 10 34 24 Q24 38 14 24" fill="none" stroke="#E8A020" stroke-width="1.5" opacity="0.6"/>
    </svg>
  </div>

  <p class="animate-fade-up delay-1 text-sm font-semibold tracking-widest uppercase mb-3" style="color: var(--or);">
    ✦ Ensemble nous sommes plus forts ✦
  </p>

  <h1 class="font-display text-center animate-fade-up delay-2" style="color: var(--sable); font-size: clamp(2.8rem, 7vw, 5rem); line-height: 1.1; max-width: 900px;">
    Le Munen en nous,<br>
    <span style="color: var(--or);">la force en chacun</span>
  </h1>

  <div class="w-24 h-1 my-6 rounded-full animate-fade-up delay-3" style="background: linear-gradient(90deg, var(--rouge), var(--or));"></div>

  <p class="font-lora text-center animate-fade-up delay-3 max-w-2xl text-lg leading-relaxed" style="color: rgba(245,230,200,0.80);">
    Hekok (les Banen du Benelux) est un espace de rencontre, de mémoire et de fraternité.
    Nous célébrons nos racines, honorons nos ancêtres et construisons ensemble un avenir rayonnant.
    <em style="color: var(--or);">Hekok</em> — « Je suis parce que nous sommes. »
  </p>

  <div class="flex flex-wrap gap-4 justify-center mt-10 animate-fade-up delay-4">
    <a href="#histoire" class="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105" style="background: var(--ocre); color: white; box-shadow: 0 4px 20px rgba(200,101,26,0.4);">
      Découvrir notre histoire
    </a>
    <a href="#contact" class="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105" style="background: transparent; color: var(--or); border: 2px solid var(--or);">
      Rejoindre la communauté
    </a>
    <lib-stat
      [membreactif]="store.membreactif()"
      [duree]="store.duree()"
    /> 
  </div>
  
</section>

<div class="divider-kente"></div>
<lib-communaute
  (tabChange)="showTab($event)"
  [imgNitoukou]="store.imgNitoukou()"
  [imgNdiki]="store.imgNdiki()"
  [imgYingui]="store.imgYingui()"
  [linkNitoukou]="store.linkNitoukou()"
  [linkNdiki]="store.linkNdiki()"
  [linkYingui]="store.linkYingui()"
/>
<div class="divider-kente"></div>
<lib-news
  [news]="store.news()"
/>
<div class="divider-kente"></div>


  `,
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutFrontComponent implements OnInit{

  /***********************
   * SIGNALS
   */

  isMenuOpen = signal(false);
  readonly isBrowser = signal(false);
  // protected readonly membreactif=signal<number>(0)
  // protected readonly duree=signal<number>(0)
  // readonly communautes = signal<ArticleDetail[]>([]);
  // readonly news = signal<ArticleDetail[]>([]);
  
  // protected imgNdiki=computed(()=>{
  //   const c = this.communautes().find(c => c.typearticles?.slug === 'ndikinimeki');
  //   return c?.image ?? undefined;
  // });
  // protected imgYingui=computed(()=>{
  //   const c = this.communautes().find(c => c.typearticles?.slug === 'yingui');
  //   return c?.image ?? undefined;
  // });
  // protected imgNitoukou=computed(()=>{
  //   const c = this.communautes().find(c => c.typearticles?.slug === 'nitoukou');
  //   return c?.image ?? undefined;
  // });
 
  // protected linkNdiki=computed(()=>{
  //   const c = this.communautes().find(
  //   c => c.typearticles?.slug === 'ndikinimeki'
  // );

  //   const type = c?.typearticles?.typearticle?.toLowerCase();
  //   const slug = c?.slug;

  //   return type && slug ? `${type}/${slug}` : undefined;
  // });
  // protected linkNitoukou=computed(()=>{
  //   const c = this.communautes().find(c => c.typearticles?.slug === 'nitoukou');
    
  //   const type = c?.typearticles?.typearticle?.toLowerCase();
  //   const slug = c?.slug;

  //   if (!type || !slug) return undefined;

  //   return `${type}/${slug}`;
  // });
  // protected linkYingui=computed(()=>{
  //   const c = this.communautes().find(c => c.typearticles?.slug === 'yingui');

  //   const type = c?.typearticles?.typearticle?.toLowerCase();
  //   const slug = c?.slug;

  //   if (!type || !slug) return undefined;

  //   return `${type}/${slug}`;
  // });
  /**************************
   * INJECT
   */
  private readonly platformId = inject(PLATFORM_ID);
  private membreService=inject(MembreApiService)
  private articleService=inject(ArticleApiService)
  readonly sanitizer=inject(DomSanitizer);
  readonly store = inject(LayoutStore);

  /*********************
   * CONSTRUCTEUR
   */
  constructor() {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
    
    
  }
  /*************************
   * METHODS
   */
  toggleMenu(isOpen: boolean) {
    this.isMenuOpen.set(isOpen);
  }
  showTab(id:Tab){
    console.log(`id ${id}`);
  }
  // private loadCommunaute(){
  //   return this.articleService.getCommunautes().subscribe({
  //     next:(res)=>{
  //       const {data,success,message}=res as unknown as Article
  //       this.communautes.set(data as unknown as ArticleDetail[])

  //     },
  //     error:(err)=>{
  //       console.log(`${err.error}`)
        
  //     }
  //   });
  // }
  // private loadStat(){
  //   return this.membreService.getStat().subscribe({
  //     next:(res)=>{
  //       //console.log(`res ${res}`)
  //       const{data,success,message}=res 
  //       const{actifs,histoire}=data ;
        
  //       this.membreactif.set(actifs);
  //       this.duree.set(histoire)

  //     },
  //     error:(err)=>{
  //       console.log(`${err.error}`)
        
  //     }
  //   })
  // }

  // private loadNews() {
  //   return this.articleService.getNews().subscribe({
  //     next:(res:Article) =>{
  //       const {data,success,message}=res
  //       this.news.set(data as unknown as ArticleDetail[])
  //     },
  //     error:(err)=>{
  //       console.log(`${err.error}`)
        
  //     }
  //   })
  // }
  ngOnInit(): void {
    if (!this.isBrowser()) return;
    // forkJoin({
    //   stats:this.membreService.getStat(),
    //   communautes:this.articleService.getCommunautes(),
    //   news: this.articleService.getNews()
    // }).subscribe({
    //   next:({stats,communautes,news})=>{
    //     const {actifs, histoire }=stats.data;
    //     this.membreactif.set(actifs);
    //     this.duree.set(histoire);

    //     this.communautes.set(communautes.data as unknown as ArticleDetail[])
    //      //this.communautes.set([communautes.data as ArticleDetail]);

    //      this.news.set(news.data as unknown as ArticleDetail[])
    //   },
    // error: (err) => console.error(err)
    // });
    //this.loadStat();
    //this.loadCommunaute();
    //this.loadNews();
    this.store.load();
    
  }
  
}
