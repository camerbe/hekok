import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { InputTextModule } from 'primeng/inputtext';
import { CrudButton } from '@org/crud-button';
import { AuthService, LocalStorageService } from '@org/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'lib-feature-users-upd-pw',
  imports: [
    FormField,
    InputTextModule,
    CrudButton
  ],
  template: `
    <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-indigo-700">
      <div class="w-1/3 max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-slate-900">Modifier le mot de passe</h1>          
        </div>

    <form class="py-3 grid grid-cols-1  gap-5" (submit)="onSubmit()">
      
      
      <!-- Nouveau mot de passe -->
      <div class="flex flex-col gap-1 col-span-12">
        <label for="password" class="text-sm font-medium text-slate-700">Nouveau mot de passe</label>
        <input 
          type="password"
          pInputText  
          [formField]="form.password"
          placeholder="Nouveau mot de passe" />
        @if(form.password().invalid() && form.password().touched()) {
          <small class="text-red-600">Le nouveau mot de passe est requis.</small>
        }
      </div>
      <!-- Confirmation du mot de passe -->
      <div class="flex flex-col col-span-12 gap-1">
        <label for="confirmPassword" class="text-sm font-medium text-slate-700">Confirmation du mot de passe</label>
        <input 
          type="password"
          pInputText  
          [formField]="form.password_confirmation"
          placeholder="Confirmation du mot de passe" />
        @if(form.password_confirmation().invalid() && form.password_confirmation().touched()) {
          <small class="text-red-600">La confirmation du mot de passe est requise.</small>
        }
      </div>

      
      <!-- Bouton submit (pleine largeur) -->
      <div class="md:col-span-12">
        <lib-crud-button
          
          [label]="crudButtonLabel() " 
          [icon]="'pi pi-user-plus'"
          (clicked)="onSubmit()"
          [disabled]="!canSubmit()"
        ></lib-crud-button>
        
      </div>

    </form>
  `,
  styles: ``,
})
export class FeatureUsersUpdPw implements OnInit {
  
  /**************************
   * VARIABLES
   */
  readonly userData=signal({
    password:'',
    password_confirmation:'',
    token:'',
    email:''
  });
  
  readonly form=form(this.userData,(root)=>{
    required(root.password);
    required(root.password_confirmation);
    minLength(root.password, 8);
    //confirmPassword(root.password,root.password_confirmation);
    
    
  });
   protected crudButtonLabel=signal('Modifier le mot de passe');
   protected loading=signal(false);
   private readonly token = signal('');
   private readonly email = signal('');
  /*******************************
   * COMPUTED
   */
   readonly canSubmit = computed(() => this.form().valid() && !this.loading());
   /**************************************
    * INJECTS
    */
   private authService=inject(AuthService);
   private router=inject(Router);
   private localStorageService=inject(LocalStorageService);
    private readonly messageService = inject(MessageService);
   private readonly activatedRoute = inject(ActivatedRoute);
    
  /*************************************
   * METHODS
   */
  onSubmit() {
    if(this.form().valid()) {
      this.loading.set(true);
      this.userData().token=this.token();
      this.userData().email=this.email();
      this.authService.resetPassword(this.userData()).subscribe({
        next: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.'
          });
          this.router.navigate(['/auth/login']);
        },
        error: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Une erreur est survenue lors de la réinitialisation du mot de passe. Veuillez réessayer.'
          });
        }
      });
     
      
    }
   }
   ngOnInit(): void {
    
    this.token.set(this.activatedRoute.snapshot.paramMap.get('token')??'');
    this.email.set(this.activatedRoute.snapshot.queryParamMap.get('email')??'');

    
  }
  
}
