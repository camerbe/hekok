import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticleApiService } from '@org/article-api';
import { AuthService } from '@org/auth';
import { CrudHeader } from '@org/crud-header';
import { Article, ArticleDetail } from '@org/shared';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'bo-feature-article-list',
  imports: [
    CommonModule,
    TableModule,       
    ToastModule,      
    CrudHeader,
    TooltipModule,
    ButtonModule,
    ConfirmDialogModule,
    RouterLink
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  template: `
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>
    <div class="flex justify-center">
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div class="text-center mb-8">
         
          <lib-crud-header 
            
            [isSearch]="true"
            title="Liste des articles" 
            actionLabel='Retour à la création' 
            actionIcon="pi pi-plus-circle"
            actionLink="/dashboard/articles"
            (search)="onSearch($event)"
          ></lib-crud-header>
        </div>
        <div class="card">
           <p-table 
            [value]="articleList()"
            [rows]="5"
            [paginator]="articleListCount() > 5"
            [rowsPerPageOptions]="[10, 20]" >
              <ng-template pTemplate="header">
                <tr>
                  <th>#</th>
                  <th>Titre</th>
                  <th>Type article</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
               

              </ng-template>
              <ng-template pTemplate="body" let-art let-i="rowIndex">
                <tr>
                  <td>{{i + 1}}</td>
                  <td>{{art.titre}}</td>
                  <td>
                    {{art.typearticles.typearticle}}
                  </td>
                  <td>
                    {{art.datearticle | date:'dd-MM-yyyy'}}
                  </td>
                  <td>
                    <div class="flex">
                      <a routerLink="/dashboard/articles/show/{{art.id}}" class="text-green-700 hover:text-blue-700 mr-4" pTooltip="Mise à jour" tooltipPosition="top">
                        <i class="pi pi-pen-to-square"></i>
                      </a>
                      <a
                                                
                        tabindex=""
                        role="button"
                        (click)="onDelete(art?.id)" 
                        class="text-red-500 hover:text-red-700" 
                        pTooltip="Suppression" 
                        tooltipPosition="top"
                      >
                        <i class="pi pi-trash"></i>
                        
                    </a>
                    </div>
                  </td>
                </tr>
              </ng-template>
           </p-table>
        </div>
    
      </div>
    </div>
  `,
  styleUrl: './feature-article-list.component.css',
})
export class FeatureArticleListComponent implements OnInit {
  
  /*********************************
   * SIGNALS
   */
  readonly articleList = signal<ArticleDetail[]>([]);
  protected readonly articleListCount = computed(() => this.articleList().length);

  /*****************************************
   * INJECT
   */
  private readonly articleApiService = inject(ArticleApiService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
   
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly confirmationService=inject(ConfirmationService);
  
  private readonly router = inject(Router);

  /*******************************
   * METHODS
   */
  ngOnInit(): void {
    if(this.authService.isTokenExpired()) {
      this.router.navigate(['/auth/logout']);
    }
    
    const articlesFromResolver = this.activatedRoute.snapshot.data['articleListResolver'] as ArticleDetail[];
    this.articleList.set(articlesFromResolver);
    if(!articlesFromResolver){
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Aucun message trouvé'
      });
    }
  } 

  private loadArticles(){
    this.articleApiService.getAll().subscribe({
      next:(res)=>{
        const {data,success,message}=res as unknown as Article

        const articleData=data as unknown as ArticleDetail[]
        if(success && articleData){
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Articles chargés avec succès'
          });
          this.articleList.set(articleData);
        }
        else{
          this.messageService.add({
            severity: 'warn',
            summary: 'Avertissement',
            detail: 'Aucun article trouvé'
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les articles'
        });
      }
    });
  }
  protected onDelete(id: string | undefined) {
      if (!id) return;
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer ce message ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.articleApiService.delete(id).subscribe({
            next: (response) => {
              const { success, message } = response as unknown as Article;
              if (success) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Succès',
                  detail: message || 'Message supprimé avec succès'
                });
                this.loadArticles();
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erreur',
                  detail: message || "Impossible de supprimer l'article"
                });
              }
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: "Impossible de supprimer l'article"
              });
            }
          });
        }
      });
  }
  onSearch(value: string){
    //const target=$event.target;
    //console.log(`value=${value}`)
    if(value.length>0){
      this.articleApiService.searchArticle(value).subscribe({
        next:(res)=>{
          const {data,success,message}=res as unknown as Article
          const articles=data as unknown as ArticleDetail[]
          if(success && articles){
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: `Liste des article ayant la mot ${value}`
            })
            this.articleList.set(articles);
          }
        },
        error: ()=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Pas trouvé'
          });
        }
      })
    }
  }
}
