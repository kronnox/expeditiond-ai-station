import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of, take } from 'rxjs';
import { ImageObject } from '../model/image/image-object';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public classes: string[] = ["Asteroid","Astronaut","Brief","Ufo","Versorgungsbox","Auto","Satellit ","SatellitenschÃ¼ssel","Raumschiff"];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any>("http://85.235.67.211:8000/categories", {}).pipe(take(1)).subscribe(
      (res) => {
        this.classes = res.categories;
      }
    );
  }

  async predictBlob(blob: Blob): Promise<number[]> {
    const formData = new FormData();
    formData.append('file', blob, 'image.png');

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const res = await firstValueFrom(this.httpClient.post<any>("http://85.235.67.211:8000/predict/image", formData, {headers: headers}));
    //this.toastr.success('It\'s a ' + res[0].class+'!');
    return res.confidence;
    //return new Array<number>(this._classes.length);
  }
}
