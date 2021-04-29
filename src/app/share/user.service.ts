import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import axios from 'axios';
import axios from "src/utils/axios"
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL: string = environment.api_url;
  apiPath = 'user';

  constructor() { }

  //--get all user
  async getUsers(){
    try {
      const res = await axios.get(`${this.apiURL}/api/users`);
      console.log('res.data-', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  //--create new user
  async register(payload){
    //--add username and role
    payload.username = payload.email; //--we will using email for username
    payload.roles = ['user']; //--defaul set to user role
    try {
      const res = await axios.post(`${this.apiURL}/api/auth/signup`, payload);
      console.log('res-', res);
      if(res){
        return res;
      }
    } catch (error) {
      console.log(error);
      // console.error(error);
    }
  }

  async registerAdmin(payload){
    payload.username = payload.email; //--we will using email for username
    payload.roles = ['admin']; //--set admin role
    try {
      const res = await axios.post(`${this.apiURL}/api/auth/signup`, payload);
      // console.log('res-', res);
      if(res){
        return res;
      }
    } catch (error) {
      console.log(error);
      // console.error(error);
    }
  }

  //--user login
  async userLogin(payload){
    try {
      const res = await axios.post(`${this.apiURL}/api/auth/signin`, payload);
      // console.log('res-', res);
      if(res){
        return res;
      }
    } catch (error) {
      console.log(error);
      // console.error(error);
    }
  }

  //--Admin login
  async adminLogin(payload){
    try {
      const res = await axios.post(`${this.apiURL}/api/auth/signin`, payload);
      if(res){
        return res;
      }
    }
    catch (error) {
      // console.log(error);
      console.error(error);
    }
  }

  //=========================
  getToken(){
    return { headers: { 'x-access-token': this.getAdmin() }};
  }

  getUser(){
    if(sessionStorage.getItem("user-data")){
      var user = JSON.parse(sessionStorage.getItem("user-data"));
    }
    return user ? user.accessToken : false;
  }

  getAdmin(){
    if(sessionStorage.getItem("admin-data")){
      var admin = JSON.parse(sessionStorage.getItem("admin-data"));
    }
    return admin ? admin.accessToken : false;
  }
  //=========================

  //--get all user
  async getAll(){
    try {
      const res = await axios.get(`${this.apiURL}/api/${this.apiPath}`);
      console.log('res-', res);
      if(res){
        // console.log('res.data-', res.data);
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  //--get all admin
  async getAllAdmin(){
    try {
      const res = await axios({
          method: "get",
          url: `${this.apiURL}/api/admin`,
          headers: { "x-access-token": this.getAdmin() }
      });
      // console.log('res-', res);
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

  async update(payload, id){
    console.log('payload-', payload);
    // return;

    try {
      const res = await axios({
          method: "put",
          url: `${this.apiURL}/api/${this.apiPath}/${id}`,
          data: payload,
          headers: { "x-access-token": this.getAdmin() }
      });

      // console.log('res-', res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async updateStatus(status, id){
    try {
      const res = await axios({
        method: "get",
        url: `${this.apiURL}/api/${this.apiPath}/public/${id}/${status}`,
        headers: { "x-access-token": this.getAdmin() }
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
        headers: { "x-access-token": this.getAdmin() }
      });
      console.log('res-', res);
      return res;
    } catch (error) {
      // console.error(error);
      console.log(error);
    }
  }

}
