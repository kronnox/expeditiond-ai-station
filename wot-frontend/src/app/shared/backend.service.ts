import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of, take } from 'rxjs';
import { ImageObject } from '../drag-and-drop/model/image/image-object';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public classes: string[] = ["Asteroid","Astronaut","Auto","Brief","Raumschiff","Satellit","Satellitenschüssel","Ufo","Versorgungsbox"];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any>("http://localhost:8000/categories", {}).pipe(take(1)).subscribe(
      (res) => {
        this.classes = res.categories;
      }
    );
  }

  async predictBlob(blob: Blob, upload: boolean): Promise<number[]> {
    const formData = new FormData();
    formData.append('file', blob, 'image.png');

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const params = new HttpParams().set('save_image_flag', upload);

    const res = await firstValueFrom(this.httpClient.post<any>("http://localhost:8000/predict/image", formData, {headers: headers, params: params}));
    return res.confidence[0];
  }
}
