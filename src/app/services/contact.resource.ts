import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class Contact {
  private apiRoot: string = "http://localhost:3000/contacts";

  constructor(private http: HttpClient) {}

  query(params: {[key: string]: string}): Observable<any[]> {
    return this.http.get<any>(this.apiRoot, {params});
  }

  get(id, params?: {string: string}): Observable<any> {
    return this.http.get(this.apiRoot + "/" + id, {params});
  }

  save(data: any): Observable<any> {
    return this.http.post(this.apiRoot, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(this.apiRoot + "/" + data.id, data);
  }

  remove(data: any): Observable<any> {
    return this.http.delete(this.apiRoot + "/" + data.id);
  }
}
