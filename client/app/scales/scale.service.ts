import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Scale} from './Scale';

const SCALE_API_URL = '/api/scale';

@Injectable({providedIn: 'root'})
export class ScaleService {

  constructor(private http: HttpClient) {
  }

  async getAll(): Promise<Scale[]> {
    return <Scale[]>await this.http.get(SCALE_API_URL).toPromise();
  }

  async getById(id: number): Promise<Scale> {
    return <Scale>await this.http.get(SCALE_API_URL + '/' + id).toPromise();
  }

  async save(scale: Scale): Promise<Scale> {
    return <Scale>await this.http.put(SCALE_API_URL, scale).toPromise();
  }

}
