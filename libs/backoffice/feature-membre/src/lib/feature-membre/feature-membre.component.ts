import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrudHeader } from '@org/crud-header';
import { CrudButton } from '@org/crud-button';
import { FormField,Field  } from '@angular/forms/signals'; 
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { Membre, MembreCreateDto, MembreDetail } from '@org/shared';
import { AuthService } from '@org/auth';
import { MembreApiService } from '@org/membre-api';
import { ActivatedRoute, Router } from '@angular/router';
import { email, form, required } from '@angular/forms/signals';
import { DatePickerModule } from 'primeng/datepicker';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

type CreateMembreForm = MembreCreateDto;
registerLocaleData(localeFr);


@Component({
  selector: 'lib-feature-membre',
  imports: [
    FormField,
    ToastModule,
    InputTextModule,
    InputGroupModule,
    ButtonModule,
    InputGroupAddonModule,
    DatePickerModule,
    RadioButtonModule,
    CrudHeader,
    CrudButton
  ],
  providers: [
    DatePipe,
    ConfirmationService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  template: `
    <p-toast></p-toast>
    <div class="flex justify-center">
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div class="text-center mb-8">
          
          <lib-crud-header 
            title="{{ crudHeaderTitle() }}" 
            actionLabel='Retour à la liste' 
            actionIcon="pi pi-list"
            actionLink="/dashboard/membres/list"
          ></lib-crud-header>
        </div>

    <form class="py-3 grid grid-cols-1 md:grid-cols-2 gap-5" (submit)="onSubmit()">
      <!-- Civilité -->
      <div class="flex flex-col gap-1  md:col-span-2">
        <label for="civilite" class="text-sm font-medium text-slate-700">Civilité</label>
        <div class="flex flex-wrap gap-4">
           <div class="flex items-center">
              <p-radiobutton 
                name="civilite" 
                value="Mr" 
                [formField]="form.civilite"
                inputId="Mr" 
                
                (onChange)="onCiviliteSelect('Mr')"
              />
              <label for="Mr" class="ml-2">Monsieur</label>
           </div>
           <div class="flex items-center">
              <p-radiobutton 
                name="civilite" 
                value="Mme" 
                [formField]="form.civilite"
                inputId="Mme" 
                
                (onChange)="onCiviliteSelect('Mme')"
              />
              <label for="Mme" class="ml-2">Madame</label>
           </div>
           <div class="flex items-center">
              <p-radiobutton 
                name="civilite" 
                value="Mlle" 
                inputId="Mlle" 
                [formField]="form.civilite"
                
                (onChange)="onCiviliteSelect('Mlle')"
              />
              <label for="Mlle" class="ml-2">Mademoiselle</label>
           </div>
        </div>
        @if(form.civilite().invalid() && form.civilite().touched()) {
          <small class="text-red-600">La civilité est requise.</small>
         
        }
         
         
      </div>
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
      <div class="flex flex-col gap-1  ">
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
      <!-- Tel -->
      <div class="flex flex-col gap-1">
        <label for="tel" class="text-sm font-medium text-slate-700">Téléphone</label>
        <p-inputGroup>
          <p-inputGroupAddon>
             <i class="pi pi-phone"></i>
          </p-inputGroupAddon>
           
            <input 
              type="tel"
              pInputText  
              [formField]="form.tel"
              placeholder="Téléphone" />
        </p-inputGroup>
        
      </div>
      <div class="flex flex-col gap-1">
        <label for="dateinscription" class="text-sm font-medium text-slate-700">Date d'inscription</label>
        <p-datepicker 
          [showIcon]="true" 
          dateFormat="dd/mm/yy"
          (onSelect)="onDateSelect($event)"
          placeholder="Date d'inscription"
            >
        </p-datepicker>
        @if(form.dateinscription().invalid() && form.dateinscription().touched()) {
          <small class="text-red-600">La date d'inscription est requise.</small>
        }
       
      </div>
      <div class="flex flex-col gap-1">
        <label for="datefinstage" class="text-sm font-medium text-slate-700">Date de fin de stage</label>
        <p-datepicker 
          [showIcon]="true" 
          dateFormat="dd/mm/yy"
          (onSelect)="onDateFinSelect($event)"
          placeholder="Date de fin de stage"
            >
        </p-datepicker>
          
      </div>
      <!-- Statut -->
      <div class="flex flex-col gap-1  md:col-span-2">
        <label for="statut" class="text-sm font-medium text-slate-700">Statut</label>
        <div class="flex flex-wrap gap-4">
           <div class="flex items-center">
              <p-radiobutton 
                name="statut" 
                value="Actif" 
                [formField]="form.statut"
                inputId="Actif" 
                
                (onChange)="onStatutSelect('Actif')"
              />
              <label for="Actif" class="ml-2">Actif</label>
           </div>
           <div class="flex items-center">
              <p-radiobutton 
                name="statut" 
                value="Suspendu" 
                [formField]="form.statut"
                inputId="Suspendu" 
                
                (onChange)="onStatutSelect('Suspendu')"
              />
              <label for="Suspendu" class="ml-2">Suspendu</label>
           </div>
           <div class="flex items-center">
              <p-radiobutton 
                name="statut" 
                value="Inactif" 
                inputId="Inactif" 
                [formField]="form.statut"
                
                (onChange)="onStatutSelect('Inactif')"
              />
              <label for="Inactif" class="ml-2">Inactif</label>
           </div>
           <div class="flex items-center">
              <p-radiobutton 
                name="statut" 
                value="Exclu" 
                inputId="Exclu" 
                [formField]="form.statut"
                
                (onChange)="onStatutSelect('Exclu')"
              />
              <label for="Exclu" class="ml-2">Exclu</label>
           </div>
        </div>
        @if(form.statut().invalid() && form.statut().touched()) {
          <small class="text-red-600">Le statut est requis.</small>
         
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
    </div>
    `,
  styleUrl: './feature-membre.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureMembreComponent implements OnInit {
  
/**************************
 * Form
 */
  readonly membreData=signal<CreateMembreForm>({
    nom: '',
    prenom: '',
    email: '',
    datefinstage: null,
    tel: '',
    statut: '',
    dateinscription: new Date(),
    civilite: ''
  });
  readonly form=form(this.membreData,(root)=>{
    required(root.nom);
    required(root.prenom);
    required(root.email);
    email(root.email);
    //required(root.datefinstage);
    //required(root.tel);
    required(root.statut);
    required(root.dateinscription);
    required(root.civilite);
  });

  /******************************
   * Inject
   */
  protected messageService=inject(MessageService);
  protected confirmationService=inject(ConfirmationService);
  protected authService=inject(AuthService);
  protected membreApiService=inject(MembreApiService);
  private router=inject(Router);
  private activetatedRoute=inject(ActivatedRoute);
  private datePipe=inject(DatePipe);

/*****************************
 * Signal
 */
  protected crudHeaderTitle=signal('Création de membre');
  protected crudButtonLabel=signal('Créer le membre');
  protected loading=signal(false);
  readonly canSubmit = computed(() => this.form().valid() && !this.loading());

/********************************
 * Declarations
 */
  protected id =signal<string | null>(null);
  protected readonly isAddMode = computed(() => !this.id());

/*******************************
 * Methods
 */

  protected onDateFinSelect(date: Date) {
    this.form.datefinstage().value.set(date);
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.membreData().datefinstage = new Date(formattedDate ?? '');
  } 

  protected onDateSelect(date: Date) {
    this.form.dateinscription().value.set(date);
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.membreData().dateinscription = new Date(formattedDate ?? '');
  }

  onSubmit() {
    if (this.canSubmit()) {
      // Handle form submission
      if (this.isAddMode()) {
        this.createMembre();
      } else {
        this.updateMembre();
      }
    }
  }
  
  private updateMembre() {
    this.loading.set(true);
    const membreId = this.id();
    if (!membreId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'ID du membre manquant pour la mise à jour'
      });
      this.loading.set(false);
      return;
    }
    this.membreApiService.update(membreId, this.membreData() as unknown as Membre).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Le membre a été mis à jour avec succès'
        });
        this.router.navigate(['/dashboard/membres/list']);
      },
      error: (error) => {
        console.error('Error updating membre:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de la mise à jour du membre'
        });
        this.loading.set(false);
      }
    }); 
  }
  private createMembre() {
      
      this.membreApiService.store(this.membreData()).subscribe({
        next: (response) => {
                  
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Le membre a été créé avec succès'
          });
          this.router.navigate(['/dashboard/membres/list']);
        },
        error: (error) => {
          console.error('Error creating membre:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Une erreur est survenue lors de la création du membre'
          });
          this.loading.set(false);
        }
      });   
  }

  protected onStatutSelect(value: 'Actif' | 'Suspendu' | 'Inactif' | 'Exclu') {
    this.form.statut().value.set(value);
  }
  protected onCiviliteSelect(value: 'Mr' | 'Mlle' | 'Mme' ) {
    this.form.civilite().value.set(value);
  }

  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      this.authService.logout()
      this.router.navigate(['/auth/login']);
    }
    this.id.set(this.activetatedRoute.snapshot.paramMap.get('id'));
    if (!this.isAddMode()) {
      const membreFromResomlver = this.activetatedRoute.snapshot.data['oneMembreResolver'] as MembreDetail;
      this.membreData.set(membreFromResomlver);
      this.crudHeaderTitle.set('Maj de membre');
      this.crudButtonLabel.set('Mettre à jour le membre');
      if(membreFromResomlver) {
        this.membreData.set(membreFromResomlver);
        this.crudHeaderTitle.set('Maj de membre');
        this.crudButtonLabel.set('Mettre à jour le membre');
        this.membreData().dateinscription = membreFromResomlver.dateinscription ? new Date(membreFromResomlver.dateinscription) : null;
        this.membreData().datefinstage = membreFromResomlver.datefinstage ? new Date(membreFromResomlver.datefinstage) : null;  
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Membre introuvable'
        });
        this.router.navigate(['/dashboard/membres/list']);
      } 
    } 
  }

}
