import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BannerService } from 'src/app/share/banner.service';
import { environment } from 'src/environments/environment';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/share/dialog/dialog.component';

@Component({
  selector: 'app-banner-adedit',
  templateUrl: './banner-adedit.component.html',
  styleUrls: ['./banner-adedit.component.scss']
})
export class BannerAdeditComponent implements OnInit {

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''}
  myForm: FormGroup;

  images = []; //--for render show
  multipleImages = []; //--for send to server

  //--for edit data
  imagePath: string = environment.image_path;
  ImageDefault;
  ImagesAll = [];

  mySubscription: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private bannerService:BannerService,
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
      bName: ['', Validators.required],
      bTitle: ['', Validators.required],
      bLink: ['', Validators.required],
      bSlug: ['', Validators.required],
      bStatus: [''],
      bDesc: ['', Validators.required],
      bImage: [''],
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
  }

  get f() { return this.myForm.controls; }

  async getOne(id){
    console.log('getOne');
    const res = await this.bannerService.getOne(id);

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

  updateProfile() {
    //--add all value to input form
    this.myForm.patchValue({
      id: this.data.id,
      bName: this.data.bName,
      bTitle: this.data.bTitle,
      bLink: this.data.bLink,
      bSlug: this.data.bSlug,
      bStatus: this.data.bStatus,
      bDesc: this.data.bDesc,
      bImage: this.data.bImage,
    });
    this.ImageDefault = this.imagePath + this.data.bImage;
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
    const res = await this.bannerService.create(formData);
    if(res.status === 200){
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Banner Created Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.router.navigate([`/admin/banners`]);
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.message;
    }

  }

  async update(){
    const formData = new FormData();
    //--form
    const formInput = this.myForm.value;
    console.log('formInput-', formInput);
    for (const key in formInput) {
      if (formInput.hasOwnProperty(key)) {
        const element = formInput[key];
        formData.append(key, element); //--add all input field to formData
      }
    }
    //--images
    if(this.multipleImages.length>0){
      for( let img of this.multipleImages){
        formData.append('images', img); //--case add new image
      }
      console.log('this.multipleImages-', this.multipleImages);
    }
    // return;

    //--update
    const res = await this.bannerService.update(formData, formInput.id);
    if(res.status === 200){
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Banner Update Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.router.navigate([`/admin/banner-adedit/${formInput.id}`]);
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.message;
    }

  }

}
