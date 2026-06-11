import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '@org/auth';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'lib-forgot-password',
  imports: [
    ButtonModule, 
    DialogModule, 
    InputTextModule,
    FormField,
    ToastModule
  ],
  template: `
    <p-toast></p-toast>
    <div class="card flex justify-center">
            <a
              href="#"
              class="text-sm text-[#B5251E] hover:underline"
              (click)="showDialog(); $event.preventDefault()"
            >
              <span class="pi pi-check text-[#C8651A] ">Mot de passe oublié</span>
          </a>
            <p-dialog header="" [modal]="true" [(visible)]="visible">
                <span class="text-[#C8651A] block mb-8 font-semibold card-title uppercase ">Réinitialisation du mot de passe</span>
                
                <div class="flex items-center gap-4 mb-8">
                    
                    <input 
                    placeholder="Entrez votre adresse e-mail"
                    pInputText 
                    [formField]="form.email"
                    class="flex-auto w-full" 
                    autocomplete="off" />
                </div>
                <div class="gap-2 flex justify-end">
                    
                    <p-button label="Envoyer"  class="w-full text-[##F5E6C8]" (click)="onSubmit()" />
                </div>
            </p-dialog>
        </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPassword {
/*******************************
 * VARIABLES
 */
  visible=signal<boolean>(false);

  readonly userData=signal({
    email:''
  });

  readonly form=form(this.userData,(root)=>{
    required(root.email);
    email(root.email);
    
    
    
  });
  /******************************
 * INJECTS
   */
  private authService=inject(AuthService);
  private router=inject(Router);
   private readonly messageService = inject(MessageService);
  /********************************
   * METHODS
   */
  showDialog() {
    this.visible.set(true);
  }
  onSubmit(event?: Event) {
    // Logic to handle password reset request
    // You can call your authentication service here to send the reset email
    event?.preventDefault();
    if(this.form().valid()) {
      
      this.authService.forgotPassword(this.userData()).subscribe({
        next:()=>{
          this.messageService.add({severity:'success', summary:'Succès', detail:'Un e-mail de réinitialisation du mot de passe a été envoyé si l\'adresse e-mail existe. Veuillez vérifier votre boîte de réception.'});
          this.visible.set(false);
          this.router.navigate(['/auth/login']);
        },
        error:()=>{
          this.messageService.add({severity:'error', summary:'Erreur', detail:'Une erreur est survenue lors de la demande de réinitialisation du mot de passe. Veuillez réessayer.'});
          this.visible.set(false);
        }
      });
    }
    else{ 
      this.messageService.add({severity:'error', summary:'Erreur', detail:'Veuillez remplir tous les champs obligatoires.'});
     ;
    }
  }
   
}
