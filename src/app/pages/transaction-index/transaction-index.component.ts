import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';
import Swal from 'sweetalert2';
// declare var $;

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
  showReq: boolean = false;
  params: any;
  submitted: boolean = false;

  allClients = { id: 0, name: 'All Clients' };

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder
  ) {}

  clientForm = this.fb.group({
    client: new FormControl('All Clients', Validators.required),
    date_from: new FormControl('', Validators.required),
    date_to: new FormControl('', Validators.required),
  });

  requeryForm = this.fb.group({
    date_from: new FormControl('', Validators.required),
    date_to: new FormControl('', Validators.required),
    schedule_id: new FormControl('', Validators.required),
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
        // { data: 'action' },
        {
          defaultContent: `
                      <div class="btn-group" role="group">
                         <button type="button" class="btn btn-primary dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                         <ul class="dropdown-menu">
                             <li><button type="button" (click)="viewDetails(client)" id="viewDetails" class="dropdown-item" href="#">View Details</button></li>
                         </ul>
                      </div>
          `,
        },
      ],
      dom:
        "<'row '<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4 text-right'frt>>" +
        "<'row '<'col-sm-12 overflow-auto w-100'tr>>" +
        "<'row '<'col-sm-5'i><'col-sm-7'p>>",
      buttons: ['copy', 'print', 'excel'],
      // initComplete: (settings:any, json:any) => {
      //   alert('Datatables');
      // },
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', '.dropdown-item', (e) => {
          const buttonId = e.target.id;
          if (buttonId === 'viewDetails') {
            this.showTransactions(data);
          }
        });
        return row;
      },
    };

    console.log(this.dtOptions);
    this.getClients();
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
    localStorage.setItem('scheduleId', transaction.schedule_id);
    this.router.navigateByUrl('index/transactions/details');
  }
  showSubTransactions() {
    console.log('sub transactions');
  }
  showRequery() {
    this.showReq = true;
  }
  closeDialog() {
    this.showReq = false;
    this.requeryForm.reset()
  }
  requery() {
    this.submitted = true
    let subForm = this.requeryForm.value;
    if (!subForm.schedule_id) {
      if (!this.requeryForm.value.date_to) {
        this.params = '?date_from=' + subForm.date_from;
      } else {
        this.params = `?date_from=${subForm.date_from}&date_to=${subForm.date_to}`;
      }
    } else if (!subForm.date_from) {
      this.params = '?schedule_id=' + subForm.schedule_id;
    } else {
      this.params = `?schedule_id=${subForm.schedule_id}&date_from=${subForm.date_from}&date_to=${subForm.date_to}`;
    }
    console.log(this.params);

    this.transactionsService.transactionRequery(this.params).subscribe({
      next: (res) => {
        this.requeryForm.reset();
        console.log(res);
        this.submitted = false
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout( () => this.showReq=false, 2000 )
      },
      error: (err) => {
        this.requeryForm.reset();
        console.log(err);
        this.submitted = false
        Swal.fire({
          title: err.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout( () => (this.showReq = false), 2000 );

      },
    });
  }

  onChange() {
    this.selectedClient = this.clientForm.value.client;
  }

  onDateChange() {
    this.dateChanged = true;
  }

  disableSubmit(newForm: any, newItem: any): boolean {
    const noneValid =
      !newItem && !newForm.value.date_from && !newForm.value.date_to;
    if (noneValid) {
      return true;
    }
    if (newForm.dirty) {
      if (noneValid) {
        return true;
      }
    } else if (newForm.pristine) {
      return true;
    }
    if (!newForm.value.date_from && newForm.value.date_to) {
      return true;
    }
    return false;
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
