import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private readonly apiService: ApiHandlerService) {}

  accountIndex(data: any) {
    return this.apiService.post('accounts/databale', data);
  }

  debitBulkAccountProfiling(data: any) {
    return this.apiService.post('accounts/profile_bulk_debit_account', data);
  }

  banks() {
    return this.apiService.get('banks')
  }

  debitAccountProfiling(data: any) {
    console.log(data);
    return this.apiService.post('accounts/profile_debit_account', data);
  }
}
