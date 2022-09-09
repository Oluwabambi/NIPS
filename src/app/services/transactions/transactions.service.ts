import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  
  constructor(private readonly apiService: ApiHandlerService) {}

  transactionRequery(data: any) {
    return this.apiService.post('re-query?schedule_id=739292841139XTCWXGKNFI', data);
  }
}
