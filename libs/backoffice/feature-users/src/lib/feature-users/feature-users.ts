import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormField, form, required, email } from '@angular/forms/signals';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { UserApiService } from '@org/user-api';
import { User } from '@org/user';
import { UserCreateDto, UserDetail, UserListResponse } from '@org/shared';
import { CrudHeader } from '@org/crud-header';
import { CrudButton } from '@org/crud-button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import {AuthService} from '@org/auth';

type CreateUserForm = UserCreateDto 

@Component({
  selector: 'bo-feature-users',
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
    CrudButton
  ],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>
    <div class="flex justify-center">
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div class="text-center mb-8">
          
          <lib-crud-header 
            title="{{ crudHeaderTitle() }}" 
            actionLabel='Retour à la liste' 
            actionIcon="pi pi-list"
            actionLink="/dashboard/users/list"
          ></lib-crud-header>
        </div>

    <form class="py-3 grid grid-cols-1 md:grid-cols-2 gap-5" (submit)="onSubmit()">
      
      <!-- Nom -->
      <div class="flex flex-col gap-1">
        <label for="nom" class="text-sm font-medium text-slate-700">Nom</label>
        
          <input 
            pInputText  
            [formField]="form.nom"
            placeholder="Nom" />
        @if(form.nom().invalid() && form.nom().touched()) {
          <small class="text-red-600">Le nom est requis.</small>
        }
      </div>

      <!-- Prénom -->
      <div class="flex flex-col gap-1">
        <label for="prenom" class="text-sm font-medium text-slate-700">Prénom</label>
        <input 
          pInputText  
          [formField]="form.prenom"
          placeholder="Prénom" />
        @if(form.prenom().invalid() && form.prenom().touched()) {
          <small class="text-red-600">Le prénom est requis.</small>
        }
      </div>

      <!-- Email -->
      <div class="flex flex-col gap-1  md:col-span-2">
        <label for="email" class="text-sm font-medium text-slate-700">Email</label>
        <p-inputGroup>
          <p-inputGroupAddon>
             @
          </p-inputGroupAddon>
           
            <input 
              type="email"
              pInputText  
              [formField]="form.email"
              placeholder="Email" />
        </p-inputGroup>
        @if(form.email().invalid() && form.email().touched()) {
          <small class="text-red-600">L'email est requis et doit être valide.</small>
         
        }
      </div>
      <!-- Rôle -->
      <div class="flex flex-col gap-1  md:col-span-2">
        <label for="email" class="text-sm font-medium text-slate-700">Rôle</label>
        <div class="flex flex-wrap gap-4">
           <div class="flex items-center">
              <p-radiobutton 
                name="role" 
                value="Admin" 
                [formField]="form.role"
                inputId="Adm" 
                
                (onChange)="onRoleSelect('Admin')"
              />
              <label for="Adm" class="ml-2">Administrateur</label>
           </div>
           <div class="flex items-center">
              <p-radiobutton 
                name="role" 
                value="Tre" 
                [formField]="form.role"
                inputId="Tre" 
                
                (onChange)="onRoleSelect('Tre')"
              />
              <label for="Tre" class="ml-2">Trésorier</label>
           </div>
           <div class="flex items-center">
              <p-radiobutton 
                name="role" 
                value="Sec" 
                inputId="Sec" 
                [formField]="form.role"
                
                (onChange)="onRoleSelect('Sec')"
              />
              <label for="Sec" class="ml-2">Secrétaire</label>
           </div>
        </div>
        @if(form.role().invalid() && form.role().touched()) {
          <small class="text-red-600">Le rôle est requis.</small>
         
        }
         
         
      </div>
      @if(isAddMode()) {
      <!-- Mot de passe -->
      <div class="flex flex-col gap-1">
        <label for="password" class="text-sm font-medium text-slate-700">Mot de passe</label>
        <p-inputGroup>
          <p-inputGroupAddon>
            <i class="pi pi-key"></i>
          </p-inputGroupAddon>
          <input 
            type="password"
            pInputText
            [formField]="form.password"
            placeholder="Password"
          />
        </p-inputGroup>
      </div>
      <div class="flex flex-col gap-1">
        <label for="password_confirmation" class="text-sm font-medium text-slate-700">Confirmation du mot de passe</label>
        <p-inputGroup>
          <p-inputGroupAddon>
            <i class="pi pi-key"></i>
          </p-inputGroupAddon>
          <input 
            type="password"
            pInputText
            [formField]="form.password_confirmation"
            placeholder="Confirmation du mot de passe"
          />
        </p-inputGroup>
      </div>
      }
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
    </div>
  `,
  styleUrl: './feature-users.css',
})
export class FeatureUsers implements OnInit {
  
  
 
  readonly userData=signal<CreateUserForm>({
    id:'',
    nom:'',
    prenom:'',
    role:'',
    email:'',
    password:'', 
    password_confirmation:''
  });

  readonly form=form(this.userData,(root)=>{
    required(root.nom);
    required(root.prenom);
    required(root.email);
    email(root.email);
    required(root.role);
    required(root.password);
    required(root.password_confirmation);
        
  });
  //INJECT
  private readonly router=inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected crudHeaderTitle=signal('Création de compte');
  protected crudButtonLabel=signal('Création de compte');
  protected loading=signal(false);
  //protected isAddMode=signal(false);
  private id=signal<string | null>(null);

  readonly canSubmit = computed(() => this.form().valid() && !this.loading());
  readonly emailErrors = computed(() => this.form.email());
  protected readonly isAddMode = computed(() => !this.id());

  //INJECT

  protected messageService=inject(MessageService);
  private userService=inject(UserApiService);
  private readonly authService = inject(AuthService);
  
  
  private createUser() {
    this.userService.register(this.userData()).subscribe({
      next:(res)=>{
        const user: User = res;
        this.messageService.add({
          severity:'success', 
          summary: 'Utilisateur créé', 
          detail: `L'utilisateur a été créé avec succès.`
        });
        this.form().reset();
        this.router.navigate(['/dashboard/users/list']);
      },
      error:()=>{
        this.messageService.add({
          severity:'error', 
          summary: 'Erreur de création', 
          detail: `Une erreur est survenue lors de la création de l'utilisateur.`
        });
      }
    });
  }
   
  private updateUser() {
    const tmpUserData = this.userData() as unknown as UserListResponse;
    this.userService.patch(this.id()!, tmpUserData).subscribe({
      next:(res)=>{
        const user: User = res;
        this.messageService.add({
          severity:'success', 
          summary: 'Utilisateur mis à jour', 
          detail: `L'utilisateur a été mis à jour avec succès.`
        });
        this.form().reset();
        this.router.navigate(['/dashboard/users/list']);
      },
      error:(err)=>{
        this.messageService.add({
          severity:'error', 
          summary: 'Erreur de mise à jour', 
          detail: `Une erreur est survenue lors de la mise à jour de l'utilisateur.`
        });
      }
    }); 
  }


  onSubmit() {
    
    if (this.form().invalid()) {
      this.form().markAsTouched();
      this.messageService.add({
        severity:'error', 
        summary: 'Formulaire invalide', 
        detail: 'Veuillez corriger les erreurs du formulaire.'
      });
      return;
    }

    //this.isAddMode() ? this.createUser() : this.updateUser(); 
    if(this.isAddMode()) {
      this.createUser();
    }
    else{
      
      this.updateUser();
    }
    
    
  }

  protected onRoleSelect(value: 'Admin' | 'Tre' | 'Sec') {
    this.form.role().value.set(value);
    this.form.role().markAsTouched();
    
  }

  ngOnInit(): void {
    if(this.authService.isTokenExpired()) {
      this.router.navigate(['/auth/login']);
    }
     this.id.set(this.activatedRoute.snapshot.paramMap.get('id'));
     //this.isAddMode.set(!this.id());
     if (!this.isAddMode()) {
      const userFromResolver = this.activatedRoute.snapshot.data['oneUserResolver'] as UserDetail | null;
      
      this.crudHeaderTitle.set('Maj de compte');
      this.crudButtonLabel.set('Mettre à jour');
      
      if (userFromResolver) {
        this.userData.set({
          id: userFromResolver.id,
          nom: userFromResolver.nom,
          prenom: userFromResolver.prenom,
          role: userFromResolver.role,
          email: userFromResolver.email,
          password: '12345678', // Valeur par défaut pour le mot de passe (à ne pas utiliser en production)
          password_confirmation: '12345678' // Valeur par défaut pour la confirmation du mot de passe (à ne pas utiliser en production)
        });
      }
     }
  }

}
