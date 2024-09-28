import { Injectable } from '@angular/core';

declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})

export class GoogleAnalyticsServiceService {

  constructor() {
    const head = <HTMLDivElement>document.head;
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DJ4YFB14B3';
    script.async = true;
    script.defer = true;
    head.append(script);

    const gtagScript = document.createElement('script');
    gtagScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-DJ4YFB14B3');
    `;
    head.append(gtagScript);
  }
}
