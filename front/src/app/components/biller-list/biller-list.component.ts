import { Component, OnInit } from '@angular/core';
import { BillerService } from '../../services/biller.service';
import { Biller } from '../../models/biller';

@Component({
  selector: 'app-biller-list',
  templateUrl: './biller-list.component.html',
  styleUrls: ['./biller-list.component.css']
})
export class BillerListComponent implements OnInit {

  public billers: Biller[];
  private submitted: boolean;
  private isRequestError: boolean;
  private postErrorMessage: string;

  constructor(private billerService: BillerService) { }

  ngOnInit() {
    this.refreshCustomerList();
  }

  refreshCustomerList(callback: () => any = null) {
    this.billerService.getAll().subscribe((billers) => {
      this.billers = billers;
      if (callback) {
        callback();
      }
    });
  }

  deleteBiller(id: string) {
    this.billerService.delete(id, () => {
      this.isRequestError = false;
      this.refreshCustomerList();
    }, (error) => {
      this.isRequestError = true;
      this.postErrorMessage = error.message;
    });
    this.submitted = true;
  }
}
