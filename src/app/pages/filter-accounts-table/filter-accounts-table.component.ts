import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-filter-accounts-table',
  templateUrl: './filter-accounts-table.component.html',
  styleUrls: ['./filter-accounts-table.component.css'],
})
export class FilterAccountsTableComponent implements OnInit {
  accounts: any = [];
  clients: any = [];
  dtOptions: any = {};
  selectedClient = 'All Clients';
  params: any;
  filteredAccount: any

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {

    this.getClients();
    this.getParams();

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: {
        url: `${env.API_URL}${env.API_VERSION}/${env.ACCOUNTS}${this.params}`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        type: 'POST',
        contentType: 'application/json',
        dataFilter: (resp: any) => {
          let json = JSON.parse(resp);

          console.log(json);
          
          if (json.data.length>0) {
            const filteredName = json.data[0].clients__dot__name;
            const filteredCode = json.data[0].bank_code; 
            
            this.filteredAccount = !filteredName ? filteredCode : filteredName;
          }


          console.log(JSON.parse(resp));

          console.log('The received data from server: ', resp);
          return JSON.stringify(json); // return JSON string
        },
      },
      columns: [
        { data: 'sno' },
        { data: 'clients__dot__name' },
        { data: 'account_number' },
        { data: 'account_name' },
        { data: 'banks__dot__name' },
        { data: 'bank_code' },
        { data: 'nibss_institution_code' },
        { data: 'bvn' },
        { data: 'kyc_level_id' },
        { data: 'name_enquiry_id' },
        { data: 'mandate_ref' },
        { data: 'created_at' },
      ],
      // dom: "lBf<'overflow-auto w-100't>rip",
      dom:
        "<'row '<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4 text-right'frt>>" +
        "<'row '<'col-sm-12 overflow-auto w-100'tr>>" +
        "<'row '<'col-sm-5'i><'col-sm-7'p>>",
      buttons: ['copy', 'print', 'excel'],
    };

    
  }

  getClients() {
    this.clientsService.clients().subscribe({
      next: (res) => {
        console.log(res);
        this.clients = res.data;
      },
    });
  }
  getParams() {
    let paramsObj: any = localStorage.getItem('accountParams');
    paramsObj = JSON.parse(paramsObj);
    if (!paramsObj.bank_code) {
      this.params = `?client_id=${paramsObj.client_id}`
    } else if (!paramsObj.client_id) {
      this.params = `?bank_code=${paramsObj.bank_code}`;
    } else {
      this.params = `?client_id=${paramsObj.client_id}&bank_code=${paramsObj.bank_code}`;
    }
    console.log(this.params);
    
  }
}
