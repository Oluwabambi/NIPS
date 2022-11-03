import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-filter-transactions-table',
  templateUrl: './filter-transactions-table.component.html',
  styleUrls: ['./filter-transactions-table.component.css'],
})
export class FilterTransactionsTableComponent implements OnInit {
  dtOptions: any = {};
  transactions: any = [];
  selectedClient: any = localStorage.getItem('clientToFilter');
  dateRange: any;
  client: any;
  clients: any;
  allClients: any = { id: 0, name: 'All Clients' };
  params: any

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    console.log(
      `${env.API_URL}${env.API_VERSION}/${env.TRANSACTIONS}?client=${this.selectedClient}`
    );

    this.getClient();
    this.getParams();

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: {
        url:
          env.API_URL + env.API_VERSION + '/' + env.TRANSACTIONS + this.params,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        type: 'POST',
        contentType: 'application/json',
        dataFilter: (resp: any) => {
          let json = JSON.parse(resp);
          console.log(JSON.parse(resp));
          console.log('The received data from server: ', resp);
          return JSON.stringify(json); // return JSON string
        },
      },
      columns: [
        { data: 'sno' },
        { data: 'client__dot__name' },
        { data: 'source_bank__dot__bank_name' },
        { data: 'source_account_no' },
        { data: 'source_bank_code' },
        { data: 'beneficiary_bank__dot__bank_name' },
        { data: 'schedule_beneficiaries__dot__account_number' },
        { data: 'schedule_beneficiaries__dot__bank_code' },
        { data: 'schedule_id' },
        { data: 'amount' },
        { data: 'tried_amount' },
        { data: 'successful_payment' },
      ],
      // dom: 'lBftrip',
      dom:
        "<'row '<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'frt>>" +
        "<'row '<'col-sm-12 overflow-auto w-100'tr>>" +
        "<'row '<'col-sm-5'i><'col-sm-7'p>>",
      buttons: ['copy', 'print', 'excel'],
    };
  }

  getClient() {
    this.clientsService.clients().subscribe({
      next: (res) => {
        this.clients = res.data;
        
        this.clients.unshift(this.allClients);

        this.client = this.clients.find( (name:any) => name.id === +this.selectedClient)

        !this.client ? this.client = {name: 'All Clients'} : this.client = this.client

        console.log(this.client);
      },
    });
  }

  getParams() {
    let filterParams: any = localStorage.getItem('selectedFilters');
    filterParams = JSON.parse(filterParams);
    console.log(filterParams);
    

    if (filterParams.client === 'All Clients') {
      if (!filterParams.date_to) {
        this.params = '?date_from=' + filterParams.date_from
      } else if (!filterParams.date_from) {
        this.params = '?date_to=' + filterParams.date_to
      } else {
        this.params = '?date_from=' + filterParams.date_from + '&date_to=' + filterParams.date_to
      }
    } else if (!filterParams.date_to) {
      this.params = '?client=' + filterParams.client + '?date_from=' + filterParams.date_from
    } else if (!filterParams.date_from) {
      this.params = '?client=' + filterParams.client + '?date_to=' + filterParams.date_to
    }
     else {
      this.params = '?client=' + filterParams.client + '?date_from=' + filterParams.date_from + '&date_to=' + filterParams.date_to
    }

    console.log(this.params);
  }
}
