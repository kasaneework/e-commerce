import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { UserService } from 'src/app/share/user.service';
import { Router } from '@angular/router';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/share/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  customError = {status: false, message:''};
  customError2 = {status: false, message:''};
  isPassMatch = false;

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private router: Router,
    public dialog: MatDialog,
    ) {

        this.registerForm = this.fb.group({
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          phone: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirm_password: ['', Validators.required],
        });

        this.loginForm = this.fb.group({
          username: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
        });

  }

  ngOnInit(): void {
    console.log('environment--', environment.api_url);
  }
  get freg() { return this.registerForm.controls; }
  get flog() { return this.loginForm.controls; }

  compare(array2txt){
    return array2txt[0] === array2txt[1] ? true : false;
  }

  checkPasswords(array2txt) {
    this.isPassMatch = this.compare(array2txt);
  }

  async register(){
    console.log('register');
    if (!this.registerForm.invalid && this.isPassMatch) { //--Checks form input validity and Password match

      const res = await this.userService.register(this.registerForm.value);
      console.log('res-', res);
      if(res.status === 200){
        //-- success
        this.registerForm.reset();
        let _html=`
            <div class="c-green">
              <div class="material-icons">task_alt</div>
              <h1>Register Success!</h1>
              <h3>Please login</h3>
            </div>`;
        this.openDialog(_html);

      }else{
        //-- Fail
        this.customError.status = true;
        this.customError.message = res.data.message;
        console.log('this.customError--', this.customError);
      }
    } else {
        //--Form input is not valid
        this.registerForm.markAllAsTouched(); //--Trigger validation across form
        console.log('block submission');
    }
  }

  async userLogin(){
    console.log('userLogin');
    if (!this.loginForm.invalid) { //--Checks form input validity
        //--Form input is valid
        const res = await this.userService.userLogin(this.loginForm.value);
        console.log('rescc-', res);
        if(res.status === 200){
          //-- success
          sessionStorage.setItem("user-data", JSON.stringify(res.data.data));
          let _html=`
                  <div class="c-green">
                    <div class="material-icons">task_alt</div>
                    <h1>Login Success!</h1>
                  </div>`;
          this.openDialog(_html);

          this.loginForm.reset();
          this.router.navigate(["my-account"]);
        }else{
          //-- Fail
          this.customError2.status = true;
          this.customError2.message = res.data.message;
          console.log('this.customError2--', this.customError2);
        }
    } else {
        //--Form input is not valid
        this.loginForm.markAllAsTouched(); //--Trigger validation across form
        console.log('block submission');
    }
  }

  openDialog(_html) {
    // console.log('_html-', _html);
    let dialogRef = this.dialog.open(DialogComponent, {
        data: {
          html: _html,
        }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

}
