import { Routes } from '@angular/router';
import { TermsOfServicesComponent } from './pages/GENERAL/terms-of-services/terms-of-services.component';
import { PrivacyPolicyComponent } from './pages/GENERAL/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './pages/JOBSEEKER/profile/profile.component';
import { PostsForYouComponent } from './pages/JOBSEEKER/posts/foryou/posts.component';
import { ExploreComponent } from './pages/JOBSEEKER/posts/explore/explore.component';
import { BookmarkComponent } from './pages/JOBSEEKER/posts/bookmark/bookmark.component';
import { TalentHuntComponent } from './pages/JOBSEEKER/talent-hunt/talent-hunt.component';
import { LoginComponent } from './pages/ADMIN/login/login.component';
import { AdminPostsComponent } from './pages/ADMIN/admin-posts/admin-posts.component';
import { AdminUsersComponent } from './pages/ADMIN/admin-users/admin-users.component';
import { AdminAdditionalsComponent } from './pages/ADMIN/admin-additionals/admin-additionals.component';
import { AdminPostCreateComponent } from './pages/ADMIN/admin-posts/create/create.component';
import { AdminPostEditComponent } from './pages/ADMIN/admin-posts/edit/edit.component';

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
    { path: "talent", component: TalentHuntComponent },
    { path: "terms-of-service", component: TermsOfServicesComponent },
    { path: "privacy-policy", component: PrivacyPolicyComponent },
    { 
        path: "admin",
        children: [
            {path: "", redirectTo: "/admin/posts", pathMatch: "full"},
            {path: "login", component: LoginComponent},
            {
                path: "posts",
                children: [
                    { path: "", component: AdminPostsComponent},
                    { path: "create", component: AdminPostCreateComponent},
                    { path: "edit/:id", component: AdminPostEditComponent}
                ]
            },
            {path: "users", component: AdminUsersComponent},
            {path: "additionals", component: AdminAdditionalsComponent},
        ] 
    },
    { path: '**', redirectTo:"posts/explore", pathMatch: "full" }
];
