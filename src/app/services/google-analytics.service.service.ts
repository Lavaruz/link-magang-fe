import { Injectable, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})

export class GoogleAnalyticsServiceService {

  constructor(private router: Router, private ngZone: NgZone) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.ngZone.run(() => {
        gtag('config', 'G-DJ4YFB14B3', {
          'page_path': event.urlAfterRedirects
        });
      });
    });
  }
}
