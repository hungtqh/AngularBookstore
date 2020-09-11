import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }
}
