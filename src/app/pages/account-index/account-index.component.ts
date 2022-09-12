import { Component, OnInit } from '@angular/core';

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
        url: 'https://102.68.170.27/nip-mini/public/index.php/api/v1/accounts/datatable',
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
        { data: 'client_name' },
        { data: 'account_name' },
        { data: 'account_number' },
        { data: 'bank_code' },
        { data: 'nibss_institution_code' },
        { data: 'bvn' },
        { data: 'kyc_level_id' },
        { data: 'name_enquiry_id' },
        { data: 'mandate_ref' },
        { data: 'created_at' },
        { data: 'updated_at' },
      ],
      dom: 'lBfrtip',
      buttons: ['copy', 'print', 'excel'],
    };
  }
}
