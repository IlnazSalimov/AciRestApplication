import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';

import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { AppComponent } from './components/app/app.component';
import { BillerListComponent } from './components/biller-list/biller-list.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { PaymentService } from './services/payment.service';
import { CreatePaymentComponent } from './components/create-payment/create-payment.component';
import { CustomerService } from './services/customer.service';
import { BillerService } from './services/biller.service';
import { ShowErrorComponent } from './components/show-errors/show-errors.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CreateBillerComponent } from './components/create-biller/create-biller.component';
import { UtilsService } from './services/utils.service';
import { ShowNotificationComponent } from './components/show-notification/show-notification.component';


@NgModule({
  declarations: [
    AppComponent,
    PaymentListComponent,
    CustomerListComponent,
    BillerListComponent,
    CreatePaymentComponent,
    ShowErrorComponent,
    CreateCustomerComponent,
    CreateBillerComponent,
    ShowNotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgProgressModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'payments', pathMatch: 'full' },
      { path: 'payments', component: PaymentListComponent, data: { title: 'Payments list' } },
      { path: 'customers', component: CustomerListComponent , data: { title: 'Customer list' }},
      { path: 'billers', component: BillerListComponent , data: { title: 'Biller list' }},
      { path: 'payment/create', component: CreatePaymentComponent , data: { title: 'Create new payment' }},
      { path: 'customer/create', component: CreateCustomerComponent , data: { title: 'Create new customer' }},
      { path: 'biller/create', component: CreateBillerComponent , data: { title: 'Create new biller' }},
      { path: '**', redirectTo: 'payments' }
  ])
  ],
  providers: [
    PaymentService, CustomerService, BillerService, UtilsService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
