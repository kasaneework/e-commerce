import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/share/category.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {

  categiryFeatured:any=[];
  imgPath: string = environment.image_path;

  constructor(
    private categoryService:CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  async getCategory(){
    const data = await this.categoryService.getAll();
    // console.log('data-', data);
    if(data){
      // console.log('data.data-', data.data);
      data.data.forEach(obj => {
        if(obj.cFeatured){
          this.categiryFeatured.push(obj);
        }
      });
    }
    // console.log('this.allData-', this.allData);
  }

}
