import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

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
  dtOptions: any = {};
  persons: any = [];
  perso: any = [];

  pageable: any;

  constructor(private http: HttpClient, private clientsService: ClientsService, private fb: FormBuilder ) {}

  clientForm = this.fb.group({
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: {
        url: 'http://102.68.170.27/nip-mini/public/index.php/api/v1/clients/datatable',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
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
        { data: 'id' },
        { data: 'number_of_accounts_profiled' },
        { data: 'name' },
        { data: 'unique_id' },
        { data: 'is_active' },
        { data: 'created_at' },
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

  storeClient() {
    this.submitted = true;
    this.clientsService.storeClient(this.clientForm.value).subscribe({
      next: (res) => {
        // this.dtOptions.ajax.reload();
        this.submitted = true;
        console.log(res);
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          this.clientForm.reset();
        }, 2000);
      },
    });
  }
}
