import { Component, computed, inject, signal } from '@angular/core';
import { LoginCredentials } from '@org/shared';
import { email, form, required,FormField } from '@angular/forms/signals';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService, LocalStorageService } from '@org/auth';
import { Router } from '@angular/router';
import { ForgotPassword } from '@org/qui-sommes-nous';

interface CreateLoginForm extends LoginCredentials {}

@Component({
  selector: 'lib-login',
  imports: [
    InputGroupModule, 
    InputGroupAddonModule,
    PasswordModule,
    FormField,
    InputTextModule,
    ForgotPassword
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-[linear-gradient(160deg,_#1A0F05_0%,_#2D1206_40%,_#3D1A08_70%,_#1A0F05_100%)] px-4 py-12">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-bold text-[#C8651A]">Welcome to Hekok</h1>
              <p class="text-[#C8651A] mt-2">Sign in to access your dashboard</p>
               <form  class="space-y-5 py-3" (submit)="onSubmit($event)" >
                <!-- Email -->
                <div class="space-y-1">
                  <p-inputGroup>
                      <p-inputGroupAddon>
                          @
                      </p-inputGroupAddon>
                      <input 
                        pInputText  
                        [formField]="form.email"
                        placeholder="Email" />
                  </p-inputGroup>
                  
                </div>
                <div class="space-y-1">
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
                <div class="space-y-1">
                  <button type="submit" [disabled]="!canSubmit()"
                    class="w-full bg-[#C8651A] hover:bg-[#F5E6C8] disabled:bg-[#B5251E] disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2" >
                    @if (loading()) {
                      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Connexion...
                    } @else {
                      Se connecter
                    }
                  </button>
                </div>
                <div class="space-y-1">
                 <lib-forgot-password></lib-forgot-password> 
                </div>
              </form>
            </div>
           
        </div>
        

    </div>
  `,
  styleUrl: './login.css',
  
})
export class LoginComponent {

  readonly loginData=signal<CreateLoginForm>({
    email:'',
    password:''
  });

  readonly form=form(this.loginData,(root)=>{
    required(root.email);
    email(root.email);
    required(root.password);
  });

  loading = signal(false);
  readonly canSubmit = computed(() => this.form().valid() && !this.loading());

  // INJECT AUTH SERVICE AND CALL IT IN THIS METHOD

  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  private readonly localStorageService=inject(LocalStorageService)


  onSubmit(event: Event){
    event.preventDefault();
    this.loading.set(true);
    this.authService.login(this.loginData()).subscribe({
      next:(res)=>{
        //console.log('Login successful:', res);
        //console.log('Login successful:', res.user.email);
         const expiredTime = Date.now() + (30 * 60 * 1000);
         this.localStorageService.setExpiredTime(expiredTime);

        this.loading.set(false);
        this.router.navigate(['/dashboard']);
        // if(res.user.email_verified_at) {
          
        //   this.router.navigate(['/dashboard']);
        // }
        // else{
        //   this.localStorageService.setEmail(res.user.email);
        //   this.router.navigate(['/auth/reset-password']);
        // }
        
      },
      error:()=>{
        this.loading.set(false);
      }
    })
   
  } 
}
