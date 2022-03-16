import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gameover-overlay',
  templateUrl: './gameover-overlay.component.html',
  styleUrls: ['./gameover-overlay.component.scss']
})
export class GameoverOverlayComponent implements OnInit {

  @Input() win: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
