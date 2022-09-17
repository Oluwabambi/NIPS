import { Component, OnInit } from '@angular/core';
 import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrls: ['./account-index.component.css'],
})
export class AccountIndexComponent implements OnInit {
  accounts: any = [];
  dtOptions: any = {};
  constructor() {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: {
        url: env.ACCOUNT_TABLE,
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
        { data: 'banks__dot__name' },
        { data: 'account_name' },
        { data: 'account_number' },
        { data: 'bank_code' },
        { data: 'nibss_institution_code' },
        { data: 'bvn' },
        { data: 'kyc_level_id' },
        { data: 'name_enquiry_id' },
        { data: 'mandate_ref' },
        { data: 'created_at' },
      ],
      dom: 'lBfrtip',
      buttons: ['copy', 'print', 'excel'],
    };
  }
}
