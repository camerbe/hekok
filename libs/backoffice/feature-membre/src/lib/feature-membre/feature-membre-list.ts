import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CrudHeader } from '@org/crud-header';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MembreApiService } from '@org/membre-api';
import { AuthService } from '@org/auth';
import { Membre, MembreDetail, Message } from '@org/shared';

@Component({
  selector: 'lib-feature-membre-list',
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
            title="{{ headerTile }}" 
            actionLabel='Retour à la création' 
            actionIcon="pi pi-plus-circle"
            actionLink="/dashboard/membres"
          ></lib-crud-header>
        </div>
        <div class="card">
          <p-table
            [value]="membreList()"
            [rows]="10"
            [paginator]="membreListCount() > 10"
            [rowsPerPageOptions]="[10, 20, 50]"
            >
            <ng-template pTemplate="header">
              <tr>
                <th>#</th>
                <th>Membre</th>
                <th>Stage</th>  
                <th>Statut</th>
                <th>Inscription</th>
                <th>Action</th>
              </tr> 
            </ng-template>
            <ng-template pTemplate="body" let-membre let-i="rowIndex">
              <tr>
                <td>{{ i + 1 }}</td>
                <td>{{ membre.nom }} {{ membre.prenom }}</td>
                <td>
                {{ membre.datefinstage | date:'dd-MM-yyyy' }}
                </td>
                <td>
                @switch(membre.statut){
                  @case('Actif'){
                    <i class="pi pi-thumbs-up text-green-600 font-bold"></i>
                  }
              
                  @case('Suspendu'){
                    <i class="pi pi-pause text-yellow-600 font-bold"></i>
                  }
 
                  @case('Inactif'){
                    <i class="pi pi-thumbs-down text-red-600 font-bold"></i>
                  }
                  @case('Exclu'){
                    <i class="pi pi-ban text-red-600 font-bold"></i>
                  }
                  
                  @default {
                    <i class="pi pi-question-circle text-gray-600 font-bold"></i>
                  }
                  
                }
                  
                
                </td>
                <td>
                {{ membre.dateinscription | date:'dd-MM-yyyy' }}
                </td>
                <td>  
                  <div class="flex">
                      <a routerLink="/dashboard/membres/show/{{membre.id}}" class="text-green-700 hover:text-blue-700 mr-4" pTooltip="Mise à jour" tooltipPosition="top">
                        <i class="pi pi-pen-to-square"></i>
                      </a>
                      <a
                                                
                        tabindex=""
                        role="button"
                        (click)="onDelete(membre?.id)" 
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
  styleUrl: './feature-membre.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureMembreList implements OnInit {
  

  /**************************
   * INJECT
   */
  private readonly membreApiService = inject(MembreApiService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
   
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly confirmationService=inject(ConfirmationService);
  
  private readonly router = inject(Router);
  /**************************************
   * SIGNALS
   */
  readonly membreList = signal<MembreDetail[]>([]);
  protected readonly membreListCount = computed(() => this.membreList().length);
  protected headerTile = 'Liste des membres';

 
  /*******************************
   * Methods
   */
  protected onDelete(id: string ) {
    if (!id) return;
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce membre ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.membreApiService.delete(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
                detail: 'Membre supprimé avec succès'
              });
              this.loadMembreList();
            },
          error: () => {
             
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Échec de la suppression du membre'
              });
            }
          
        });
      }
    }); 
  }

  

  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    // this.loadMembreList();
    const membresFromResolver = this.activatedRoute.snapshot.data['membreListResolver'] as MembreDetail[];
    this.membreList.set(membresFromResolver);
    if (!membresFromResolver || membresFromResolver.length === 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Aucun membre trouvé'
      });
    } 
  }
  private loadMembreList() {
    this.membreApiService.getAll().subscribe({
      next: (response) => {
        const { data, success, message } = response as unknown as Membre;
        const membresData: MembreDetail[] = data as unknown as MembreDetail[];
        if (success) {
          this.membreList.set
          (membresData);
        } else {       
          this.messageService.add({
            severity: 'warn',
            summary: 'Avertissement',
            detail: message ?? 'Aucun membre trouvé'
          });
        } 
        //const membresData: MembreDetail[] = Array.isArray(data) ? data : [];
         
      },
    error: () => {
     
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger les membres'
      });
    }
    }); 
  }
}
