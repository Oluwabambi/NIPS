import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment as env } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs'; 
declare const $: any;

class DataTablesResponse {
  data!: any[];
  draw!: number;
  recordsFiltered!: number;
  recordsTotal!: number;
}

@Component({
  selector: 'app-client-index',
  templateUrl: 'client-index.component.html',
  styleUrls: ['client-index.component.css'],
})
export class ClientIndexComponent implements OnInit {
  toggled: boolean = false;
  submitted: boolean = false;
  showAdd: boolean = false;
  dtOptions: any = {};
  persons: any = [];
  pageable: any;
  showing: boolean = false;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();

  constructor(
    private http: HttpClient,
    private clientsService: ClientsService,
    private fb: FormBuilder
  ) {}

  clientForm = this.fb.group({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z0-9 ]+[A-Za-z0-9 ]*'),
    ]),
  });

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: {
        url: env.API_URL + env.API_VERSION + '/' + env.CLIENTS,
        type: 'POST',
        contentType: 'application/json',
        dataFilter: (resp: any) => {
          let json = JSON.parse(resp);
          // json.recordsTotal = json.recordsTotal;
          // json.recordsFiltered = json.recordsFiltered;
          // json.data = json.data;
          // this.persons = json.data;

          console.log(JSON.parse(resp));

          console.log('The received data from server: ', resp);
          return JSON.stringify(json); // return JSON string
        },
      },
      columns: [
        { data: 'sno' },
        { data: 'number_of_accounts_profiled' },
        { data: 'name' },
        { data: 'is_active' },
        { data: 'created_at' },
      ],
      // dom: "lBf<'overflow-auto w-100't>rip",
      dom:
        "<'row '<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4 text-right'frt>>" +
        "<'row '<'col-sm-12 overflow-auto w-100'tr>>" +
        "<'row '<'col-sm-5'i><'col-sm-7'p>>",
      buttons: {
        buttons: [
          'copy',
          'print',
          'excel'
        ]
      }
    };
  }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next(true);
  //   });
  // }

  storeClient() {
    this.submitted = true;
    this.clientsService.storeClient(this.clientForm.value).subscribe({
      next: (res) => {
        const modal: any = document.getElementById('clientModal');
        modal.style.display = 'none';
        this.submitted = false;
        console.log(res);
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          this.clientForm.reset();
          this.showAdd = false;
        }, 2000);
      },
    });
  }

  closeDialog() {
    this.clientForm.reset();
    this.showAdd = false;
  }
}
