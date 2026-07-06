import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageService ,ConfirmationService,} from 'primeng/api';
import { UserApiService } from '@org/user-api';
import { UserDetail,UserListResponse } from '@org/shared';
import { CrudHeader } from '@org/crud-header';
import { ActivatedRoute, Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterLink } from '@angular/router';
import { AuthService } from '@org/auth';



@Component({
  selector: 'bo-feature-users',
  imports: [
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
            title="Liste des comptes" 
            actionLabel='Retour à la création' 
            actionIcon="pi pi-plus-circle"
            actionLink="/dashboard/users"
          ></lib-crud-header>
        </div>
        <div class="card">
           <p-table 
            [value]="userList()"
            [rows]="5"
            [paginator]="userListCount() > 5"
            [rowsPerPageOptions]="[10, 20]" >
              <ng-template pTemplate="header">
                <tr>
                  <th>#</th>
                  <th>Nom & Prénom</th>
                  <th>Email</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
               

              </ng-template>
              <ng-template pTemplate="body" let-user let-i="rowIndex">
                <tr>
                  <td>{{i + 1}}</td>
                  <td>{{user.fullName}}</td>
                  <td>{{user.email}}</td>
                  <td>
                    @if(user.email_verified_at) {
                      <span class="text-green-600"><i class="pi pi-thumbs-up-fill"></i></span>
                    } @else {
                      <span class="text-red-600"><i class="pi pi-thumbs-down-fill"></i></span>
                    }
                  </td>
                  <td>
                    <div class="flex">
                      <a routerLink="/dashboard/users/show/{{user.id}}" class="text-green-700 hover:text-blue-700 mr-4" pTooltip="Mise à jour" tooltipPosition="top">
                        <i class="pi pi-pen-to-square"></i>
                      </a>
                      <a
                                                
                        tabindex=""
                        role="button"
                        (click)="onDelete(user?.id)" 
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
  styleUrl: './feature-users.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureUsersList implements OnInit {
  
  
  readonly userLists=signal<UserDetail[]>([]);
  readonly userList = computed(() => this.userLists());
  protected readonly userListCount = computed(() => this.userLists().length);
 

  private readonly userApiService = inject(UserApiService);
  private readonly messageService = inject(MessageService);
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly confirmationService=inject(ConfirmationService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    //console.log('Initializing FeatureUsersList component...');
    if(this.authService.isTokenExpired()) {
      this.router.navigate(['/auth/login']);
    }
    const usersFromResolver = this.activatedRoute.snapshot.data['userListResolver'] as UserDetail[] | null;
    if (usersFromResolver) {
      this.userLists.set(usersFromResolver);
    }
    //console.log(this.userList());
  }

  private loadUsers() {
   this.userApiService.getAll().subscribe({
    next: (users) => {
      const {data,success,message } = users as unknown as UserListResponse;
      if (success && data) {
        this.userLists.set(data);
      } else {
        this.messageService.add({ 
          severity: 'warn', summary: 'Avertissement', detail: message ?? 'Aucun utilisateur trouvé.' 
        });
      }
    },
    error: () => this.messageService.add({ 
      severity: 'error', summary: 'Erreur', detail: 'Aucun utilisateur trouvé.' 
    })
  });
   
  }
  onDelete(userId: string) {
    //console.log('Delete user with ID:', userId);
    //this.loadUsers(); // Recharger la liste avant de confirmer la suppression
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui, supprimer',
      rejectLabel: 'Non, annuler',
      accept: () => {
        
        this.userApiService.delete(userId).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur supprimé avec succès.' });
            this.loadUsers(); // Recharger la liste après suppression
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la suppression.' });
          }
        });
      }
    });
  }
    
  

}
