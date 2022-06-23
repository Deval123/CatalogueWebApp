import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
   products;

  constructor(private catService:CatalogueService, private route:ActivatedRoute, private router:Router) {
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        let url = atob(this.route.snapshot.params.devProds); //atob décoder en base64Url
        this.onGetProducts(url);
      }
    })

  }
  ngOnInit() {
    console.log("devFlore =" + this.route.snapshot.params.devProds);

  }
  onGetProducts(url){
    this.catService.getRessource(url)
      .subscribe(data => {
        this.products = data;
      }, err=> {
        console.log(err);
      });
  }
}
