import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CrudHeader } from '@org/crud-header';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '@org/auth';  

import { MessageApiService } from '@org/message-api';
import { Message, MessageDetail } from '@org/shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bo-feature-messages-list',
  standalone: true,
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
            title="Liste des messages" 
            actionLabel='Retour à la création' 
            actionIcon="pi pi-plus-circle"
            actionLink="/dashboard/messages"
          ></lib-crud-header>
        </div>
        <div class="card">
           <p-table 
            [value]="messageList()"
            [rows]="5"
            [paginator]="messageListCount() > 5"
            [rowsPerPageOptions]="[10, 20]" >
              <ng-template pTemplate="header">
                <tr>
                  <th>#</th>
                  <th>Type de message</th>
                  <th>Date de fin</th>
                  <th>Action</th>
                </tr>
               

              </ng-template>
              <ng-template pTemplate="body" let-msg let-i="rowIndex">
                <tr>
                  <td>{{i + 1}}</td>
                  <td>
                    {{msg.typemessages.typemessage}}
                  </td>
                  <td>
                    {{msg.datefin | date:'dd-MM-yyyy'}}
                  </td>
                  <td>
                    <div class="flex">
                      <a routerLink="/dashboard/messages/show/{{msg.id}}" class="text-green-700 hover:text-blue-700 mr-4" pTooltip="Mise à jour" tooltipPosition="top">
                        <i class="pi pi-pen-to-square"></i>
                      </a>
                      <a
                                                
                        tabindex=""
                        role="button"
                        (click)="onDelete(msg?.id)" 
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
  styleUrl: './feature-messages-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class FeatureMessagesList implements OnInit {
  // Signals*************************/
  readonly messageList = signal<MessageDetail[]>([]);
  protected readonly messageListCount = computed(() => this.messageList().length);

  // Services*************************/
  private readonly messageApiService = inject(MessageApiService);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
   
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly confirmationService=inject(ConfirmationService);
  
  private readonly router = inject(Router);

   
  ngOnInit(): void {
    if(this.authService.isTokenExpired()) {
      this.router.navigate(['/auth/logout']);
    }
    const messagesFromResolver = this.activatedRoute.snapshot.data['messageListResolver'] as MessageDetail[];
    this.messageList.set(messagesFromResolver);
    if (!messagesFromResolver || messagesFromResolver.length === 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Aucun message trouvé'
      });
    }
  }

  loadMessages() {
    this.messageApiService.getAll().subscribe({
      next: (messages) => {
        const { data, success, message } = messages as unknown as Message;

        const messagesData = data as unknown as MessageDetail[];
        if (success && data) {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Messages chargés avec succès'
          });
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Avertissement',
            detail: message ?? 'Aucun message trouvé'
          });
        }
        this.messageList.set(messagesData);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger les messages'
        });
      }
    });
  }

  onDelete(id: string | undefined) {
    if (!id) return;
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce message ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageApiService.delete(id).subscribe({
          next: (response) => {
            const { success, message } = response as unknown as Message;
            if (success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: message || 'Message supprimé avec succès'
              });
              this.loadMessages();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: message || 'Impossible de supprimer le message'
              });
            }
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Impossible de supprimer le message'
            });
          }
        });
      }
    });
  }
}