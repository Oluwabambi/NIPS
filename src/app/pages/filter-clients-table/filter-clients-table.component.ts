import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-filter-clients-table',
  templateUrl: './filter-clients-table.component.html',
  styleUrls: ['./filter-clients-table.component.css'],
})
export class FilterClientsTableComponent implements OnInit {
  dtOptions: any = {};
  clients: any = [];
  scheduleId: any;
  selectedClient: any = localStorage.getItem('filteredClient')

  constructor() {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: {
        url: env.API_URL + env.API_VERSION + '/' + env.CLIENTS + '?name=' + this.selectedClient,
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
        { data: 'number_of_accounts_profiled' },
        { data: 'name' },
        { data: 'is_active' },
        { data: 'created_at' },
        { data: 'action' },
      ],
      // dom: 'lBftrip',
      dom:
        "<'row '<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4 text-right'frt>>" +
        "<'row '<'col-sm-12 overflow-auto w-100'tr>>" +
        "<'row '<'col-sm-5'i><'col-sm-7'p>>",
      buttons: ['copy', 'print', 'excel'],
    };
  }
}
