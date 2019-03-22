import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generate-numbers-form',
  templateUrl: './generate-numbers-form.component.html',
  styleUrls: ['./generate-numbers-form.component.css']
})
export class GenerateNumbersFormComponent implements OnInit {

  generateNumberForm: FormGroup;
  private defaultRounds = 1;
  phoneNumbers: any[] = [];
  minPhoneNumber: string;
  maxPhoneNumber: string;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.generateNumberForm = this.formBuilder.group({
      rounds: [''],
      sort: ['']
    });
    this.handleSortChanges();
  }

  generateNumbers() {
    if (!this.generateNumberForm.value.rounds) {
      return this.showErrorToastr('You must enter how many phone numbers you want to generate!');
    }

    const rounds = parseInt(this.generateNumberForm.value.rounds, 10);

    if (isNaN(rounds)) {
      return this.showErrorToastr('Value must be a number');
    }

    if (rounds > 10000) {
      return this.showErrorToastr('Value must not be greater than 10000');
    }

    const phoneNumbers: Set<string> = new Set<string>();
    while (phoneNumbers.size !== rounds) {
      const randomPhoneNumber = '0' + Math.floor(Math.random() * 900000000  + 100000000);
      phoneNumbers.add(randomPhoneNumber);
    }

    this.phoneNumbers = [...phoneNumbers];
    const phoneNumbersLength = this.phoneNumbers.length;
    this.generateNumberForm.patchValue({ rounds: '', sort: '' })
    this.handleMaxPhoneNumber();
    this.handleMinPhoneNumber();
    this.showSuccessToastr(`${phoneNumbersLength} phone number${phoneNumbersLength === 1 ? '' : 's'} generated`);
  }

  handleMinPhoneNumber() {
    if (this.phoneNumbers.length > 0) {
      this.minPhoneNumber = '0' + Math.min(...this.phoneNumbers);
    }
  }

  handleMaxPhoneNumber() {
    if (this.phoneNumbers.length > 0) {
      this.maxPhoneNumber = '0' + Math.max(...this.phoneNumbers);
    }
  }

  handleSort(order: 'asc'|'desc') {
    if (this.phoneNumbers.length > 0 && order) {
      if (order === 'asc') {
        this.phoneNumbers.sort((a, b) => a - b);
      }

      if (order ===  'desc') {
        this.phoneNumbers.sort((a, b) => b - a);
      }
    }
  }

  handleSortChanges() {
    this.generateNumberForm.get('sort').valueChanges
      .subscribe((value) => {
        this.handleSort(value);
      });
  }

  showSuccessToastr(message) {
    this.toastr.success(message, 'Success!');
  }

  showErrorToastr(message) {
    this.toastr.error(message, 'Failed!');
  }
}
