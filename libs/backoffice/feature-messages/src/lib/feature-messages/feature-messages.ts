import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { CrudHeader } from '@org/crud-header';
import { CrudButton } from '@org/crud-button';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Message, MessageCreateDto, MessageDetail, TypeMessage, TypeMessageDetail } from '@org/shared';
import { AuthService, LocalStorageService } from '@org/auth';
import { MessageApiService } from '@org/message-api';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { DatePickerModule } from 'primeng/datepicker';
import { FormBuilder, Validators } from '@angular/forms';
import { APP_CONFIG } from '@org/config';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

type CreateMessageForm =MessageCreateDto
registerLocaleData(localeFr);

@Component({
  selector: 'bo-feature-messages',
   providers: [
    DatePipe,
    MessageService,
    ConfirmationService,
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/tinymce/tinymce.min.js' },
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  imports: [
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    InputGroupModule,
    ButtonModule,
    InputGroupAddonModule,
    RadioButtonModule,
    CrudHeader,
    CrudButton,
    ConfirmDialogModule,
    SelectModule,
    EditorComponent,
    DatePickerModule
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
            actionLink="/dashboard/messages/list"
          ></lib-crud-header>
      </div>
      <form [formGroup]="form" class="py-3 grid grid-cols-1 md:grid-cols-2 gap-5" >
        <div class="flex flex-col gap-1">
          <label for="typemessage" class="text-sm font-medium text-slate-700">Type de message</label>
          <p-select
            (onChange)="onChangeTypeMessage($event)"
            [options]="typemessageLists()"
            optionLabel="typemessage"
            optionValue="id"
            placeholder="Votre choix"
            formControlName="typemessage_id">
          </p-select>
          @if(typemessage_id?.invalid && typemessage_id?.touched) {
             <small class="text-red-600">Le message est requis.</small>
          }
        </div>
        <div class="flex flex-col gap-1">
          <label for="datefin" class="text-sm font-medium text-slate-700">Date de fin</label>
          <p-datepicker
            formControlName="datefin"
            dateFormat="dd/mm/yy"
            [showIcon]="true"
            placeholder="Sélectionnez une date">
          </p-datepicker>
          @if(datefin?.invalid && datefin?.touched) {
             <small class="text-red-600">La date de fin est requise.</small>
          }
        </div>
        <div class="flex flex-col gap-1 col-span-2">
          <label for="message" class="text-sm font-medium text-slate-700">Message</label>
          <editor formControlName="message" id="message" [init]="init" licenseKey="gpl" />
          @if(message?.invalid && message?.touched) {
             <small class="text-red-600">Le message est requis.</small>
          }
        </div>
        <!-- Bouton submit (pleine largeur) -->
      <div class="md:col-span-2">
        <lib-crud-button
          
          [label]="crudButtonLabel() "
          [icon]="'pi pi-user-plus'"
          (clicked)="onSubmit()"
          [disabled]="!form.valid"
        ></lib-crud-button>
        
      </div>
      </form>
    </div>
    `,
  styleUrl: './feature-messages.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureMessages implements OnInit {

  // Injections
  private fb = inject(FormBuilder);
  private readonly messageApi = inject(MessageApiService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private cdr = inject(ChangeDetectorRef);
  private readonly config = inject(APP_CONFIG);
  private localStorageSercvice = inject(LocalStorageService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private datePipe=inject(DatePipe);

  
  // Signals
  readonly userData=signal({
    message: '',
    datefin: new Date(),
    typemessage_id: ''
  } as CreateMessageForm);

  protected crudHeaderTitle = signal('Création de message'); 
 

  protected crudButtonLabel=signal('Création de message');
  protected loading=signal(false);

  protected readonly typemessageLists = signal<TypeMessageDetail[]>([]);

  //rotected init = signal<any>({});
  
  private id=signal<string | null>(null);

  readonly canSubmit = computed(() => this.form.valid );
  protected readonly isAddMode = computed(() => !this.id());

  readonly form = this.fb.group({
    message: ['', [Validators.required]],
    datefin: [new Date(), [Validators.required]],
    typemessage_id: ['', [Validators.required]]
  });
  //
  private editorInstance: any = null;
  private isTinyMceLoaded = false;
  private tinymce: any;
  protected init: any= {};

  protected get typemessage_id() { return this.form.get('typemessage_id');}
  
  protected get message() { return this.form.get('message');}
  protected get datefin() { return this.form.get('datefin');}

  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      
      this.router.navigate(['/auth/logout']);
    }
    this.id.set(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initTinyMceConfig();
    this.loadTypemessages();
    if (!this.isAddMode()) {
      // Load existing message data
      const messageFromResolver = this.route.snapshot.data['oneMessageResolver'] as MessageDetail | null;  
      this.crudHeaderTitle.set('Maj de message');
      this.crudButtonLabel.set('Mettre à jour');
      
      if (messageFromResolver) {
        this.form.patchValue({
          message: messageFromResolver.message,
          datefin: new Date(messageFromResolver.datefin),
          typemessage_id: messageFromResolver.typemessage_id
        });
      } else {    
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les données du message.' });
        this.router.navigate(['/dashboard/messages/list']);
      }
    }

  }
  onSubmit() {
    if (this.form.invalid) {

      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez corriger les erreurs dans le formulaire'
      });
      return;
    } else if (this.isAddMode()) {
      this.createMessage();
    } else {
      this.updateMessage();
    }
   
  }
  private updateMessage() {
   this.form.patchValue({
    datefin: this.form.value.datefin ? new Date(this.datePipe.transform(this.form.value.datefin, 'yyyy-MM-dd') ?? '') : null
   });
   const payload=this.form.value as unknown as Message;
   
   this.messageApi.update(this.id()!, payload).subscribe({
    next: (response) => {
      const {data,success,message} = response as unknown as Message;
      console.log(`updateMessage ${data}`);
      if (success) {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: message || 'Le message a été mis à jour avec succès.' });
        this.router.navigate(['/dashboard/messages/list']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message || 'Impossible de mettre à jour le message.' });
      }
    },
    error: () => {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de mettre à jour le message.' });
    }
   });    
  }
  private createMessage() {
    const tmpDateFin=this.datePipe.transform(this.form.value.datefin!, 'yyyy-MM-dd');

    const payload: CreateMessageForm = {
      message: this.form.value.message!,
      datefin: new Date(tmpDateFin ?? ''),
      typemessage_id: this.form.value.typemessage_id!
    };
    
    this.messageApi.store(payload).subscribe({
      next: (response) => {
        const {data,success,message} = response as unknown as Message;
        console.log(response);
        if (success) {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: message || 'Le message a été créé avec succès.' });
          this.router.navigate(['/dashboard/messages/list']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message || 'Impossible de créer le message.' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de créer le message.' });
      }
    });
  }
  onChangeTypeMessage($event: SelectChangeEvent) {
    const typeMessageId = $event.value;
    this.form.patchValue({ typemessage_id: typeMessageId });
  }
  private loadTypemessages() {
    this.messageApi.getTypemessages().subscribe({
      next: (res) => {
       const {data, success,message} = res as unknown as TypeMessage;
        if(success) {
          const typemessages = data as unknown as TypeMessageDetail[];
          this.typemessageLists.set(typemessages);
        }
      },
      error: (error) => {
        console.error('Error loading typemessages:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les types de messages' });
      }
    });
  }

  

  private filePickerHandlerWithEditor(editorRef: any, callback: any, value: any, meta: any)
  {
    const x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    const y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

    //const token = this.localStorageSercvice.getToken();  
    let cmsURL = `${this.config.baseUrl}/laravel-filemanager?editor=${meta.fieldname}`;

    if (meta.filetype === 'image') {
      cmsURL += '&type=Images';
    } else if (meta.filetype === 'media') {
      cmsURL += '&type=Medias';
    } else {
      cmsURL += '&type=Files';
    }

    if (!editorRef?.windowManager) {
      console.error('TinyMCE windowManager is not available', { editorRef, isTinyMceLoaded: this.isTinyMceLoaded });
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: "L'éditeur n'est pas encore prêt. Veuillez réessayer."
      });
      return;
    }

    editorRef.windowManager.openUrl({
      url: cmsURL,
      title: 'Hekok File Manager',
      width: x * 0.8,
      height: y * 0.8,
      onMessage: (api: any, message: any) => {
        let currentUrl = message.content;
        if (currentUrl.includes('/api/storage')) {
          currentUrl = currentUrl.replace('/api/storage', '/storage');
        }
        callback(currentUrl);
        api.close();
      }
    });
  }



  private initTinyMceConfig() {
    const sharedBase = {
      path_absolute: '/',
      menubar: false,
      branding: false,
      //relative_urls: false,
      base_url: '/admin/tinymce',
      suffix: '.min',
      height: 450,
  };


    this.init = {
      ...sharedBase,
      menubar: 'file edit view insert format tools table tc help',
      toolbar_sticky: false,
      plugins: [
        'image', 'media', 'tools', 'link', 'advlist',
        'autolink', 'lists', 'table', 'wordcount', 'code', 'searchreplace'
      ],
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table mergetags blockquote',
      setup: (editor: any) => {
        editor.on('init', () => {
          this.editorInstance = editor;
          this.isTinyMceLoaded = true;
          this.cdr.markForCheck();
        });
      },
      file_picker_callback: (callback: any, value: any, meta: any) => {
        setTimeout(() => this.filePickerHandlerWithEditor(this.editorInstance, callback, value, meta), 100);
      }
    };
  }

  
}
