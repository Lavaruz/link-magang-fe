import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermsOfServicesComponent } from './pages/terms-of-services/terms-of-services.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CommunityComponent } from './pages/community/community.component';
import { PostsForYouComponent } from './pages/posts/foryou/posts.component';
import { ExploreComponent } from './pages/posts/explore/explore.component';
import { BookmarkComponent } from './pages/posts/bookmark/bookmark.component';

export const routes: Routes = [
    { path: "", redirectTo:"posts/explore", pathMatch: "full" },
    { 
        path: "posts",  
        children: [
            {path:"", redirectTo: "/posts/explore", pathMatch: "full"},
            {path:"foryou", component: PostsForYouComponent},
            {path:"explore", component: ExploreComponent},
            {path:"bookmark", component: BookmarkComponent},
        ]
    },
    { 
        path: "profile",
        children: [
            {path:"me", component: ProfileComponent}
        ]
    },
    { path: "community", component: CommunityComponent },
    { path: "terms-of-service", component: TermsOfServicesComponent },
    { path: "privacy-policy", component: PrivacyPolicyComponent },
    { path: '**', redirectTo:"posts/explore", pathMatch: "full" }
];
