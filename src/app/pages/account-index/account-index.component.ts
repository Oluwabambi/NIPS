import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients/clients.service';
 import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrls: ['./account-index.component.css'],
})
export class AccountIndexComponent implements OnInit {
  accounts: any = [];
  clients: any = [];
  dtOptions: any = {};
  selectedClient = 'All Clients'
  
  constructor( private clientsService: ClientsService ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: {
        url: env.API_URL + env.API_VERSION + '/' + env.ACCOUNTS,
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

    this.getClients();
  }

  getClients() {
    this.clientsService.clients().subscribe({
      next: (res) => {
        console.log(res);
        
        this.clients = res.data
      }
    })
  }
}
