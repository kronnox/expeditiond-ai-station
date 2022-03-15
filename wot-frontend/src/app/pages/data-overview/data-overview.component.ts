import {Component, DoCheck, HostListener, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { WotPopoverComponent } from 'src/app/common/popover/wot-popover/wot-popover.component';
import { ImageObject } from 'src/app/model/image/image-object';
import { BackendService } from 'src/app/shared/backend.service';
import { ImageService } from 'src/app/shared/image.service';
import {WotSuccessOverlayComponent} from "../../common/layout/wot-success-overlay/wot-success-overlay.component";

@Component({
  selector: 'app-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss']
})
export class DataOverviewComponent implements OnInit {

  @HostListener('scroll')
  handleScroll() {
    this.popover.setInvisible();
  }

  @ViewChild('successOverlay') public successOverlay: WotSuccessOverlayComponent;
  @ViewChild('popover') public popover: WotPopoverComponent;

  public images: ImageObject[] = [];

  private descriptions: string[][] = [
    ['Salacia ist ein Asteroid des Kuipergürtels mit einem Durchmesser von 900km. Sollte er uns begegnen müssen wir ihn zerstören bevor er uns zerstört.',
    'Der Asteroid Psyche hätte uns in einer Mission beinahe zerstört. Zum Glück konnten wir ihn rechtzeitig abschießen.',
    'Das Asteroid Juno kam in der letzten Mission dem Truck gefährlich nahe und hätte uns beinahe großen Schaden zugefügt.',
    'Huma ist ein Asteroid vom Amor-Typ. Unser Waffensystem konnte ihn neutralisieren.',
    'Dieser Asteroid hat unserem Truck großen Schaden zugefügt.'],
    ['Das ist Leo. Ihn mussten wir auf ein früheren Mission in der Nähe des Mars aufsammeln.',
    'Diese Astronautin konnten wir in unserer letzten Mission leider nicht retten. Nun schwebt sie immer noch durch das All und fehlt in unserer Crew.',
    'Das is Torben. Ihn mussten wir in einer Rettungsmission beim Jupiter aufsammeln.',
    'Das ist der Astronaut Rico. Eine Rettungsmission schlug fehl. Seither wird er vermisst.',
    'Der Astronaut Luca ist ein wichtiger Teil unserer Mannschaft. Ihn haben wir beim Jupiter aufgesammelt.'],
    ['Das ist der Tesla Roadster der 2018 durch Elon Musk ins Weltall geschossen wurde.',
    'Mars Rover aus der ersten bemannten Mars Mission.',
    'Ein Auto? Wie kommt das denn hier her? Immer dieser Musk…',
    'Das ist ein Auto. In der Regel lassen wir Autos vorbeifliegen.',
    'Dieses Auto enthielt wertvolle Bauteile, die wir in unseren Truck einbauen konnten.'],
    ['Dieser Brief enthält geheime Informationen, die nicht in feindliche Hände geraten dürfen.',
    'Botschaften an unsere Crewmitgliedern von ihren Familien. Das erhöht die Motivation im Team.',
    'In diesem Brief hat uns die Zentrale wichtige Informationen zu unserer Mission mitgeteilt.',
    'Dieser Brief enthält das Passwort für unser Bitcoin wallet mit 100.000 Bitcoin. Ein Verlust des Briefs wäre sehr teuer.',
    'Dieser Brief beinhaltet die US-Atomwaffencodes. Diese dürfen keinesfalls in feindliche Hände gelangen.'],
    ['Dies ist ein Space Shuttle der USA. Es half uns im Kampf gegen die UFOs.',
    'Die Falcon Heavy Rakete von SpaceX hat wichtige Satelliten ins All gebracht.',
    'Dieses freundliche Raumschiff verwechselte einer unserer Schützen mit einem UFO und schoss es ab. Das führte zu diplomatischen Schwierigkeiten.'],
    ['Starlink Satellit der Internet für die Welt bereitstellt. Wir haben ihn vorbeifliegen lassen.',
    'Dieser Satellit dient der Kommunikation mit unserem Kontrollzentrum. Er muss auf seiner Umlaufbahn bleiben.',
    'WGS 6 ist ein Satellit des US-Verteidigungsministeriums. Die Umlaufbahn des Satelliten dürfen auf keinen Fall beeinflussen.',
    'Diesen Satellit haben wir in einer Mission versehentlich abgeschossen. Dies führte zu einem weltweiten Ausfall von GPS.',
    'Dieser Satellit versorgt uns auf dem Truck mit Fernsehprogramm. Ein Verlust würde extremen Motivationsverlust in der Crew bedeuten.'],
    ['Teil der alten russischen Raumstation MIR. Die Teile können für die Reparatur des Trucks verwendet werden.',
    'Satellitenschüssel mit unbekannter Technik. Wir haben sie weiterfliegen lassen.',
    'Die Teile diese Satellitenschüssel können für die Reparatur des Trucks verwendet werden.'],
    ['TL-435 ist das erste bekannte UFO. Es hat uns direkt angegriffen und den Truck fast zerstört.',
    'ESV-98 attackierte unseren Truck in der Mission im Jahr 2020 und musste neutralisiert werden.',
    'Dieses UFO zerstörte einen anderen Truck der Expedition-D Flotte.',
    'Dieses UFO hat uns beim Uranus fast zerstört.',
    'Das UFO hat uns schweren Schaden zugefügt bis wir es zerstören konnten.'],
    ['Versorgungsbox die mit lebenswichtigen Gegenständen gefüllt ist. Hätten wir sie in der Mission 1-X3 nicht eingesammelt, wäre unsere Crew verhungert.',
    'Schatztruhe mit unbekanntem Inhalt.',
    'Versorgungsbox, die uns für die letzte Mission geschickt wurde. Sie enthielt Gegenstände, die auf keinen Fall in feindliche Hände geraten dürfen.',
    'Diese Versorgungsbox hat uns in einer Mission mit wichtigen Hilfsgütern versorgt. Sie muss unbedingt aufgesammelt werden.',
    'Diese Versorgungsbox haben wir in einer Mission beim Saturn eingesammelt.']
  ];

  public currentDescription: string = '';

  constructor(private router: Router, private imageService: ImageService) { }

  ngOnInit(): void {
    let imgs = this.imageService.getNImagesOfEach(10);
    while(imgs.length > 0) {
      const index = Math.trunc(Math.random()*imgs.length);
      this.images.push(imgs[index]);
      imgs.splice(index, 1);
    }
  }

  public done(): void {
    this.successOverlay.setVisible();
  }

  public continue(): void {
    this.popover.setInvisible();
    this.router.navigate(['/data-creation']);
  }

  public showInfo(event: Event, imageObject: ImageObject): void {
    this.popover.setInvisible();
    this.currentDescription = this.descriptions[imageObject.predictedClass][Math.trunc(Math.random()*this.descriptions[imageObject.predictedClass].length)];
    const target: Element = event.target as Element;
    this.popover.setVisible(target, this.currentDescription);
  }
}
