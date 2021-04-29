import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/share/product.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  myForm: FormGroup;
  images = []; //--for render show
  multipleImages = []; //--for send to server
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private productService:ProductService,
  ) {
    this.myForm = this.fb.group({
      name:[''],
      files: ['']
    });
  }

  ngOnInit(): void {
  }

  get f(){return this.myForm.controls;}

  selectMultiple(event){
    if( event.target.files.length > 0){

      //--for send to server
      this.multipleImages = event.target.files;

      //--for render show
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
              reader.onload = (event:any) => {
                // console.log(event.target.result);
                this.images.push(event.target.result);
              }
              reader.readAsDataURL(event.target.files[i]);
      }
      //--end for render show

    }
    console.log('this.multipleImages-', this.multipleImages);
  }

  async onMultipleSubmit(){
    const formData = new FormData();

    const formInput = this.myForm.value;
    for (const key in formInput) {
      if (formInput.hasOwnProperty(key)) {
        const element = formInput[key];
        formData.append(key, element);
      }
    }

    // return;
    for( let img of this.multipleImages){
      formData.append('files', img);
    }

    const data = await this.productService.uploadMulti(formData);
    // const data = await this.productService.create(formData);
    if(data.status === 2000){
      console.log('data-', data);
    }else{
      // this.Errors.status = true;
      // this.Errors.msg = data.message;
    }
  }

  // async onMultipleSubmit(){
  //   const formData = new FormData();
  //   for( let img of this.multipleImages){
  //     formData.append('files', img);
  //   }

  //   const data = await this.productService.uploadMulti(formData);
  //   if(data.status === 2000){
  //     console.log('data-', data);
  //   }else{
  //     // this.Errors.status = true;
  //     // this.Errors.msg = data.message;
  //   }
  // }

}
