import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Scale} from '../../../server/model/Scale';

@Injectable({providedIn: 'root'})
export class ScaleService {

  constructor(private http: HttpClient) {
  }

  async getAll(): Promise<Scale[]> {
    return <Scale[]>await this.http.get('/api/scale').toPromise();
  }

}
