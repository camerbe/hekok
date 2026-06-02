import { Component, input } from '@angular/core';
import { ArticleDetail } from '@org/shared';
import { DataViewModule } from 'primeng/dataview';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'lib-most-readed',
  imports: [
    DataViewModule,
    RouterLink
  ],
  template: `
    <div class="bg-gray-100 rounded-2xl p-6">
      <div class="flex items-center rounded-2xl md:p-3 p-1" style="background: linear-gradient(135deg, rgba(200,101,26,0.15), rgba(232,160,32,0.10)); border: 1.5px solid rgba(232,160,32,0.3);">
      <p class="font-semibold text-sm uppercase tracking-wider mb-1" style="color: var(--ocre);"><i class="pi pi-plus mr-2"></i>Les articles les plus lus</p>
    </div>
    <ul role="list" class="divide-y divide-gray-100">
        @for (article of mostReadedArticles(); track article.id) {
          <li class="flex justify-between gap-x-6 py-5">
            <div class="flex min-w-0 gap-x-4">
      <img src="{{ article.image }}" alt="{{ article.titre }}" class="size-12 flex-none rounded-full bg-gray-50"/>
      <div class="min-w-0 flex-auto">
        <a routerLink="/actualites/{{ article.slug }}" fragment="actualites" class="block text-sm font-semibold leading-6 text-gray-900">{{ article.titre }}</a>
       
        <p class="mt-1 truncate text-xs/5 text-gray-500"><i class="pi pi-eye mr-1"></i>{{ article.hit}}</p>
      </div>
      </div>
          </li>
        }
      </ul>
    
      
    </div>
      `,
  styleUrl: './most-readed.css',
})
export class MostReaded {
  readonly mostReadedArticles =  input<ArticleDetail[]>([]);

  
}
