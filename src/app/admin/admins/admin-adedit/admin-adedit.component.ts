import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/share/user.service';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/share/dialog/dialog.component';

@Component({
  selector: 'app-admin-adedit',
  templateUrl: './admin-adedit.component.html',
  styleUrls: ['./admin-adedit.component.scss']
})
export class AdminAdeditComponent implements OnInit {

  data;
  paramId :any = 0;
  Errors = {status:false, msg:''}
  myForm: FormGroup;

  mySubscription: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private userService:UserService,
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
      status: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
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
    const res = await this.userService.getOne(id);

    if(res.status === 200){
      this.data = res.data.data;
      console.log('data->>', this.data);
      this.updateValue();
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.message;
    }

    console.log('Errors--', this.Errors);
  }

  updateValue() {
    //--add all value to input form
    this.myForm.patchValue({
      id: this.data.id,
      status: this.data.status,
      firstname: this.data.firstname,
      lastname: this.data.lastname,
      email: this.data.email,
    });
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

    const formInput = this.myForm.value;
    console.log('formInput-', formInput);
    // return;
    // --create
    const res = await this.userService.registerAdmin(formInput);
    console.log('res-', res);
    if(res.status === 200){
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Admin Created Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.router.navigate([`/admin/admins`]);
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.data.message;

      let _html=`
              <div class="c-red">
                <div class="material-icons">block</div>
                <h1>${res.data.message}!</h1>
              </div>`;
      this.openDialog(_html);
    }

  }

  async update(){

    const formInput = this.myForm.value;
    console.log('formInput-', formInput);
    // return;

    //--update
    const res = await this.userService.update(formInput, formInput.id);
    if(res.status === 200){
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Admin Update Success!</h1>
              </div>`;
      this.openDialog(_html);
      this.router.navigate([`/admin/admin-adedit/${formInput.id}`]);
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.message;
    }

  }

}
