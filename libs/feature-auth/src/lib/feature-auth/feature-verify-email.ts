import { Component, inject, OnInit, signal } from '@angular/core';
import { disabled, readonly, required } from '@angular/forms/signals';
import { CrudButton } from '@org/crud-button';
import { form, FormField } from '@angular/forms/signals';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@org/auth';

@Component({
  selector: 'lib-feature-verify-email',
  imports: [
    FormField,
    InputTextModule,
    CrudButton
  ],
  template: `
    
  `,
  styles: ``,
})
export class FeatureVerifyEmail implements OnInit {
  

  /**************************
   * VARIABLES
   */
  readonly userData=signal({
    id:'',
    hash:'',
    
  });
   readonly form=form(this.userData,(root)=>{
    required(root.id);
    readonly(root.id);
    disabled(root.id);
    required(root.hash);        
    readonly(root.hash);
    disabled(root.hash);
        
    
  });
  /*******************************
   * INJECTS
   */
  private authService=inject(AuthService);
  private activatedRoute=inject(ActivatedRoute);
  private router=inject(Router)
  
  /**********************************
   * METHODS
   */
  ngOnInit(): void {
    const verify_url = this.activatedRoute.snapshot.queryParamMap.get('verify_url')??'';
    
    if(verify_url)
    {
      this.authService.verifyEmail(verify_url).subscribe({
        next:()=>{
          console.log('toto');
          this.router.navigate(['/auth/login']);
        },
        error:(err)=>{
          console.log(err);
        }
      })
        
    }

  }

  // onSubmit() {
  //   if(this.form().valid()) {
  //     this.authService.verifyEmail(this.userData().id, this.userData().hash).subscribe({
  //       next: () => {
  //         alert('Email vérifié avec succès !');
  //       },
  //       error: (err) => {
  //         console.error('Erreur lors de la vérification de l\'email :', err);
  //         alert('Échec de la vérification de l\'email. Veuillez réessayer.');
  //       }
  //     });
  //   }
  // }
}
