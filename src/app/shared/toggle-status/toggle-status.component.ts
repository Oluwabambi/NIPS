import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-status',
  templateUrl: './toggle-status.component.html',
  styleUrls: ['./toggle-status.component.css']
})
export class ToggleStatusComponent implements OnInit {

  @Input()
  active!: boolean;
  @Output() toggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
