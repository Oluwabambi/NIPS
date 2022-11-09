import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';
import { environment as env } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements OnInit {
  dtOptions: any = {};
  transactions: any = [];
  scheduleId: any;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.scheduleId = localStorage.getItem('scheduleId');
    console.log(this.scheduleId);

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: {
        url:
          env.API_URL +
          env.API_VERSION +
          '/transactions/' +
          this.scheduleId +
          '/datatable',
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
        { data: 'transaction_id' },
        { data: 'amount' },
        { data: 'tried_amount' },
        { data: 'successful_payment' },
        {
          defaultContent: `
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
            <ul class="dropdown-menu">
              <li><button type="button" (click)="viewAccounts(client)" id="retry" class="dropdown-item" href="#">Retry</button></li>
            </ul>
          </div>  
      `,
        },
      ],
      // dom: 'lBftrip',
      dom:
        "<'row '<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4 text-right'frt>>" +
        "<'row '<'col-sm-12 overflow-auto w-100'tr>>" +
        "<'row '<'col-sm-5'i><'col-sm-7'p>>",
      buttons: ['copy', 'print', 'excel'],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', '.dropdown-item', (e) => {
          const buttonId = e.target.id;
          if (buttonId === 'retry') {
            this.retryTransaction(data);
          }
        });
        return row;
      },
    };
  }

  retryTransaction(data: any) {
    this.transactionsService.retryTransaction(data.transaction_id).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log('retry transactions');
  }
}
