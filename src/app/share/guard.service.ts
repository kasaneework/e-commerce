import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { UserService } from 'src/app/share/user.service';
import { Router } from '@angular/router';


import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/share/dialog/dialog.component';

@Injectable()
export class AuthGuard implements CanActivate {
  //Constructor
  constructor(
    private userService:UserService,
    private router: Router,
    public dialog: MatDialog,
    ) { }
  canActivate() {
      if (this.userService.getAdmin()) {
        return true;
      } else {

        let _html=`
                  <div class="c-red">
                    <div class="material-icons">error_outline</div>
                    <h1>Please log in!</h1>
                  </div>`;
        this.openDialog(_html);

        this.router.navigate(['/admin/login']);
        return false;
      }
  }

  openDialog(_html) {
    let dialogRef = this.dialog.open(DialogComponent, {
        data: {
          html: _html,
        }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 3000);
  }
}
