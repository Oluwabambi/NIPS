import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountIndexComponent } from './account-index/account-index.component';
import { ClientIndexComponent } from './client-index/client-index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { DebitAccountProfilingComponent } from './debit-account-profiling/debit-account-profiling.component';
import { TransactionIndexComponent } from './transaction-index/transaction-index.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'clients', component: ClientIndexComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accounts', component: AccountIndexComponent },
      { path: 'transactions', component: TransactionIndexComponent },
      { path: 'account-profiling', component: DebitAccountProfilingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
