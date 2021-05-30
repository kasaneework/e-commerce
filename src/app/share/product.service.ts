import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/share/user.service';

// import axios from 'axios';
import axios from "src/utils/axios"

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL: string = environment.api_url;
  apiPath = 'product';

  constructor(
    private userService:UserService,
  ) {}

  //--get all user
  async getAll(){
    try {
      const res = await axios.get(`${this.apiURL}/api/${this.apiPath}`);
      console.log('res.data-', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getFeatured(){
    try {
      const res = await axios.get(`${this.apiURL}/api/${this.apiPath}/getfeatured`);
      console.log('res.data-', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getRecent(){
    try {
      const res = await axios.get(`${this.apiURL}/api/${this.apiPath}/getrecent`);
      console.log('res.data-', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async recentClick(slug){
    try {
      const res = await axios.get(`${this.apiURL}/api/${this.apiPath}/recentclick/${slug}`);
      console.log('res.data-', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getOne(id=0){
    try {
      const res = await axios.get(`${this.apiURL}/api/${this.apiPath}/${id}`);
      // console.log('res.data-', res);
      return res;
    } catch (error) {
      // console.error(error);
      console.log(error);
    }
  }

  async getSlug(slug){
    try {
      const res = await axios.get(`${this.apiURL}/api/${this.apiPath}/getslug/${slug}`);
      // console.log('res.data-', res);
      return res;
    } catch (error) {
      // console.error(error);
      console.log(error);
    }
  }


  async uploadMulti(payload){
    try {
      let _header = this.userService.getToken()
      const res = await axios.post(`${this.apiURL}/uploadmultiple`, payload);
      console.log('res-', res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async create(payload){
    try {
      const res = await axios({
          method: "post",
          url: `${this.apiURL}/api/${this.apiPath}`,
          data: payload,
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": this.userService.getAdmin()
          }
      });

      // console.log('res-', res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async update(payload, id){
    console.log('payload-', payload);
    // return;

    try {
      const res = await axios({
          method: "put",
          url: `${this.apiURL}/api/${this.apiPath}/${id}`,
          data: payload,
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": this.userService.getAdmin()
          }
      });

      // console.log('res-', res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteImage(img, id){
      try {
        const res = await axios({
          method: "get",
          url: `${this.apiURL}/api/${this.apiPath}/image/${id}/${img.name}`,
          headers: { "x-access-token": this.userService.getAdmin() }
        });
        console.log('res-', res);
        return res;
      } catch (error) {
        // console.error(error);
        console.log(error);
      }
  }

  async updateStatus(status, id){
    try {
      const res = await axios({
        method: "get",
        url: `${this.apiURL}/api/${this.apiPath}/public/${id}/${status}`,
        headers: { "x-access-token": this.userService.getAdmin() }
      });
      console.log('res-', res);
      return res;
    } catch (error) {
      // console.error(error);
      console.log(error);
    }
}


  async delete(id){
    try {
      const res = await axios({
        method: "delete",
        url: `${this.apiURL}/api/${this.apiPath}/${id}`,
        headers: { "x-access-token": this.userService.getAdmin() }
      });
      console.log('res-', res);
      return res;
    } catch (error) {
      // console.error(error);
      console.log(error);
    }
  }

}
