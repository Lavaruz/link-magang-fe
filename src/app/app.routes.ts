import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermsOfServicesComponent } from './pages/terms-of-services/terms-of-services.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "profile", component: ProfileComponent },
    { path: "terms-of-service", component: TermsOfServicesComponent },
    { path: "privacy-policy", component: PrivacyPolicyComponent },
];
