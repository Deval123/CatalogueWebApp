import {Component, OnInit} from '@angular/core';
import {CatalogueService} from '../catalogue.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories;
  mode = 'list';

  constructor(private catalogueService: CatalogueService) {
  }

  ngOnInit() {
    this.onGetAllCategories();
  }

  onDeleteCat(cat) {
    let c = confirm('Etes vous sûr?');
    if (!c) {
      return;
    }
    this.catalogueService.deleteRessource(cat._links.self.href)
      .subscribe(data => {
        this.onGetAllCategories();
      }, err => {
        console.log(err);
      });
  }

  onGetAllCategories() {
    this.catalogueService.getAllCategories()
      .subscribe(data => {
        this.categories = data;
      }, err => {
        console.log(err);
      });
  }

  onNewCat() {
    this.mode = 'new-cat';
  }

  onSaveCat(value: any) {
    console.log(value);
    let url = this.catalogueService.host + '/categories';
    this.catalogueService.postRessource(url, value)
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllCategories();
      }, err => {
        console.log(err);
      });
  }

  currentCategorie;

  onEditCat(cat) {
    this.catalogueService.getRessource(cat._links.self.href)
      .subscribe(data => {
        this.currentCategorie = data;
        this.mode='edit-cat';
      }, error1 => {
        console.log(error1);
      });
  }

  onUpdateCat(value: any) {
    console.log(value);
    let url = this.currentCategorie._links.self.href;
    this.catalogueService.putRessource(url, value)
      .subscribe(data => {
        this.mode = 'list';
        this.onGetAllCategories();
      }, err => {
        console.log(err);
      });
  }
}
