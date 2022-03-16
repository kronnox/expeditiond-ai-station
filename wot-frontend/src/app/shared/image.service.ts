import { Injectable } from '@angular/core';
import { ImageObject } from '../model/image/image-object';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private images: string[][] = [['assets/game/objects/Asteroid/329f14f2-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/4f72faae-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/3d8c82a6-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/7934fe1e-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/5c3d1710-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/bbef0516-a451-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/1f8fba7e-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/09748ca6-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/1561c2e0-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/68ba6b00-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/a744aee0-a451-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/c9111054-a451-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/9b877aec-a451-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/8d7ba512-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/2a573fcc-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Asteroid/9150db90-a451-11ec-bd7e-0242c0a86002.png'], ['assets/game/objects/Astronaut/37311c40-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/3789fa78-a452-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/e59af4dc-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/08dafa00-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/c327fc88-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/945c2bea-a452-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/b8fe6be8-a452-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/2e2be532-a447-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/58f564c2-a452-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/b1b61558-a447-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/f7f039b2-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/d54bc1ce-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Astronaut/757485a6-a452-11ec-bd7e-0242c0a86002.png'], ['assets/game/objects/Auto/5a628c28-a442-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/1c58fb24-a442-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/f8fffe24-a451-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/81fe8732-a442-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/dda72902-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/1b5a8944-a452-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/39e2b364-a443-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/baa1f11c-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/d81973fc-a442-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/69d2d9ec-a442-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/2aab76ce-a452-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/db91baf8-a451-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Auto/06383a7e-a444-11ec-bd7e-0242c0a86002.png'], ['assets/game/objects/Brief/226baaf0-a453-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/f6ce9d1c-a452-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/614c78ee-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/2a6a0a9e-a453-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/3fad78be-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/6f18e386-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/5c8a4fd4-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/7f69b940-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/557a1f1c-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/814fd92e-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/e355a7bc-a452-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/871b7188-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/493d0b24-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Brief/c67b6244-a452-11ec-bd7e-0242c0a86002.png'], ['assets/game/objects/Raumschiff/0f1fe710-a447-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Raumschiff/798f5056-a445-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Raumschiff/a4996088-a482-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Raumschiff/e9dd9326-a482-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Raumschiff/b4dff2f4-a446-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Raumschiff/551f838e-a482-11ec-bd7e-0242c0a86002.png'], ['assets/game/objects/Satellit/6585efa6-a455-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/5af0dd90-a454-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/a53f293e-a444-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/a349072a-a454-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/3f3a4094-a456-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/56a2b98a-a444-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/95d85774-a442-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/e2180422-a442-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/7d8dcd68-a454-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/37df79de-a444-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/c895d9fc-a442-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/c393930c-a444-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/78b3e1b6-a444-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellit/b18a4568-a442-11ec-bd7e-0242c0a86002.png'], ['assets/game/objects/Satellitenschussel/bc78c050-a445-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/ca2645ba-a440-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/efb87d60-a455-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/ac9634aa-a455-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/830231c6-a440-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/7ad53790-a455-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/8fd31536-a455-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/b25091c0-a440-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/68e10a06-a440-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/ed9d5e3e-a440-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/0c8a6e18-a446-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/08e0ecba-a441-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/2811a990-a440-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/fe9dfb6c-a445-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Satellitenschussel/30126bc4-a446-11ec-bd7e-0242c0a86002.png'], ['assets/game/objects/Ufo/aff0647e-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/aed6f468-a453-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/f7984e60-a447-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/dc7c0c0a-a453-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/751534fa-a445-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/9ce61108-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/dded0b7a-a43f-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/8bc2aa98-a445-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/fbb537b0-a442-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/04c9d98a-a440-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/972d63e2-a453-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/3e59d214-a453-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Ufo/c7b67594-a43f-11ec-bd7e-0242c0a86002.png'], ['assets/game/objects/Versorgungsbox/216eab10-a454-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/7daa9956-a441-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/017e0fee-a454-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/9dcf17fc-a441-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/3058f5c2-a454-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/e05e87fe-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/b02d0f06-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/3be91402-a441-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/4e9a2ad0-a43e-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/52d664c6-a441-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/e4022d72-a441-11ec-bd7e-0242c0a86002.png', 'assets/game/objects/Versorgungsbox/7ad907d8-a43e-11ec-bd7e-0242c0a86002.png']];

  constructor() { }

  public getNImagesOfEach(num: number): ImageObject[] {
    let ret_imgs: ImageObject[] = [];

    for(let i = 0; i < this.images.length; i++){
      let temp_copy = this.images[i].slice();
      let temp_imgs: ImageObject[] = [];
      while (temp_imgs.length < num && temp_copy.length > 0){
        const index = Math.trunc(Math.random() * temp_copy.length);
        let io = new ImageObject(temp_copy[index], false);
        io.prediction[i] = 1;
        io.predictedClass = i;
        temp_imgs.push(io);
        temp_copy.splice(index, 1);
      }
      ret_imgs = ret_imgs.concat(temp_imgs);
    }
    return ret_imgs;
  }

  public getNImagesOfClass(num: number, cat: number): ImageObject[] {
    let temp_copy = this.images[cat].slice();
    let cat_imgs = temp_copy.slice();
    let ret_imgs: ImageObject[] = [];
    while (ret_imgs.length < num && cat_imgs.length > 0){
      const index = Math.trunc(Math.random() * cat_imgs.length)
      let io = new ImageObject(cat_imgs[index], false);
      io.prediction[cat] = 1;
      io.predictedClass = cat;
      ret_imgs.push(io);
      cat_imgs.splice(index, 1);
    }
    return ret_imgs;
  }

  public getRandomImage(): ImageObject {
    const randCat = Math.trunc(Math.random() * this.images.length);
    const randImg = Math.trunc(Math.random() * this.images[randCat].length);
    let io = new ImageObject(this.images[randCat][randImg], false);
    io.labeledClass = randCat;
    return io;
  }

  public getRandomImages(num: number): ImageObject[] {
    const ret: ImageObject[] = [];
    for (let i = 0; i < num; i++) {
      ret.push(this.getRandomImage());
    }
    return ret;
  }
}
