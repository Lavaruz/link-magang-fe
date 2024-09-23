import { Component, inject } from '@angular/core';
import { GoogleAnalyticsServiceService } from '../../../services/google-analytics.service.service';

@Component({
  selector: 'app-terms-of-services',
  standalone: true,
  imports: [],
  templateUrl: './terms-of-services.component.html',
})
export class TermsOfServicesComponent {
  googleAnalytics = inject(GoogleAnalyticsServiceService)

}
