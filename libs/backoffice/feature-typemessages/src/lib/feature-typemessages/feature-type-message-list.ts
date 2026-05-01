import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CrudHeader } from '@org/crud-header';
import { ActivatedRoute, Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterLink } from '@angular/router';
import { AuthService } from '@org/auth';
import { ButtonModule } from 'primeng/button';
import { MessageService ,ConfirmationService,} from 'primeng/api';
import { TypeMessage, TypeMessageDetail } from '@org/shared';
import { TypeMessageApiService } from '@org/typemessage-api';

@Component({
  selector: 'bo-feature-type-message-list',
  standalone: true,
  imports: [
    TableModule,       
    ToastModule,      
    CrudHeader,
    TooltipModule,
    ButtonModule,
    ConfirmDialogModule,
    RouterLink,
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
            title="Liste des types de messages" 
            actionLabel='Retour à la création' 
            actionIcon="pi pi-plus-circle"
            actionLink="/dashboard/typemessages"
          ></lib-crud-header>
        </div>
        <div class="card">
          <p-table
            [value]="typeMessageLists()"
            [rows]="5"
            [paginator]="typeMessageListCount() > 5"
            [rowsPerPageOptions]="[10, 20]"
            >
            <ng-template pTemplate="header">
              <tr>
                <th>#</th>
                <th>Type de message</th>
                <th>Action</th>
              </tr> 
            </ng-template>
            <ng-template pTemplate="body" let-typeMessage let-i="rowIndex">
              <tr>
                <td>{{ i + 1 }}</td>
                <td>{{ typeMessage.typemessage }}</td>
                <td>  
                  <div class="flex">
                      <a routerLink="/dashboard/typemessages/show/{{typeMessage.id}}" class="text-green-700 hover:text-blue-700 mr-4" pTooltip="Mise à jour" tooltipPosition="top">
                        <i class="pi pi-pen-to-square"></i>
                      </a>
                      <a
                                                
                        tabindex=""
                        role="button"
                        (click)="onDelete(typeMessage?.id)" 
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
  styles: ``,
})
export class FeatureTypeMessageList implements OnInit {

  readonly typeMessageLists=signal<TypeMessageDetail[]>([]);
  protected readonly typeMessageListCount = computed(() => this.typeMessageLists().length);

  private readonly typeMessageApiService = inject(TypeMessageApiService);
  private readonly messageService = inject(MessageService);
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly confirmationService=inject(ConfirmationService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      this.router.navigate(['/auth/logout']);
    }
    const typeMessageListFromResolver = this.activatedRoute.snapshot.data['typeMessageListResolver'] as TypeMessageDetail[] | null;
    if (typeMessageListFromResolver) {
      this.typeMessageLists.set(typeMessageListFromResolver);
    } else {
      this.loadTypeMessages();
    } 
  }

  private loadTypeMessages() {
    this.typeMessageApiService.getAll().subscribe({
      next: (response) => {
        const {data,success,message}=response as unknown as TypeMessage;
        const typeMessages = data as unknown as TypeMessageDetail[];
        if (!success) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message || 'Impossible de charger les types de messages' });
          return;
        }
        this.typeMessageLists.set(typeMessages);     
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les types de messages' });
      }
    });
  }
  onDelete(id: string | undefined) {
    if (!id) return;
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce type de message ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.typeMessageApiService.delete(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Type de message supprimé avec succès' });
            this.loadTypeMessages();
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de supprimer le type de message' });
          }
        });
      }
    });
  }
}
