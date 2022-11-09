import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-client-account-index',
  templateUrl: './client-account-index.component.html',
  styleUrls: ['./client-account-index.component.css'],
})
export class ClientAccountIndexComponent implements OnInit {
  
  accounts: any =[];
  dtOptions: any = {};
  clientName: any;
  client: any;
  clients: any;
  selectedClient = 'All Clients';
  clientId: any = localStorage.getItem('clientId')
  
  constructor( private clientsService: ClientsService, private router: Router ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: {
        url: `${env.API_URL}${env.API_VERSION}/${env.CLIENT_ACCOUNTS}/${this.clientId}`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        type: 'POST',
        contentType: 'application/json',
        dataFilter: (resp: any) => {
          let json = JSON.parse(resp);
          this.client = json.data
          this.clientName = this.client[0].clients__dot__name;
          console.log(JSON.parse(resp));
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
        this.clients = res.data;
      },
    });
  }

  filter() {
    this.router.navigateByUrl('index/accounts/filter');
  }
}
