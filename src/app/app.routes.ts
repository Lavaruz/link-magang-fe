import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermsOfServicesComponent } from './pages/terms-of-services/terms-of-services.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CommunityComponent } from './pages/community/community.component';
import { PostsComponent } from './pages/posts/posts.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "posts", component: PostsComponent },
    { path: "profile", component: ProfileComponent },
    { path: "community", component: CommunityComponent },
    { path: "terms-of-service", component: TermsOfServicesComponent },
    { path: "privacy-policy", component: PrivacyPolicyComponent },
];
