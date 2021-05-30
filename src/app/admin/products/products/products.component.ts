import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/share/product.service';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/app/models/IProduct';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/share/dialog/dialog.component';
import { DialogConfirmComponent } from 'src/app/share/dialog-confirm/dialog-confirm.component';
import { CategoryService } from 'src/app/share/category.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  imgPath: string = environment.image_path;

  displayedColumns: string[] = ['id', 'pImapImageDefaultges', 'pCategory', 'pFeatured', 'pStatus', 'pName', 'pQty', 'pPrice', 'pPriceSale', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<IProduct>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Errors = {status:false, msg:''}

  categories = [];

  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
    public dialog: MatDialog,
  ) { }

  async ngOnInit(){

    const objs:any = await this.getAll();
    // console.log('dobjs.data-', objs);
    if(objs){
      this.dataSource = new MatTableDataSource(objs);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    this.getCategories();
  }

  async getAll(){
    console.log('getAll');
    const data = await this.productService.getAll();
    if(data){
      return data.data;
    }
  }

  async getCategories(){
    console.log('getCategories');
    const obj = await this.categoryService.getAll();

    if(obj){
      obj.data.forEach(element => {
        // console.log('element->>', element);
        this.categories[element.id] = element.cName;
      });
      // console.log('this.categories->>', this.categories);
      // console.log('this.categoriesxxx->>', this.categories[5]);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async onToggle(event,id) {
    console.log('toggle', event.checked);
    console.log('id', id);

    let status = event.checked;
    const res = await this.productService.updateStatus(status, id);
    if(res.status === 200){
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Status update Success!</h1>
              </div>`;
      this.openDialog(_html);

      this.ngOnInit();
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.message;
    }
  }



  async delete(id){
    console.log('delete');
    console.log('id--', id);

    // return;

    const res = await this.productService.delete(id);
    if(res.status === 200){
      let _html=`
              <div class="c-green">
                <div class="material-icons">task_alt</div>
                <h1>Product Delete Success!</h1>
              </div>`;
      this.openDialog(_html);

      this.ngOnInit();
    }else{
      this.Errors.status = true;
      this.Errors.msg = res.message;
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
    }, 2000);
  }

  confirmDialog(id) {
    let dialogRef = this.dialog.open(DialogConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if(result){
        this.delete(id);
      }
    });

  }
}
