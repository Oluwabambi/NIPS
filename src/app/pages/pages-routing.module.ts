import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountIndexComponent } from './account-index/account-index.component';
import { ClientIndexComponent } from './client-index/client-index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { DebitAccountProfilingComponent } from './debit-account-profiling/debit-account-profiling.component';
import { TransactionIndexComponent } from './transaction-index/transaction-index.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { FilterClientsTableComponent } from './filter-clients-table/filter-clients-table.component';
import { FilterTransactionsTableComponent } from './filter-transactions-table/filter-transactions-table.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'clients', component: ClientIndexComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accounts', component: AccountIndexComponent },
      { path: 'transactions', component: TransactionIndexComponent },
      { path: 'transactions/details', component: TransactionDetailsComponent },
      { path: 'account-profiling', component: DebitAccountProfilingComponent },
      { path: 'clients/filter', component: FilterClientsTableComponent },
      { path: 'transactions/filter', component: FilterTransactionsTableComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
