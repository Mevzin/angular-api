import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ComicComponent } from './pages/comic/comic.component';
import { ComicviewComponent } from './pages/comicview/comicview.component';


const routes: Routes = [
  {
    path: '', component:ComicComponent
  },
  { path: 'comicview/:idComicSelect', component: ComicviewComponent },

  {
    path: 'comicview', component:ComicviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
