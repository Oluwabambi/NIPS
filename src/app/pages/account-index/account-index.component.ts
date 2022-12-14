import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { environment as env } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup, Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrls: ['./account-index.component.css'],
})
export class AccountIndexComponent implements OnInit {

  accounts: any = [];
  clients: any = [];
  dtOptions: any = {};
  selectedClient = 'All Clients';

  accountForm = this.fb.group({
    client_id: new FormControl('All Clients', [Validators.required]),
    bank_code: new FormControl('', [Validators.required]),
  })

  constructor(private clientsService: ClientsService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: {
        url: `${env.API_URL}${env.API_VERSION}/${env.ACCOUNTS}`,
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

        this.clients = res.data;
      },
    });
  }

  filter(data: any) {
    console.log(data);
    localStorage.setItem('accountParams', JSON.stringify(data));
    this.router.navigateByUrl('index/accounts/filter');
  }
}
