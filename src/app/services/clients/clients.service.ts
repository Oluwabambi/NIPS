import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private readonly apiService: ApiHandlerService) {}

  storeClient(data: any) {
    return this.apiService.post('clients', data);
  }

  clients() {
    return this.apiService.get('clients')
  }

  clientStatusToggle(data: any, id: number) {
    return this.apiService.post(`clients/toggle_status${id}`, data);
  }

  updateClient(data: any, id: number) {
    return this.apiService.patch(`clients${id}`, data);
  }

  clientIndex(data: any) {
    return this.apiService.post('clients/datatable', data);
  }
}
