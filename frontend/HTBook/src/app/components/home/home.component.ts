import { Component, OnInit } from '@angular/core';
import { AppConst } from 'src/app/utils/app-const';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Background Set
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });


  }

}
