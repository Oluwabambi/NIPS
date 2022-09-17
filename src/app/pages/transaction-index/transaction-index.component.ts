import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-transaction-index',
  templateUrl: './transaction-index.component.html',
  styleUrls: ['./transaction-index.component.css'],
})
export class TransactionIndexComponent implements OnInit {
  dtOptions: any = {};
  transactions: any = [];

  constructor() {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: {
        url: env.TRANSACTION_TABLE,
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
        // { data: 'response_code_meaning' },
      ],
      dom: 'lBfrtip',
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        'copy',
        'print',
        'excel',
      ],
    };
  }
}
