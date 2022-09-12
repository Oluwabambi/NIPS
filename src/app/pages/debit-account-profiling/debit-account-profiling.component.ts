import { Component, OnInit, Input } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-debit-account-profiling',
  templateUrl: './debit-account-profiling.component.html',
  styleUrls: ['./debit-account-profiling.component.css'],
})
export class DebitAccountProfilingComponent implements OnInit {
  selectedBank?: number;
  selectedClient?: number;
  accountProfile: any = {};
  banks: any = [];
  clients: any = [];
  addedFile: any;
  sendInfo: any;
  files: File[] = [];
  toAdd: boolean = false;
  addFiles: boolean = false;
  addAccounts: boolean = false;
  submitted: boolean = false;

  constructor(
    private accountsService: AccountsService,
    private fb: FormBuilder,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.form;
    this.getClients();
    this.getBanks();
  }

  cForm = this.fb.group({
    client_id: new FormControl('', Validators.required),
  });

  accountForm = new FormGroup({
    mandate_ref: new FormControl('', Validators.required),
    account_number: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('[0-9]+'),
    ]),
    bank_code: new FormControl(this.selectedBank, Validators.required),
    // client_id: new FormControl(this.selectedClient, Validators.required),
  });

  form = this.fb.group({
    arrayData: this.fb.array([this.accountForm]),
  });

  get arrayData(): FormArray {
    return this.form.controls['arrayData'] as FormArray;
  }

  addForm() {
    const form = new FormGroup({
      mandate_ref: new FormControl('', Validators.required),
      account_number: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      bank_code: new FormControl(this.selectedBank, Validators.required),
      // client_id: new FormControl(this.selectedClient, Validators.required),
    });
    // this.selectedBank = this.selectedClient = undefined;
    this.arrayData.push(form);
  }

  submit() {
    console.log(this.form.value);
    const formValue = this.form.value.arrayData as any[];
    const data = {
      mandate_ref: formValue.map((value) => value.mandate_ref),
      account_number: formValue.map((value) => value.account_number),
      bank_code: formValue.map((value) => value.bank_code),
      // client_id: formValue.map((value) => value.client_id),
    };
    console.log(data);
    this.debitAccountProfiling(data);
  }

  delete(index: number) {
    this.arrayData.removeAt(index);
  }

  debitAccountProfiling(data: any) {
    this.submitted = true;
    this.accountProfile = {
      client_id: this.cForm.value.client_id,
      ...data,
    };

    console.log(this.accountProfile);

    // mandate_ref, account_num and bank_code in a form
    // they all take inputs
    // on add,
    this.accountsService
      .debitAccountProfiling(JSON.stringify(this.accountProfile))
      .subscribe({
        next: (res) => {
          this.submitted = false;
          console.log(res);
          this.addAccounts = false;
          this.accountForm.reset();
          while (this.arrayData.length != 1) {
            this.arrayData.removeAt(this.arrayData.length - 1);
          }
          Swal.fire({
            title: res.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            this.addFiles = false;
          }, 2000);
        },
      });
  }

  getClients() {
    this.clientsService.clients().subscribe({
      next: (res) => {
        this.clients = res.data;
      },
    });
  }

  getBanks() {
    this.accountsService.banks().subscribe({
      next: (res) => {
        this.banks = res.data;
      },
    });
  }

  sendData() {
    this.submitted = true
    this.sendInfo.append('client_id', this.selectedClient);

    this.accountsService.debitBulkAccountProfiling(this.sendInfo).subscribe({
      next: (res) => {
        this.submitted = false
        console.log(res);
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          this.addFiles = false;
        }, 2000);
      },
    });
  }

  onSelect(event: any) {
    console.log(event);
    this.addedFile = event.addedFiles[0];
    this.files.push(...event.addedFiles);
    this.sendInfo = new FormData();
    this.sendInfo.append('list', this.addedFile);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  closeDialog() {
    this.cForm.reset();
    this.accountForm.reset();
    this.addAccounts = this.addFiles = false;
    while (this.arrayData.length != 1) {
      this.arrayData.removeAt(this.arrayData.length - 1);
    }
  }
}
