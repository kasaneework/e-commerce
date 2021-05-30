import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/share/category.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categiries;
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
        this.categiries = data.data;
    }
    // console.log('this.categiries-', this.categiries);
  }

}
