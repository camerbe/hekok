import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { afterNextRender, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Injector, input, OnInit, output, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type Tab = 'ndiki' | 'nitoukou' | 'yingui';

@Component({
  selector: 'lib-communaute',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  template: `
    <!-- ═══════════════════════════════════════════
     HISTOIRE DES 3 COMMUNAUTÉS
    ═══════════════════════════════════════════ 
    --> 
<section id="histoire" class="mud-cloth py-20 px-4">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-12 ">
      <p class="text-sm font-semibold tracking-widest uppercase mb-2" style="color: var(--or);">✦ Nos racines, notre fierté ✦</p>
      <h2 class="font-display text-4xl md:text-5xl font-bold" style="color: var(--sable);">Histoire de nos Communautés</h2>
      <div class="w-20 h-1 mx-auto mt-4 rounded-full" style="background: linear-gradient(90deg, var(--or), var(--rouge));"></div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap justify-center gap-3 mb-10 reveal">
      @for (tab of tabs; track tab.id) {
        <button
          class="tab-btn px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
              [class.active]="activeTab() === tab.id"
              [style.border]="activeTab() === tab.id
                ? '1.5px solid var(--ocre)'
                : '1.5px solid rgba(200,101,26,0.4)'"
              [style.color]="activeTab() === tab.id
                ? 'white'
                : 'rgba(245,230,200,0.7)'"
              (click)="showTab(tab.id)">
              {{ tab.label }}
        </button>
      }
    </div>
    @switch (activeTab()) {
    <!-- NDIKI -->
     @case ('ndiki') {
    <div 
      id="tab-akan" 
      [class.active]="true"
      [class.visible]="tabVisible()"
      class="tab-content reveal">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style="background: var(--ocre); color: white;">ND</div>
            <h3 class="font-display text-2xl font-bold uppercase" style="color: var(--or);">ndikiniméki</h3>
          </div>
          <div class="space-y-4" style="color: rgba(245,230,200,0.80);">
            <div class="border-l-4 pl-4" style="border-color: var(--ocre);">
              <p class="text-xs uppercase tracking-wider font-semibold mb-1" style="color: var(--or);">Origines</p>
              <p class="font-lora text-sm leading-relaxed">Berceau historique du peuple Banen, Ndikiniméki est l'arrondissement mère dont sont issus les grands clans qui ont peuplé Yingui et Nitoukou. Peuple acéphale et fier, chaque <strong>Munen</strong> régnait sur sa colline en homme libre <b>Ifeyu</b>, gouverné non par un roi mais par un patriarche-devin, garant de la destinée collective.</p>
            </div>
            <div class="border-l-4 pl-4" style="border-color: var(--rouge);">
              <p class="text-xs uppercase tracking-wider font-semibold mb-1" style="color: var(--or);">Traditions</p>
              <p class="font-lora text-sm leading-relaxed">La langue du pays est le <b>Tunen</b>, parlée par tous les Banen et déclinée en plusieurs dialectes selon les cantons. Le pays Banen s'étend des confins d'Iboutoul au nord jusqu'aux terres d'Indik Biakat au sud, formant un espace culturel homogène et cohérent. Aujourd'hui, des cours de <b>Tunen</b> sont dispensés dans les établissements secondaires de Ndikinimeki, articulés en trois variantes : Alinga, Toboagn et Fombo  pour couvrir l'ensemble des locuteurs Banen.
              </p>
            </div>
            <a 
              [routerLink]="['/communautes' ,linkNdiki()]"fragment="histoire" class="block mx-auto mt-4 text-sm font-semibold transition-colors bg-[#E8A020] text-white p-3 rounded-full text-center w-max">Découvrir  Ndiki →</a>
          </div>
        </div>
        <div class="relative">
          <div class="rounded-2xl overflow-hidden relative h-96" style="border: 2px solid rgba(200,101,26,0.4);">
          @if (imgNdiki()){
            <img 
            class="object-cover w-full"
            fill
            [alt]="'Ndikiniméki'"
            [title]="'Ndikiniméki'"
            [ngSrc]="imgNdiki() ?? ''" />
           }
           @else {
            <!-- placeholder pendant le chargement -->
            <div class="w-full h-full" style="background: rgba(45,106,79,0.15);"></div>
          }
            
          </div>
        </div>
      </div>
    </div>
    }
    @case ('nitoukou') {
    <!-- NITOUKOU -->
    <div 
      id="tab-mandingue" 
      [class.active]="true"
      [class.visible]="tabVisible()"
      class="tab-content reveal">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style="background: var(--vert); color: white;">NI</div>
            <h3 class="font-display text-2xl font-bold uppercase" style="color: var(--or);">nitoukou</h3>
          </div>
          <div class="space-y-4" style="color: rgba(245,230,200,0.80);">
            <div class="border-l-4 pl-4" style="border-color: var(--vert);">
              <p class="text-xs uppercase tracking-wider font-semibold mb-1" style="color: var(--or);">Origines</p>
              <p class="font-lora text-sm leading-relaxed">Installés au Cameroun autour du VIe siècle, les Banen de Nitoukou comptent parmi les peuples les plus anciens de la région. Leurs origines remonteraient à la vallée du Noun, d'où les guerres tribales les ont poussés vers la pénéplaine au nord du fleuve Sanaga, avant qu'ils ne s' établissent dans les terres de Nitoukou, Ndiki et Yingui.</p>
            </div>
            <div class="border-l-4 pl-4" style="border-color: var(--or);">
              <p class="text-xs uppercase tracking-wider font-semibold mb-1" style="color: var(--or);">Traditions</p>
              <p class="font-lora text-sm leading-relaxed">La culture Banen repose sur une richesse vivante : danses rituelles (Engand, Engol, Bikousse), artisanat (nattes, poterie, paniers), rites de passage (dot, circoncision, veuvage) et le travail collectif appelé *Youme*. La notabilité obéit à la règle des 3M — Moukouk, Mouteng et Mounen — garants de l'ordre social et de la mémoire ancestrale.</p>
            </div>
            <a 
              [routerLink]="['/communautes' ,linkNitoukou()]"fragment="histoire" class="block mx-auto mt-4 text-sm font-semibold transition-colors bg-[#E8A020] text-white p-3 rounded-full text-center w-max">Découvrir  Nitoukou →</a>
          </div>
        </div>
        <div class="relative">
          <div class="rounded-2xl overflow-hidden relative h-96" style="border: 2px solid rgba(45,106,79,0.4);">
           @if (imgNitoukou()){
            <img 
            class="object-cover w-full"
            fill
            [alt]="'Nitoukou'"
            [title]="'Nitoukou'"
            [ngSrc]="imgNitoukou() ?? ''" />
           }
           @else {
            <!-- placeholder pendant le chargement -->
            <div class="w-full h-full" style="background: rgba(45,106,79,0.15);"></div>
          }
          </div>
        </div>
      </div>
    </div>
    }
    @case ('yingui') {
    <!-- YINGUI -->
    <div 
      id="tab-bantou" 
      [class.active]="true"
      [class.visible]="tabVisible()"
      class="tab-content reveal">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style="background: var(--rouge); color: white;">YI</div>
            <h3 class="font-display text-2xl font-bold uppercase" style="color: var(--or);">yingui</h3>
          </div>
          <div class="space-y-4" style="color: rgba(245,230,200,0.80);">
            <div class="border-l-4 pl-4" style="border-color: var(--rouge);">
              <p class="text-xs uppercase tracking-wider font-semibold mb-1" style="color: var(--or);">Origines</p>
              <p class="font-lora text-sm leading-relaxed">Nichée dans la région du Littoral, au cœur du département du Nkam, Yingui est une commune dont l'ancien village existe depuis bien des siècles, peu touché par la colonisation grâce à ses difficultés d'accessibilité. Son peuplement est issu de multiples migrations aux XVIIe et XIXe siècles : les quatre clans Banen — Ndik-Biakat, Ndik-Touna, Ndik-Nanga et Ndik-Banol  y ont convergé depuis le Mbam et Inoubou pour former ce territoire commun.</p>
            </div>
            <div class="border-l-4 pl-4" style="border-color: var(--ocre);">
              <p class="text-xs uppercase tracking-wider font-semibold mb-1" style="color: var(--or);">Traditions</p>
              <p class="font-lora text-sm leading-relaxed">Le peuple Banen de Yingui se reconnaît dans la figure de son héros légendaire Manimben y Tomby, le Lion Noir, symbole de résistance face à la pénétration allemande au début du XXe siècle — courage incarné aujourd'hui encore dans le lion des forces armées camerounaises. Le mot « Banen » est le pluriel de <b>Munen</b>, signifiant l'homme noble, riche spirituellement, matériellement et moralement — une identité fièrement portée par chaque habitant de ces collines.</p>
            </div>
            <a 
              [routerLink]="['/communautes' ,linkYingui()]"fragment="histoire" class="block mx-auto mt-4 text-sm font-semibold transition-colors bg-[#E8A020] text-white p-3 rounded-full text-center w-max">Découvrir  Yingui →</a>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden relative h-96" style="border: 2px solid rgba(181,37,30,0.4);">
          @if (imgYingui()){
            <img 
            class="object-cover w-full"
            fill
            [alt]="'Yingui'"
            [title]="'Yingui'"
            [ngSrc]="imgYingui() ?? ''" />
          }
          @else {
            <!-- placeholder pendant le chargement -->
            <div class="w-full h-full" style="background: rgba(45,106,79,0.15);"></div>
          }
          
        </div>
      </div>
    </div>
      }
    }
  </div>
</section>

  `,
  styleUrl: './communaute.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Communaute implements AfterViewInit , OnInit {

  /**************************
   * INJECT
   */
  private readonly platformId = inject(PLATFORM_ID);
  

   /*********************
   * CONSTRUCTEUR
   */
  constructor() {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
    
  }
  
  /*****************************
   * SIGNALS
   */
   activeTab = signal<Tab>('ndiki');
   readonly isBrowser = signal(false);
   tabChange =output<Tab>();
   imgNitoukou=input<string>();
   imgNdiki=input<string>();
   imgYingui=input<string>();
   linkNitoukou=input<string>();
   linkNdiki=input<string>();
   linkYingui=input<string>();

   tabVisible = signal(false);
   
  /*****************************
   * INJECT
   */
  private el = inject(ElementRef);
  private injector = inject(Injector);
  /********************************
   * DECLARATIONS
   */
  readonly tabs: { id: Tab; label: string }[] = [
    { id: 'ndiki',      label: '🌍 Ndikiniméki' },
    { id: 'nitoukou', label: '🌿 Nitoukou'   },
    { id: 'yingui',    label: '⚡ Yingui'       },
  ];

  ngOnInit(): void {
    if(!this.isBrowser()) return;
  }
  
  ngAfterViewInit(): void {
    if(!this.isBrowser()) return;
    setTimeout(() => {
      this.initScrollReveal();      // ← gère les boutons et autres .reveal
      this.tabVisible.set(true);    // ← gère le premier onglet
    }, 100);
  }

  /****************************************
   * METHODS
   */
  private initScrollReveal(): void {
    
    const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

  this.el.nativeElement
    .querySelectorAll('.reveal:not(.visible)')
    .forEach((el: Element) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');   // déjà dans le viewport
      } else {
        observer.observe(el);          // hors viewport → observer
      }
    });
  }

  showTab(event: Tab): void {
    this.tabVisible.set(false);
    this.activeTab.set(event);
    this.tabChange.emit(event);
    afterNextRender(
      () => setTimeout(() => this.tabVisible.set(true), 50),
      { injector: this.injector }
    );
  }
}
