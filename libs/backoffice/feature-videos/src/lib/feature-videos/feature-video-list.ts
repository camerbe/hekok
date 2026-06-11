import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CrudHeader } from '@org/crud-header';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Video, VideoDetail } from '@org/shared';
import { AuthService } from '@org/auth';
import { VideoApiService } from '@org/video-api';

@Component({
  selector: 'bo-feature-video-list',
  providers: [
    MessageService,
    ConfirmationService
  ],
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
  template: `
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>
    <div class="flex justify-center">
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div class="text-center mb-8">
         
          <lib-crud-header 
            
            [isSearch]="false"
            title="Liste des vidéos" 
            actionLabel='Retour à la création' 
            actionIcon="pi pi-plus-circle"
            actionLink="/dashboard/videos"
            
          ></lib-crud-header>
        </div>
        <div class="card">
           <p-table 
            [value]="videoList()"
            [rows]="10"
            [paginator]="videoListCount() > 10"
            [rowsPerPageOptions]="[10, 20]" >
              <ng-template pTemplate="header">
                <tr>
                  <th>#</th>
                  <th>Titre</th>
                  <th>Vidéo</th>
                  <th>Action</th>
                </tr>
               

              </ng-template>
              <ng-template pTemplate="body" let-cinema let-i="rowIndex">
                <tr>
                  <td>{{i + 1}}</td>
                  <td>{{cinema.titre}}</td>
                  <td>
                    {{cinema.video}}
                  </td>
                  
                  <td>
                    <div class="flex">
                      <a routerLink="/dashboard/videos/show/{{cinema.id}}" class="text-green-700 hover:text-blue-700 mr-4" pTooltip="Mise à jour" tooltipPosition="top">
                        <i class="pi pi-pen-to-square"></i>
                      </a>
                      <a
                                                
                        tabindex=""
                        role="button"
                        (click)="onDelete(cinema?.id)" 
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
  styleUrl: './feature-video-list.css',
})
export class FeatureVideoList implements OnInit {
 
  /*********************************
   * SIGNALS
   */
  readonly videoList = signal<VideoDetail[]>([]);
   /*********************************
   * SIGNALS
   */
  protected readonly videoListCount = computed(() => this.videoList().length);
  /*****************************************
   * INJECT
   */
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
   
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly confirmationService=inject(ConfirmationService);
  private readonly router = inject(Router);
  private readonly videoService = inject(VideoApiService);
  /******************************************
   * METHODS
   */
  ngOnInit(): void {
    if(this.authService.isTokenExpired()) {
      this.router.navigate(['/auth/logout']);
    }
    const videosFromResolver = this.activatedRoute.snapshot.data['videoListResolver'] as VideoDetail[];
    this.videoList.set(videosFromResolver);
    if (this.videoList().length === 0) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Aucune vidéo trouvée' });
    }
  }
  onDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette vidéo ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.videoService.delete(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Vidéo supprimée avec succès' });
            // Rafraîchir la liste des vidéos après la suppression
           this.loadVideoList();
          },
          error: (err) => {
            console.error('Erreur lors de la suppression de la vidéo:', err);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la suppression de la vidéo' });
          }
        });
      }
    });
  }
  private loadVideoList() {
    this.videoService.getAll().subscribe({
      next: (res) => {
        const { data,success,message } = res as unknown as Video;
        if (success) {
          this.videoList.set(data as unknown as VideoDetail[]);
          if (this.videoList().length === 0) {
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Aucune vidéo trouvée' });
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message || 'Une erreur est survenue lors du chargement des vidéos' });
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des vidéos:', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors du chargement des vidéos' });
      }
    });
  }
}
