import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-index',
  templateUrl: './transaction-index.component.html',
  styleUrls: ['./transaction-index.component.css'],
})
export class TransactionIndexComponent implements OnInit {
  dtOptions: any = {};
  transactions: any = [];
  clients: any = [];
  selectedClient: any = 'All Clients';
  dateChanged: any;

  allClients = { id: 0, name: 'All Clients' };

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private fb: FormBuilder
  ) {}

  clientForm = this.fb.group({
    client: new FormControl('All Clients', Validators.required),
    date_from: new FormControl('', Validators.required),
    date_to: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    // var table = $('#dTable').DataTable();
    // console.log('new table', table);

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: {
        url: env.API_URL + env.API_VERSION + '/' + env.TRANSACTIONS,
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
        { data: 'action' },
        // { data: 'response_code_meaning' },
      ],
      // dom: "lBf<'overflow-auto w-100't>rip",
      dom:
        "<'row '<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4 text-right'frt>>" +
        "<'row '<'col-sm-12 overflow-auto w-100'tr>>" +
        "<'row '<'col-sm-5'i><'col-sm-7'p>>",
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        'copy',
        'print',
        'excel',
      ],
      // rowCallback: (row: Node, data: any[] | Object, index: number) => {
      //   const self = this;
      //   // Unbind first in order to avoid any duplicate handler
      //   // (see https://github.com/l-lin/angular-datatables/issues/87)
      //   // Note: In newer jQuery v3 versions, `unbind` and `bind` are
      //   // deprecated in favor of `off` and `on`
      //   $('td', row).off('click');
      //   $('td', row).on('click', () => {
      //     self.someClickHandler(data);
      //   });
      //   return row;
      // },
    };

    console.log(this.dtOptions);
    this.getClients();
  }

  someClickHandler(info: any): void {
    // alert(info.client__dot__name + ' - ' + info.sno);
    localStorage.setItem('scheduleId', info.schedule_id);
    this.router.navigateByUrl('index/transactions/details');
  }

  getClients() {
    this.clientsService.clients().subscribe({
      next: (res) => {
        this.clients = res.data;
        this.clients.unshift(this.allClients);
        console.log(this.clients);
      },
    });
  }

  showTransactions(transaction: any) {
    console.log('clicked', transaction);
  }
  showSubTransactions(transaction: any) {
    console.log('clicked', transaction);
  }
  retryTransaction(transaction: any) {
    console.log('clicked', transaction);
  }

  onChange() {
    this.selectedClient = this.clientForm.value.client;
  }

  onDateChange() {
    this.dateChanged = true;
  }

  filter() {
    console.log(this.clientForm.value);
    const selectedClient: any = this.clientForm.value.client;
    const selectedFilter = JSON.stringify(this.clientForm.value);
    localStorage.setItem('selectedFilters', selectedFilter);
    localStorage.setItem('clientToFilter', selectedClient);

    this.router.navigateByUrl('/index/transactions/filter');
  }
}
