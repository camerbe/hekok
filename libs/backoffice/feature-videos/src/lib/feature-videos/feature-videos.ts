import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import localeFr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { CrudButton } from '@org/crud-button';
import { CrudHeader } from '@org/crud-header';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { registerLocaleData } from '@angular/common';
import { AuthService, LocalStorageService } from '@org/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_CONFIG } from '@org/config';
import { Video, VideoCreateDto, VideoDetail } from '@org/shared';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { VideoApiService } from '@org/video-api';

registerLocaleData(localeFr);
type CreateVideoForm = VideoCreateDto ;

@Component({
  selector: 'bo-feature-videos',
  providers: [
    ConfirmationService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/tinymce/tinymce.min.js' },
  ],
  imports: [
    FormField,
    FormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    CrudHeader,
    CrudButton,
    EditorComponent
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
            actionLink="/dashboard/videos/list"
          ></lib-crud-header>
        </div>
        <form class="py-3 grid grid-cols-1 md:grid-cols-2 gap-5" (submit)="onSubmit()">
          <!-- Titre -->
          <div class="flex flex-col col-span-2 gap-1">
            <label for="titre" class="text-sm font-medium text-slate-700">Titre</label>
            
              <input 
                pInputText  
                [formField]="form.titre"
                placeholder="Titre" />
            @if(form.titre().invalid() && form.titre().touched()) {
              <small class="text-red-600">Le titre est requis.</small>
            }
          </div>

          
          <!-- Vidéo-->
          <div class="flex flex-col gap-1 col-span-2">
            <label for="video" class="text-sm font-medium text-slate-700">Vidéo</label>
            <editor [formField]="form.video" id="video" [init]="image" licenseKey="gpl"  />
            @if(form.video().invalid() && form.video().touched()) {
                <small class="text-red-600">La vidéo est requise</small>
              }  
            </div>
          <!-- Bouton submit (pleine largeur) -->
          <div class="md:col-span-2">
            <lib-crud-button
              
              [label]="crudButtonLabel() "
              [icon]="'pi pi-user-plus'"
              (clicked)="onSubmit()"
              [disabled]="!form().valid()"
            ></lib-crud-button>
            
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrl: './feature-video.css',
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class FeatureVideos implements OnInit {
  /********************************
   * VARIABLE
   */
  private isTinyMceLoaded = false;
  private editorImageInstance: any = null;
  protected image: any= {};
  /********************************
   * SIGNALS
   */
  protected crudHeaderTitle=signal("Création de vidéo");
  protected crudButtonLabel=signal("Création de vidéo");
  protected loading=signal(false);
  private readonly videoData = signal<CreateVideoForm>({
    titre: '',
    video: '',
  });
  private id=signal<string | null>(null);
  /******************************
   * FORM
   */
  protected form = form(this.videoData, (f) => {
    required(f.titre);
    required(f.video);
    maxLength(f.titre, 90);
  });
  /******************************
   * INJECT
   */
  protected authService = inject(AuthService);
  protected messageService = inject(MessageService);
  protected confirmationService = inject(ConfirmationService);
   private router=inject(Router);
  private localStorageSercvice = inject(LocalStorageService);
  private readonly config = inject(APP_CONFIG);
  private activatedRoute=inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private readonly videoService=inject(VideoApiService);
  /******************************
   * COMPUTED
   */
  
  protected readonly isAddMode = computed(() => !this.id());
  /******************************
   * METHODS
   */
  ngOnInit(): void {
    if(this.authService.isTokenExpired()) {
      this.router.navigate(['/auth/logout']);
    } 
    this.id.set(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initTinyMceConfig();
    if(!this.isAddMode()){
      const videoFromResolver = this.activatedRoute.snapshot.data['videoIdResolver'] as VideoDetail;
      this.crudHeaderTitle.set("Modification de vidéo");
      this.crudButtonLabel.set("Mettre à jour la vidéo");
      if(videoFromResolver){
        const cinema=`<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoFromResolver.video}"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        setTimeout(() => {
          this.form().value.set({ titre: videoFromResolver.titre, video: cinema });
          this.cdr.markForCheck();
        }, 0);
        // this.form().value.set({
        //   titre: videoFromResolver.titre,
        //   video: cinema,
        // });
      }
    }
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

    this.image = {
      ...sharedBase,
      menubar: 'file ',
      toolbar_sticky: false,
      plugins: [
        'image', 'media'
      ],
      toolbar: 'media',
      setup: (editor: any) => {
        // editor.on('init', () => {
        //   this.editorImageInstance = editor;
        //   this.isTinyMceLoaded = true;
        //   this.cdr.markForCheck();
        // });
        editor.on('init',()=>{
           this.editorImageInstance = editor;
           this.isTinyMceLoaded = true;
           const content = editor.getContent();
          if(content){
            this.form.video().value.set(content);
            this.form.video().markAsTouched();
            this.cdr.markForCheck();       
          }
          this.cdr.markForCheck();
        });
      },
      file_picker_callback: (callback: any, value: any, meta: any) => {
        setTimeout(() => this.filePickerHandlerWithEditor(this.editorImageInstance, callback, value, meta), 100);
      }
    };
  }

  private filePickerHandlerWithEditor(editorRef: any, callback: any, value: any, meta: any)
  {
    const x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    const y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

    const token = this.localStorageSercvice.getToken();  
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
        console.log(currentUrl);
        //callback(message.content);
        api.close();
      }
    });
   
  }
  onSubmit() {
    if(this.form().invalid()){
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Veuillez corriger les champs en erreur.' });
          return;
    }
    else if(this.isAddMode()){
      this.createVideo();
    }
    else{
      this.updateVideo()
    }
  }
  private createVideo() {
    this.videoService.store(this.form().value()).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Vidéo créée avec succès' });
        this.router.navigate(['/dashboard/videos/list']);
      },
      error: (error) => {
        console.error('Erreur lors de la création de la vidéo:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Une erreur s'est produite lors de la création de la vidéo" });
      }
    });
  }
  private updateVideo() {
    // Implémenter la logique de mise à jour de la vidéo
    this.loading.set(true);
    if(!this.id()){
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: "ID de l'article manquant pour la mise à jour"
      });
      this.loading.set(false);
      return;
    }
    this.videoService.update(this.id()!, this.form().value() as unknown as Video).subscribe({
      next: (res) => {
       
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Succès', 
          detail: 'Vidéo mise à jour avec succès' 
        });
        this.router.navigate(['/dashboard/videos/list']);
        
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la vidéo:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Une erreur s'est produite lors de la mise à jour de la vidéo" });
        this.loading.set(false);
      }
    });

  }
}
