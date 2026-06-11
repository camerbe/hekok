import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrudHeader } from '@org/crud-header';
import { DatePickerModule } from 'primeng/datepicker';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CrudButton } from '@org/crud-button';
import { ToastModule } from 'primeng/toast';  
import { Article, ArticleCreateDto, ArticleDetail, Pays, PaysDetail, TypeArticle, TypeArticleDetail } from '@org/shared';

import { ArticleApiService } from '@org/article-api';
import { AuthService, LocalStorageService } from '@org/auth';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { APP_CONFIG } from '@org/config';
import localeFr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
//import { Select } from 'primeng/select'; 

type CreateArticleForm=ArticleCreateDto
registerLocaleData(localeFr);

@Component({
  selector: 'bo-feature-articles',
  providers: [
    DatePipe,
    ConfirmationService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/tinymce/tinymce.min.js' },
  ],
  imports: [
    FormField,
    ToastModule,
    InputTextModule,
    InputGroupModule,
    ButtonModule,
    InputGroupAddonModule,
    DatePickerModule,
    RadioButtonModule,
    SelectModule,
    FormsModule,
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
            actionLink="/dashboard/articles/list"
          ></lib-crud-header>
        </div>
        <form class="py-3 grid grid-cols-1 md:grid-cols-2 gap-5" (submit)="onSubmit()">
          <!-- Auteur -->
          <div class="flex flex-col gap-1">
            <label for="auteur" class="text-sm font-medium text-slate-700">Auteur</label>
            
              <input 
                pInputText  
                [formField]="form.auteur"
                placeholder="Auteur" />
            @if(form.auteur().invalid() && form.auteur().touched()) {
              <small class="text-red-600">L'auteur est requis.</small>
            }
          </div>

          <!-- Source -->
          <div class="flex flex-col gap-1">
            <label for="source" class="text-sm font-medium text-slate-700">Source</label>
            <input 
              pInputText  
              [formField]="form.source"
              placeholder="Source" />
            @if(form.source().invalid() && form.source().touched()) {
              <small class="text-red-600">La source est requise.</small>
            }
          </div>
          <!-- Titre -->
          <div class="flex flex-col gap-1 col-span-2">
            <label for="titre" class="text-sm font-medium text-slate-700">Titre</label>
            <input 
              pInputText  
              [formField]="form.titre"
              placeholder="Titre" />
            @if(form.titre().invalid() && form.titre().touched()) {
              <small class="text-red-600">Le titre est requis ainsi que sa longueur maximale de 90 caractères.</small>
            }
          </div>
          <!-- Type d'article -->
          <div class="flex flex-col gap-1">
            <label for="typearticle_id" class="text-sm font-medium text-slate-700">Type d'article</label>
            <p-select 
              [editable]="true"
              [filter]="true"
              [showClear]="true"
              filterBy="typearticle"
              [ngModel]="selectedTypeArticle()"
              [ngModelOptions]="{standalone: true}"
              [options]="typeArticles()" 
              (onChange)=onChangeTypeArticle($event)
              optionLabel="typearticle" 
              optionValue="id" 
              placeholder="Choix d'un type d'article" >
            </p-select>
            @if(form.typearticle_id().invalid() && form.typearticle_id().touched()) {
              <small class="text-red-600">Le type d'article est requis.</small>
            }
          </div>
          <!-- Pays-->
          <div class="flex flex-col gap-1">
            <label for="pays_id" class="text-sm font-medium text-slate-700">Pays</label>
            <p-select 
              [editable]="true"
              [filter]="true"
              [showClear]="true"
              filterBy="pays"
              id="pays_id"
              [ngModel]="selectedPays()"
              [ngModelOptions]="{standalone: true}"
              (onChange)=onChangeCountry($event)
              [options]="countries()" optionLabel="pays" optionValue="id" placeholder="Choix d'un pays" >
            </p-select>
            @if(form.pays_id().invalid() && form.pays_id().touched()) {
              <small class="text-red-600">Le pays est requis.</small>
            }
          </div>
          <!-- Keywords -->
          <div class="flex flex-col gap-1">
            <label for="keyword" class="text-sm font-medium text-slate-700">Mots clés</label>
            <input 
              pInputText  
              [formField]="form.keyword"
              placeholder="Mots clés" />
            @if(form.keyword().invalid() && form.keyword().touched()) {
              <small class="text-red-600">Les mots clés sont requis.</small>
            }
          </div>
          <!-- Keywords -->
          <div class="flex flex-col gap-1">
          <label for="datearticle" class="text-sm font-medium text-slate-700">Date de publication</label>
          <p-datepicker 
            [ngModelOptions]="{standalone: true}"
            [ngModel]="selectedDatearticle()"
            [showIcon]="true" 
            dateFormat="dd/mm/yy"
            (onSelect)="onDateArticleSelect($event)"
            placeholder="Date de publication"
              >
          </p-datepicker>
           @if(form.datearticle().invalid() && form.datearticle().touched()) {
              <small class="text-red-600">La date est requise</small>
            }  
        </div>
        <!-- Info-->
        <div class="flex flex-col gap-1 col-span-2">
          <label for="info" class="text-sm font-medium text-slate-700">Article</label>
          <editor [formField]="form.article" id="article" [init]="init" licenseKey="gpl" [] />
          @if(form.article().invalid() && form.article().touched()) {
              <small class="text-red-600">L'article est requis</small>
            }  
        </div>
        <!-- Photo-->
        <div class="flex flex-col gap-1 col-span-2">
          <label for="image" class="text-sm font-medium text-slate-700">Photo</label>
          <editor [formField]="form.image" id="image" [init]="image" licenseKey="gpl" [] />
          @if(form.image().invalid() && form.image().touched()) {
              <small class="text-red-600">La photo est requise</small>
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
  styleUrl: './feature-articles.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FeatureArticles implements OnInit {
  

  /********************************
   * SIGNALS
   */
  protected crudHeaderTitle=signal("Création d'article");
  protected crudButtonLabel=signal("Création d'article");
  protected loading=signal(false);
  private slug=signal<string | null>(null);

  protected countries=signal<PaysDetail[]>([]);
  protected typeArticles=signal<TypeArticleDetail[]>([]);
  protected selectedTypeArticle = signal<string | null>(null);
  protected selectedPays = signal<string | null>(null);
  protected selectedDatearticle = signal<Date | null>(null);
  private id=signal<string | null>(null);
  protected readonly isAddMode = computed(() => !this.id());
  private readonly articleData=signal<CreateArticleForm>({
    article: '',
    typearticle_id:'',
    pays_id:'',
    titre:'',
    datearticle: new Date(),
    auteur:'',
    source:'',
    image:'',
    keyword:''
  });
  /******************************
   * FORM
   */
  protected form = form(this.articleData, (f) => {
    required(f.article);
    required(f.auteur);
    required(f.keyword);
    required(f.source);
    required(f.titre);
    required(f.typearticle_id);
    required(f.pays_id);
    required(f.datearticle);
    maxLength(f.titre, 90);
    required(f.image);
  });

//   protected  form = form(signal<CreateArticleForm>({
//   info: '',
//   typearticle_id: '',
//   pays_id: '',
//   titre: '',
//   datearticle: new Date(),
//   auteur: '',
//   source: '',
//   photo: '',
//   keywords: ''
// }), (f) => {
//   required(f.auteur);
//   required(f.keywords);
//   required(f.source);
//   required(f.titre);
//   required(f.typearticle_id);
//   required(f.pays_id);
//   required(f.datearticle);
//   maxLength(f.titre, 90);
// });
  /********************************
   * VARIABLE
   */
  private editorInstance: any = null;
  private isTinyMceLoaded = false;
  private tinymce: any;
  protected init: any= {};
  protected image: any= {};
  private editorArticleInstance: any = null;
  private editorImageInstance: any = null;
  /******************************
   * INJECT
   */
  private articleApiService = inject(ArticleApiService);
  protected authService = inject(AuthService);
  protected messageService = inject(MessageService);
  protected confirmationService = inject(ConfirmationService);
  protected datePipe = inject(DatePipe);
  private router=inject(Router);
  private localStorageSercvice = inject(LocalStorageService);
  private cdr = inject(ChangeDetectorRef);
  private readonly config = inject(APP_CONFIG);
  private activatedRoute=inject(ActivatedRoute);
  /********************************
   * 
   * METHODS
   */
  private loadCountries() {
    this.articleApiService.getCountries().subscribe({
    next: (countries) => {
         const{ data,success,message }=countries as unknown as Pays;
          if(success) { 
            this.countries.set(data as unknown as PaysDetail[]);
          }
      },
      error: (err) => {
      console.error('Error loading countries', err);
      }
    });
  }
  /************************* */
  private loadTypeArticles() {
    this.articleApiService.getTypeArticles().subscribe({
    next: (typeArticles) => {
         const{ data,success,message }=typeArticles as unknown as TypeArticle;
          if(success) { 
            this.typeArticles.set(data as unknown as TypeArticleDetail[]);
          }
      },
      error: (err) => {
      console.error('Error loading type articles', err);
      }
    });
  }
  /*************************** */
  protected onSubmit() {
    
    if(this.form().invalid()){
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Veuillez corriger les champs en erreur.' });
      return;
    }
    else if(this.isAddMode()){
      this.createArticle();
    }
    else{
      this.updateArticle()
    }
   
  }
  private createArticle(){
    const tmpDateArticle=this.datePipe.transform(this.form.datearticle().value()!, 'yyyy-MM-dd');
    this.form().value().datearticle=tmpDateArticle
    this.articleApiService.store(this.form().value()).subscribe({
      next:(res)=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: "L'article a été créé avec succès"
        });
        this.router.navigate(['/dashboard/articles/list']);
      },
      error: (error) => {
          console.error('Error creating membre:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: "Une erreur est survenue lors de la création du l'article"
          });
          this.loading.set(false);
        }
    });
  }
  private updateArticle(){
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
    const articleId=this.id()!;
    this.articleApiService.update(articleId,this.form().value() as unknown as Article).subscribe({
      next:(res)=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: "L'article  a été mis à jour avec succès"
        });
        this.router.navigate(['/dashboard/articles/list']);
      },
      error: (error) => {
        console.error('Error updating membre:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Une erreur est survenue lors de la mise à jour de l'article"
        });
        this.loading.set(false);
      }
    });
  }

  protected onChangeTypeArticle($event:SelectChangeEvent){
    this.form.typearticle_id().value.set($event.value);
    this.form.typearticle_id().markAsTouched();
    this.selectedTypeArticle.set($event.value);
  }
  protected onChangeCountry($event:SelectChangeEvent){
    this.form.pays_id().value.set($event.value);
    this.form.pays_id().markAsTouched();
    this.selectedPays.set($event.value);

  }

  protected onDateArticleSelect(date: Date | null) {
    if (!date) return;  // ✅ guard early

    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.form.datearticle().value.set(formattedDate ?? null);
    this.selectedDatearticle.set(date);
    
  } 

  ngOnInit(): void {
    if(this.authService.isTokenExpired()) {
      this.router.navigate(['/auth/logout']);
    } 
    this.id.set(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initTinyMceConfig();
    this.loadCountries();
    this.loadTypeArticles();
    if(!this.isAddMode()){
      const articleFromResolver=this.activatedRoute.snapshot.data['articleByIdResolver'] as ArticleDetail;
      this.crudButtonLabel.set('Mettre à jour');
      this.crudHeaderTitle.set("Maj d'article")
      this.selectedDatearticle.set(
        articleFromResolver.datearticle 
          ? new Date(articleFromResolver.datearticle) 
          : null
      );
      if(articleFromResolver){
        this.form().value.set({
          auteur: articleFromResolver.auteur,
          source: articleFromResolver.source,
          titre: articleFromResolver.titre,
          typearticle_id: articleFromResolver.typearticle_id,
          pays_id: articleFromResolver.pays_id,
          keyword: articleFromResolver.keyword,
          datearticle: this.selectedDatearticle(),
          article: articleFromResolver.article,
          image:  `<img src='${articleFromResolver.image}' />`,
        });
        this.selectedTypeArticle.set(articleFromResolver.typearticle_id);
        this.selectedPays.set(articleFromResolver.pays_id);
        //this.selectedDatearticle.set(articleFromResolver.datearticle);
      }
    }
    
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
        //console.log(currentUrl);
        callback(currentUrl);
        api.close();
      },
      headers: {
       Authorization: `Bearer ${token}`,
      }
    });
   
  }



  private initTinyMceConfig() {
    const sharedBase = {
      path_absolute: '/',
      relative_urls: false,
      base_url: '/tinymce',
      suffix: '.min',
      height: 450,
  }


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
          this.editorArticleInstance = editor;
          this.isTinyMceLoaded = true;
          this.cdr.markForCheck();
        });
        editor.on('change input',()=>{
          this.form.article().value.set(editor.getContent());
          this.form.article().markAsTouched();
        });
      },
      file_picker_callback: (callback: any, value: any, meta: any) => {
        setTimeout(() => this.filePickerHandlerWithEditor(this.editorArticleInstance, callback, value, meta), 100);
      }
    };

    this.image = {
      ...sharedBase,
      menubar: 'file ',
      toolbar_sticky: false,
      plugins: [
        'image', 'media'
      ],
      toolbar: 'image media',
      setup: (editor: any) => {
        editor.on('init', () => {
          this.editorImageInstance = editor;
          this.isTinyMceLoaded = true;
          this.cdr.markForCheck();
        });
        editor.on('init',()=>{
          const content = editor.getContent();
          if(content){
            this.form.image().value.set(content);
            this.form.image().markAsTouched();
            this.cdr.markForCheck();       
          }
         
        });
      },
      file_picker_callback: (callback: any, value: any, meta: any) => {
        setTimeout(() => this.filePickerHandlerWithEditor(this.editorImageInstance, callback, value, meta), 100);
      }
    };
  }
  
}
