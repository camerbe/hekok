import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private open(url: string) {
    window.open(url, '_blank', 'width=600,height=500');
  }

  shareFacebook(url: string) {
    this.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  }

  shareTwitter(url: string, text: string) {
    this.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
  }

  shareLinkedIn(url: string) {
    this.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
  }

  shareWhatsApp(url: string, text: string) {
    this.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
  }

  shareTelegram(url: string, text: string) {
    this.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
  }

  shareNative(url: string, title: string) {
    if (navigator.share) {
      navigator.share({
        title,
        url
      });
    } else {
      this.shareFacebook(url);
    }
  }
}
