import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/share/dialog/dialog.component';

@Component({
  selector: 'app-top-left',
  templateUrl: './top-left.component.html',
  styleUrls: ['./top-left.component.scss']
})
export class TopLeftComponent implements OnInit {
  menu = {main: false, child: false}
  adminData;
  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  mainOver(){
    this.menu.main = true;
  }
  mainOut(){
    this.menu.main = false;
  }
  childOver(){
    this.menu.main = false;
    this.menu.child = true;
  }
  childOut(){
    this.menu.child = false;
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
  adminLogout(){
    sessionStorage.removeItem("admin-data");
    let _html=`
      <div class="c-red">
        <div class="material-icons">task_alt</div>
        <h1>Logout Success!</h1>
      </div>`;
    this.openDialog(_html);
    this.router.navigate(["/admin/login"]);
  }

  get admin(){
    if(sessionStorage.getItem("admin-data")){
      this.adminData = JSON.parse(sessionStorage.getItem("admin-data"));
    }
    return this.adminData? this.adminData: false;
  }
}
