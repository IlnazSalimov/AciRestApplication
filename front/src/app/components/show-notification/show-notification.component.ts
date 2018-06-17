import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.component.html',
  styleUrls: ['./show-notification.component.css']
})
export class ShowNotificationComponent implements OnInit {
  @Input()
  private message: string;
  @Input()
  private errorMessage: string;
  @Input()
  private isError: boolean;
  @Input()
  private isSubmitted: boolean;

  constructor() { }

  ngOnInit() {
  }

}
