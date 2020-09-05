import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }
}
