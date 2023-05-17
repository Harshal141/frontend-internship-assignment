import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { TrendingSubjectsComponent } from '../app/components/trending-subjects/trending-subjects.component';
import { searchResultComponent } from './components/search-result/search-result.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';

const routes: Routes = [
  { 
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Open Books Library',
      },
      {
        path: 'trending-subject/:name',
        component: TrendingSubjectsComponent,
        title: 'Trending Subjects',
      },
      {
        path: 'search-result/:name',
        component: searchResultComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
