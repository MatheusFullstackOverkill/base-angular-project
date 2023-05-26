import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: 
    [
      { path: '',
        children: [
          { path: '', loadChildren: () => import('./presenters/navigation/unlogged-area/unlogged-area-routing.module').then(m => m.UnloggedAreaRoutingModule)  }
        ]
      },
      { path: '', 
        children: [
          { path: '', loadChildren: () => import('./presenters/navigation/logged-area/logged-area-routing.module').then(m => m.LoggedAreaRoutingModule)  }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
