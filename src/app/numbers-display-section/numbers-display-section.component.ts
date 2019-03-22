import {Component, Input, OnInit} from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-numbers-display-section',
  templateUrl: './numbers-display-section.component.html',
  styleUrls: ['./numbers-display-section.component.css']
})
export class NumbersDisplaySectionComponent implements OnInit {

  @Input() minPhoneNumber;
  @Input() maxPhoneNumber;
  @Input() phoneNumbers = [];
  @Input() generateNumberForm;

  constructor() { }

  ngOnInit() {
  }

  exportPhoneNumbers() {
    if (this.phoneNumbers.length > 0) {
      saveAs(new Blob(this.phoneNumbers, { type: 'text/csv;charset=utf-8' }), 'phone_numbers.csv');
    }
  }
}
