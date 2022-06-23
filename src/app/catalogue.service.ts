import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host: string = 'http://localhost:8087';

  constructor(private http: HttpClient, private authen: AuthenticationService) {
  }

  getAllCategories() {
    return this.http.get(this.host + '/categories');
  }

  getRessource(url) {
    return this.http.get(url);
  }


  putRessource(url: any, data: any) {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.authen.jwt});
    return this.http.put(url, data, {headers: header});
  }


  deleteRessource(url) {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.authen.jwt});
    return this.http.delete(url, {headers: header});
  }

  postRessource(url, data) {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.authen.jwt});
    return this.http.post(url, data, {headers: header});
  }


  patchRessource(url: any, value: any) {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + this.authen.jwt});
    return this.http.patch(url, value, {headers: header}); // patch met ajour unique l'information envoyé
  }
}
