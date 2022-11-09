import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment as env } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs'; 
import { Router } from '@angular/router';
import * as $ from 'jquery';


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
export class ClientIndexComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  toggled: boolean = false;
  submitted: boolean = false;
  showAdd: boolean = false;
  showEdit: boolean = false;
  persons: any;
  dtOptions: any = {};
  clients: any = [];
  clientsList: any = [];
  pageable: any;
  showing: boolean = false;
  allClients: any = { id: 0, name: 'All Clients' };
  selectedClient: any = 'All Clients';
  clientToEdit: any;

  dtTrigger: any = new Subject();

  constructor(
    private http: HttpClient,
    private clientsService: ClientsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  clientForm = this.fb.group({
    name: new FormControl('All Clients', [
      Validators.required,
      Validators.pattern('[A-Za-z0-9 ]+[A-Za-z0-9 ]*'),
    ]),
  });

  addClientForm = this.fb.group({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z0-9 ]+[A-Za-z0-9 ]*'),
    ]),
  });

  editClientForm!: FormGroup;

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      destroy: true,
      columns: [
        { data: 'sno' },
        { data: 'number_of_accounts_profiled' },
        { data: 'name' },
        { data: 'is_active' },
        { data: 'created_at' },
        { data: 'action' },
      ],
      ajax: {
        url: `${env.API_URL}${env.API_VERSION}/${env.CLIENTS}`,
        type: 'POST',
        contentType: 'application/json',
        dataFilter: (resp: any) => {
          let json = JSON.parse(resp);

          console.log('The received data from server: ', json);
          return JSON.stringify(json); // return JSON string
        },
      },
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('td', row).off('click');
        $('td', row).on('click', '.dropdown-item', (e) => {
          const buttonId = e.target.id;
          if (buttonId === 'toggleStatus') {
            this.toggleStatus(data);
          } else if (buttonId === 'editClient') {
            this.editClient(data);
          } else if (buttonId === 'viewAccounts') {
            this.viewAccounts(data);
          }
        });
        return row;
      },
      dom:
        "<'row '<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4 text-right'frt>>" +
        "<'row '<'col-sm-12 overflow-auto w-100'tr>>" +
        "<'row '<'col-sm-5'i><'col-sm-7'p>>",
      buttons: {
        buttons: ['copy', 'print', 'excel'],
      },
    };

    this.getClients();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(true);
  }

  ngOnDestroy(): void {
    // unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      setTimeout(() => {
        this.dtTrigger.next(true);
      }, 400);
    });
  }

  getClients() {
    this.clientsService.clients().subscribe({
      next: (res) => {
        this.clientsList = res.data;
        this.clientsList.unshift(this.allClients);
        console.log(this.clientsList);
      },
    });
  }

  storeClient() {
    this.submitted = true;
    this.clientsService.storeClient(this.addClientForm.value).subscribe({
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
          this.addClientForm.reset();
          this.showAdd = false;
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        this.submitted = false;
      }
    });
  }

  closeDialog() {
    this.addClientForm.reset();
    this.showAdd = false;
    this.showEdit = false;
  }

  viewAccounts(client: any) {
    console.log(client.id);
    localStorage.setItem('clientId', client.id);
    this.router.navigateByUrl('/index/client/accounts');
  }

  editClient(client: any) {
    console.log('name', client.name);
    this.clientToEdit = client
    this.editClientForm = this.fb.group({
      name: new FormControl(client.name, [
        Validators.required,
        Validators.pattern('[A-Za-z0-9 ]+[A-Za-z0-9 ]*'),
      ]),
    });
    this.showEdit = true;
  }

  updateClient() {
    this.submitted = true;
    this.clientsService.updateClient(this.editClientForm.value, this.clientToEdit.id).subscribe({
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
          this.showEdit = false;
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        this.submitted = false;
      },
    });
  }

  toggleStatus(client: any) {
    let clientStatus = { status: client.is_active };
    console.log('status', typeof client.is_active, client.is_active);
    clientStatus.status = client.is_active === 'active' ? 'inactive' : 'active';
    this.clientsService.clientStatusToggle(clientStatus, client.id).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          this.addClientForm.reset();
          this.showAdd = false;
        }, 2000);
        this.rerender();
      },
    });
  }

  onChange() {
    this.selectedClient = this.clientForm.value.name;
    console.log(this.selectedClient);
  }

  disableForm() {
    
  }

  dateChange(date: any) {
    console.log(date);
  }

  filter() {
    const selectedClient: any = this.clientForm.value.name;
    localStorage.setItem('filteredClient', selectedClient);
    console.log(selectedClient);

    this.router.navigateByUrl('/index/clients/filter');
  }
}
