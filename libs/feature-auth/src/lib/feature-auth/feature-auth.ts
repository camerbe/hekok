import { Component, signal } from '@angular/core';
import { LoginCredentials } from '@org/shared';
import { email, form, required } from '@angular/forms/signals';



@Component({
  selector: 'lib-feature-auth',
  imports: [],
  styleUrl: './feature-auth.css',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 to-indigo-700 px-4 py-12">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-bold text-slate-900">Welcome to Hekok</h1>
              <p class="text-slate-600 mt-2">Sign in to access your dashboard</p>
            </div>
        </div>
    </div>

  `,
})

export class FeatureAuth {
  
  
}
