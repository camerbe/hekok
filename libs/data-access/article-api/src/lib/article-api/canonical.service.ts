import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  document = inject(DOCUMENT);
  setCanonicalURL(url?: string){
    const canURL = url === undefined ? this.document.URL : url;
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canURL);
    // Remove existing canonical
    const existing = this.document.querySelector('link[rel="canonical"]');
    if (existing) {
      existing.remove();
    }
    this.document.head.appendChild(link);
  }
  setAmpCanonicalURL(url?: string){
    const canURL = url === undefined ? this.document.URL : url;
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'amphtml');
    link.setAttribute('href', canURL);
    // Remove existing amphtml
    const existing = this.document.querySelector('link[rel="amphtml"]');
    if (existing) {
      existing.remove();
    }
    this.document.head.appendChild(link);
  }
  setRssURL(url?: string){
    const canURL = url === undefined ? this.document.URL : url;
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('href', canURL);
    link.setAttribute('type', 'application/atom+xml');
    link.setAttribute('title', 'flux rss de hekok.org');
    // Remove existing amphtml
    const existing = this.document.querySelector(`link[rel="alternate"][href="${url}"]`);
    if (!existing) {
      this.document.head.appendChild(link);
    }
    
  }
}
