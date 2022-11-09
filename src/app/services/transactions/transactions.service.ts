import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  
  constructor(private readonly apiService: ApiHandlerService) {}

  transactionRequery( params: any ) {
    return this.apiService.get(`re-query${params}`);
  }

  retryTransaction( transactionId: any ) {
    return this.apiService.get(`transaction/retry/${transactionId}`);
  }

  getTransactionsById( id: any ) {
    return this.apiService.get('');
  }
}
