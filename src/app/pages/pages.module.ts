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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FilterTransactionsTableComponent } from './filter-transactions-table/filter-transactions-table.component';
import { FilterClientsTableComponent } from './filter-clients-table/filter-clients-table.component';
import { FilterAccountsTableComponent } from './filter-accounts-table/filter-accounts-table.component';
import { ClientAccountIndexComponent } from './client-account-index/client-account-index.component';


@NgModule({
  declarations: [
    ClientIndexComponent,
    AccountIndexComponent,
    PagesComponent,
    DashboardComponent,
    DebitAccountProfilingComponent,
    TransactionIndexComponent,
    TransactionDetailsComponent,
    FilterTransactionsTableComponent,
    FilterClientsTableComponent,
    FilterAccountsTableComponent,
    ClientAccountIndexComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
    NgxDropzoneModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
})
export class PagesModule {}
