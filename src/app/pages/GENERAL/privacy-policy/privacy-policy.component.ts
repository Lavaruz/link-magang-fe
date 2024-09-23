import { Component, inject } from '@angular/core';
import { GoogleAnalyticsServiceService } from '../../../services/google-analytics.service.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent {
  googleAnalytics = inject(GoogleAnalyticsServiceService)

}
