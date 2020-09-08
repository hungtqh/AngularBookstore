import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit(): void {
    if (this.message) {
      $('#notificationModal').modal('show');
      console.log(this.message);
    }

    $('#notificationModal').on('hidden.bs.modal', () => {
      this.message = null;
    })
  }
}
