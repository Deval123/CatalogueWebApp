import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private catService:CatalogueService, private router:Router) { }
  categories;
  currentCategory;
  ngOnInit() {
    this.catService.getAllCategories()
      .subscribe(data => {
        this.categories=data;
      }, err=>{
        console.log(err);
      });
  }

  onGetProducts(c) {
    this.currentCategory = c;
    let url=c._links.products.href; //btoa permet de convertir une chaîne de caractère en base64Url
    this.router.navigateByUrl('/products/' + btoa(url));
  }
}
