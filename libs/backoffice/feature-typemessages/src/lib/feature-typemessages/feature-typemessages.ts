import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CrudHeader } from '@org/crud-header';
import { CrudButton } from '@org/crud-button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { FormField, form, required } from '@angular/forms/signals';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TypeMessage, TypeMessageDetail } from '@org/shared';
import { AuthService } from '@org/auth';
import { TypeMessageApiService } from '@org/typemessage-api';


@Component({
  selector: 'bo-feature-typemessages',
  providers: [
    MessageService,
    ConfirmationService
  ],
  imports: [
    FormField,
    ToastModule,
    InputTextModule,
    InputGroupModule,
    ButtonModule,
    InputGroupAddonModule,
    PasswordModule,
    RadioButtonModule,
    CrudHeader,
    CrudButton,
    ConfirmDialogModule
  ],
  template: `
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div class="text-center mb-8">
        <lib-crud-header 
            title="{{ crudHeaderTitle() }}" 
            actionLabel='Retour à la liste' 
            actionIcon="pi pi-list"
            actionLink="/dashboard/typemessages/list"
          ></lib-crud-header>
      </div>
      <form class="py-3 grid grid-cols-1 md:grid-cols-2 gap-5" (submit)="onSubmit()">
        <!-- Nom -->
        <div class="flex flex-col gap-1 col-span-2">
          <label for="typemessage" class="text-sm font-medium text-slate-700">Type de message</label>
          
            <input 
              pInputText  
              [formField]="form.typemessage"
              placeholder="typemessage" />
          @if(form.typemessage().invalid() && form.typemessage().touched()) {
            <small class="text-red-600">Le type de message est requis.</small>
          }
        </div>
        <!-- Bouton submit (pleine largeur) -->
      <div class="md:col-span-2">
        <lib-crud-button
          
          [label]="crudButtonLabel() " 
          [icon]="'pi pi-user-plus'"
          (clicked)="onSubmit()"
          [disabled]="!canSubmit()"
        ></lib-crud-button>
        
      </div>
      </form>

    </div>
  `,
  styleUrl: './feature-typemessages.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureTypemessages implements OnInit {



  readonly userData=signal({
    typemessage: '',
  });
 
  readonly form = form(this.userData,(root)=> {
    required(root.typemessage);
  });

  private readonly router=inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected crudHeaderTitle=signal('Création de type de message');
  protected crudButtonLabel=signal('Création de type de message');
  protected loading=signal(false);
  //protected isAddMode=signal(false);
  private id=signal<string | null>(null);

  readonly canSubmit = computed(() => this.form().valid() && !this.loading());

   protected readonly isAddMode = computed(() => !this.id());

   //INJECT

  protected messageService=inject(MessageService);
  private readonly authService = inject(AuthService);
  private readonly typeMessageApiService = inject(TypeMessageApiService);

  onSubmit() {
     if (this.form().invalid()) {

      this.form().markAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez corriger les erreurs dans le formulaire'
      });
      return;
    }
    if (this.isAddMode()) {
      this.createTypeMessage();
    } else {
      this.updateTypeMessage();
    }
  }

  private updateTypeMessage() {
    const tmpTypemessage=this.userData() as unknown as TypeMessage;
    this.typeMessageApiService.update(this.id()!, tmpTypemessage).subscribe({
      next: (response) => {
        const {data,success,message}
        =response as unknown as TypeMessage;
        console.log(response);
        if (success) {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: message || 'Le type de message a été mis à jour avec succès.' });
          this.router.navigate(['/dashboard/typemessages/list']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message || 'Impossible de mettre à jour le type de message.' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de mettre à jour le type de message.' });
      }
    });
  }

  private createTypeMessage() {
    this.typeMessageApiService.store(this.userData()).subscribe({
      next: (response) => {
        const {data,success,message}=response as unknown as TypeMessage;
        console.log(response);
        if (success) {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: message || 'Le type de message a été créé avec succès.' });
          this.router.navigate(['/dashboard/typemessages/list']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message || 'Impossible de créer le type de message.' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de créer le type de message.' });
      }
    }); 
  }

  ngOnInit(): void {
    if(this.authService.isTokenExpired()) {
      this.router.navigate(['/auth/login']);
    }
    this.id.set(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!this.isAddMode()) {
      const typemessageFromResolver = this.activatedRoute.snapshot.data['oneTypeMessageResolver'] as TypeMessageDetail | null;
      
      this.crudHeaderTitle.set('Maj de compte');
      this.crudButtonLabel.set('Mettre à jour');
      if (typemessageFromResolver) {
        this.userData.set({
          typemessage: typemessageFromResolver.typemessage,
        });
      }
    }
    
  }
}
