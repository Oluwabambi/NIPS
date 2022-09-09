import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ClientIndexComponent } from './client-index/client-index.component';
import { AccountIndexComponent } from './account-index/account-index.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DebitAccountProfilingComponent } from './debit-account-profiling/debit-account-profiling.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TransactionIndexComponent } from './transaction-index/transaction-index.component';


@NgModule({
  declarations: [
    ClientIndexComponent,
    AccountIndexComponent,
    PagesComponent,
    DashboardComponent,
    DebitAccountProfilingComponent,
    TransactionIndexComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule
  ],
})
export class PagesModule {}
