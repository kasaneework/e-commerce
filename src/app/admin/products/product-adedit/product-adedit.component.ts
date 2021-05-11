import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from 'src/app/share/product.service';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/app/models/IProduct';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/share/dialog/dialog.component';
import { CategoryService } from 'src/app/share/category.service';

@Component({
  selector: 'app-product-adedit',
  templateUrl: './product-adedit.component.html',
  styleUrls: ['./product-adedit.component.scss']
})
export class ProductAdeditComponent implements OnInit {
  data;
  paramId :any = 0;
  Errors = {status:false, msg:''}
  myForm: FormGroup;

  images = []; //--for render show
  multipleImages = []; //--for send to server

  categories = [];

  //--for edit data
  imagePath: string = environment.image_path;
  ImageDefault;
  ImagesAll = [];

  mySubscription: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private productService:ProductService,
    private categoryService:CategoryService,
    public dialog: MatDialog,
  ) {
    //--for reload componant
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
    //--end for reload componant

    //--init form
    this.myForm = this.fb.group({
      id:[''],
      pName: ['', Validators.required],
      pSlug: ['', Validators.required],
      pStatus: [''],
      pFeatured: [''],
      pCategory: ['', Validators.required],
      pQty: ['', Validators.required],
      pPrice: ['', Validators.required],
      pPriceSale: ['', Validators.required],
      pDesc: ['', Validators.required],
      pSize: ['', Validators.required],
      pColor: ['', Validators.required],
      pImageDefault: [''],
      pImages: [''],
      pSpecification: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.paramId  = parseInt(params.get('id'));
      console.log('id-', this.paramId );
    });

    if(this.paramId  && this.paramId  > 0){
      this.getOne(this.paramId);
    }

    this.getCategories();
  }



  get f() { return this.myForm.controls; }

  async getOne(id){
    console.log('getOne');
    const res = await this.productService.getOne(id);

    if(res.status === 200){
      this.data = res.data.data;
      console.log('data->>', this.data);
      this.updateProfile();
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.message;
    }

    console.log('Errors--', this.Errors);
  }

  async getCategories(){
    console.log('getCategories');
    const obj = await this.categoryService.getAll();

    if(obj){
      // console.log('obj->>', obj.data);
      obj.data.forEach(element => {
        // console.log('element->>', element);
        this.categories.push({id: element.id, name: element.cName});
      });

      console.log('this.categories->>', this.categories);
    }
  }

  updateProfile() {
    //--add all value to input form
    this.myForm.patchValue({
      id: this.data.id,
      pName: this.data.pName,
      pSlug: this.data.pSlug,
      pStatus: this.data.pStatus,
      pFeatured: this.data.pFeatured,
      pCategory: this.data.pCategory,
      pQty: this.data.pQty,
      pPrice: this.data.pPrice,
      pPriceSale: this.data.pPriceSale,
      pDesc: this.data.pDesc,
      pSize: this.data.pSize,
      pColor: this.data.pColor,

      pImageDefault: this.data.pImageDefault,
      pImages: this.data.pImages,

      pSpecification: this.data.pSpecification,
    });
    this.ImageDefault = this.imagePath + this.data.pImageDefault;

    let tmp_images = this.data.pImages.split(',');
    if(tmp_images){
      tmp_images.forEach( (value, index) => {
        this.ImagesAll.push({name: value, url: this.imagePath + value});
      });
    }

    console.log(`tmp_images-`, tmp_images);
    console.log(`this.ImagesAll-`, this.ImagesAll);
  }

  changeImageDefault(img){
    this.ImageDefault = this.imagePath + img;
    this.myForm.patchValue({pImageDefault: img}); //--update value for update
  }

  selectMultiple(event){
    if( event.target.files.length > 0){

      //--for send to server
      this.multipleImages = event.target.files;

      //--for render show
      var filesAmount = event.target.files.length;
      this.images = []; //--clear images preview render

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


  openDialog(_html) {
    let dialogRef = this.dialog.open(DialogComponent, {
        data: {
          html: _html,
        }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

  async submit(){
    const formData = new FormData();
    //--form
    const formInput = this.myForm.value;
    console.log('formInput-', formInput);
    for (const key in formInput) {
      if (formInput.hasOwnProperty(key)) {
        const element = formInput[key];
        formData.append(key, element);
      }
    }
    //--images
    for( let img of this.multipleImages){
      formData.append('images', img);
    }
    console.log('this.multipleImages-', this.multipleImages);
    // return;
    // --create
    const res = await this.productService.create(formData);
    if(res.status === 200){
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Product Created Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.router.navigate([`/admin/products`]);
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.message;
    }

  }

  async update(){
    const formData = new FormData();
    //--form
    const formInput = this.myForm.value;
    // console.log('formInput-', formInput);
    for (const key in formInput) {
      if (formInput.hasOwnProperty(key)) {
        const element = formInput[key];
        formData.append(key, element); //--add all input field to formData
      }
    }
    //--images
    for( let img of this.multipleImages){
      formData.append('images', img); //--case add more image
    }
    console.log('this.multipleImages-', this.multipleImages);
    // return;

    //--update
    const res = await this.productService.update(formData, formInput.id);
    if(res.status === 200){
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Product Update Success!</h1>
              </div>`;
      this.openDialog(_html);
      // this.router.navigate([`/admin/product-adedit/${formInput.id}`]);

      this.router.navigateByUrl(`/admin/product-adedit/${formInput.id}`);
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.message;
    }

  }

  async delimg(img){

    const res = await this.productService.deleteImage(img, this.paramId);
    if(res.status === 200){
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Delete image Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.router.navigate([`/admin/product-adedit/${this.paramId}`]);
      // this.router.navigateByUrl(`/admin/product-adedit/${this.paramId}`);
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.message;
    }


  }

}
