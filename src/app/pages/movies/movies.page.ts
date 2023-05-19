import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
movies: any[] = [];
currentPage=1;
imageBaseUrl= environment.images;


  constructor(private movieService:MovieService,private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.loadMovies();
    
  }

  loadData(e:any){
    if(this.currentPage==2){
      e.target.complete();  
    }else{
      this.currentPage++;
      this.loadMovies();  
    }
  }
  async loadMovies(){
    const loading =await this.loadingCtrl.create({
      message:'loading..',
      spinner:'bubbles',
    });
    await loading.present();
    this.movieService.getTopRatedMovies(this.currentPage).subscribe(
      (res)=>{
        loading.dismiss();
        this.movies.push(...res.results)
         console.log(res);
        }
    )
  }
 

}
