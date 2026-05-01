import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LocalStorageService } from '@org/auth';

@Component({
  selector: 'lib-layout-admin',
  standalone: true,
  providers: [
    AuthService,
    LocalStorageService
  ],
  imports: [
    BreadcrumbModule,
    RouterModule
    
  ],
  template: `
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <!-- Sidebar -->
  <aside class="w-64 bg-gradient-to-b from-green-500 to-green-800 flex flex-col text-amber-50">
    <div class="p-4 ">
      <h1 class="text-xl font-bold text-primary-600">
        <img src="assets/image/logo-hekok.png" alt="Hekok Logo" class="h-12 inline-block mr-2">
      </h1>
    </div>
    <nav class="flex-1 p-4 space-y-2">
      <a routerLink="/dashboard"  
         class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        <i class="pi pi-home"></i> Dashboard
      </a>
      <a 
        routerLink="/dashboard/articles/" 
        routerLinkActive="bg-gray-100 dark:bg-gray-700 text-gray-600"
        [routerLinkActiveOptions]="{ exact: false }"
         class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        <i class="pi pi-reddit"></i> Articles
      </a>
      <a 
        routerLink="/dashboard/users/" 
        routerLinkActive="bg-gray-100 dark:bg-gray-700 text-gray-600 text-primary-600"
        [routerLinkActiveOptions]="{ exact: false }"
         class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        <i class="pi pi-users"></i> Utilisateurs
      </a>
      <a 
        routerLink="/dashboard/membres/" 
        routerLinkActive="bg-gray-100 dark:bg-gray-700 text-gray-600 text-primary-600"
        [routerLinkActiveOptions]="{ exact: false }"
         class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        <i class="pi pi-user"></i> Membres
      </a>
      <a routerLink="/dashboard/messages" 
       [routerLinkActiveOptions]="{ exact: false }"
      routerLinkActive="bg-gray-100 text-gray-600 dark:bg-gray-700 text-primary-600"
         class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        <i class="pi pi-book"></i> Messages
      </a>
      <a routerLink="/dashboard/typemessages" 
       [routerLinkActiveOptions]="{ exact: false }"
      routerLinkActive="bg-gray-100 dark:bg-gray-700 text-gray-600  text-primary-600"
         class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        <i class="pi pi-bullseye"></i> Types de messages
      </a>
    </nav>
  </aside>

  <!-- Main -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <header class="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 flex items-center justify-between">
      
      <div class="flex items-center ml-auto gap-4">
        <span class="text-sm text-gray-600 dark:text-gray-300"> <i class="pi pi-user mr-2"></i>{{ userName() }}</span>
        <a routerLink="/auth/logout" class="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
          <i class="pi pi-sign-out mr-1"></i> Déconnexion
        </a>
      </div>
    </header>

    <main class="flex-1 overflow-auto p-6">
      <div class="w-full max-w-4xl">
        <router-outlet />
      </div>
      
    </main>
  </div>
</div>
  `,
  styleUrl: './layout-admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAdminComponent implements OnInit {

  private localStorageService=inject(LocalStorageService);
  
  protected userName=signal(this.localStorageService.getName());
  private readonly tokenExpired = inject(AuthService).isTokenExpired();
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly isExpired = computed(() => {
    const token = this.localStorageService.getToken();
    return this.tokenExpired || !token;
  });

  constructor() {
    if (this.tokenExpired) {
      this.router.navigate(['/auth/logout']);
    }
    
  }
  ngOnInit(): void {
    if (this.isExpired()) {
      this.router.navigate(['/auth/logout']);
    }
    
  }

}
