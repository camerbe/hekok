import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ArticleDetail } from '@org/shared';
import { TabsModule } from 'primeng/tabs';
import { RouterLink } from '@angular/router';
import { ClassNamesModule } from 'primeng/classnames'

@Component({
  selector: 'lib-culture-banen',
  imports: [
    TabsModule,
    RouterLink,
    ClassNamesModule
  ],
  template: `
  <section id="culture" class=" py-15 px-4 ">
  <div class="card mb-10 tracking-widest " style="background: linear-gradient(135deg, rgba(200,101,26,0.15), rgba(232,160,32,0.10)); border: 1.5px solid rgba(232,160,32,0.3);">
    
    <p-tabs 
      pClass="rounded-full md:p-4"
      [value]="firstTabValue()">
      <p-tablist>
        @for(tab of items(); track trackById($index, tab)) {
          <p-tab 
            [value]="tab?.typearticles?.slug ?? tab?.id">
            {{ tab?.typearticles?.typearticle }}
          </p-tab>
        }
      </p-tablist>
      <p-tabpanels>
        @for(tab of items(); track trackById($index, tab)) {
          <p-tabpanel [value]="tab?.typearticles?.slug ?? tab?.id" >
            <div class="flex justify-between gap-x-6 py-5">
           <div class="flex min-w-0 gap-x-4">
            <img src="{{ tab.image }}" alt="{{ tab.titre }}" class="size-12 md:size-16 flex-none rounded-full bg-gray-50" />
            <div class="min-w-0 flex-auto">
              <p class="text-sm/6 md:text-lg font-semibold text-gray-900">{{ tab.chapeau }}</p>
            </div>
          </div>
          </div>
          
          <div>
            <a [routerLink]="['/communautes',tab.slug]" class="block mx-auto mt-4 text-sm font-semibold transition-colors bg-[#E8A020] text-white p-3 rounded-full text-center w-1/3">{{ tab?.typearticles?.typearticle }}</a> 
          </div>
          </p-tabpanel> 
          
        }
      </p-tabpanels>
    </p-tabs>
  </div>
 </section> 
  `,
  styleUrl: './culture-banen.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CultureBanen {
  culture = input.required<ArticleDetail[]>();
  /**********************
   * COMPUTED
   */
   readonly items = computed(() => this.culture());

   readonly firstTabValue = computed(
    () =>
      this.items()[0]?.typearticles?.slug ??
      this.items()[0]?.id
    );

    trackById(index: number, item: ArticleDetail) {
        return item.id;
    }
}
