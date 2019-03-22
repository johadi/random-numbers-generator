import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import { GenerateNumbersFormComponent } from './generate-numbers-form.component';
import {NumbersDisplaySectionComponent} from '../numbers-display-section/numbers-display-section.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('GenerateNumbersFormComponent', () => {
  let component: GenerateNumbersFormComponent;
  let fixture: ComponentFixture<GenerateNumbersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateNumbersFormComponent, NumbersDisplaySectionComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule,
        MatListModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateNumbersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When valid numbers are generated', () => {
    beforeEach(() => {
      component.generateNumberForm.patchValue({
        rounds: 20
      });

      spyOn(component, 'generateNumbers').and.callThrough();

      fixture.debugElement
        .query(By.css('#generate-numbers-btn'))
        .triggerEventHandler('click', null);
      fixture.detectChanges();
    });

    it('checks if phone numbers are generated', () => {
      expect(component.generateNumbers).toHaveBeenCalled();
      expect(component.phoneNumbers.length).toBe(20);
    });
  });

  describe('When user does not fill how many phone numbers they want to generate', () => {
    beforeEach(() => {
      component.generateNumberForm.patchValue({
        rounds: ''
      });

      spyOn(component, 'showErrorToastr').and.callThrough();

      fixture.debugElement
        .query(By.css('#generate-numbers-btn'))
        .triggerEventHandler('click', null);
      fixture.detectChanges();
    });

    it('should call the handle error method with relevant message', () => {
      expect(component.showErrorToastr).toHaveBeenCalledWith('You must enter how many phone numbers you want to generate!');
    });

    it('should not generate any number', () => {
      expect(component.phoneNumbers.length).toBe(0);
    });
  });

  describe('When user fill the value of how many phone numbers to generate with non-integer', () => {
    beforeEach(() => {
      component.generateNumberForm.patchValue({
        rounds: 'xyz'
      });

      spyOn(component, 'showErrorToastr').and.callThrough();

      fixture.debugElement
        .query(By.css('#generate-numbers-btn'))
        .triggerEventHandler('click', null);
      fixture.detectChanges();
    });

    it('should call the handle error method with relevant message', () => {
      expect(component.showErrorToastr).toHaveBeenCalledWith('Value must be a number');
    });

    it('should not generate any number', () => {
      expect(component.phoneNumbers.length).toBe(0);
    });
  });

  describe('When user fill the value of how many phone numbers to generate with value greater than 10000', () => {
    beforeEach(() => {
      component.generateNumberForm.patchValue({
        rounds: 200000
      });

      spyOn(component, 'showErrorToastr').and.callThrough();

      fixture.debugElement
        .query(By.css('#generate-numbers-btn'))
        .triggerEventHandler('click', null);
      fixture.detectChanges();
    });

    it('should call the handle error method with relevant message', () => {
      expect(component.showErrorToastr).toHaveBeenCalledWith('Value must not be greater than 10000');
    });

    it('should not generate any number', () => {
      expect(component.phoneNumbers.length).toBe(0);
    });
  });

  describe('When user sorts phone numbers in ascending order', () => {
    beforeEach(() => {
      spyOn(component, 'handleSort').and.callThrough();
      component.handleSortChanges();
      component.phoneNumbers = [3, 5, 2, 4];
      component.generateNumberForm.patchValue({ sort: 'asc' });
      fixture.detectChanges();
    });

    it('should call the handle sort method with asc', () => {
      expect(component.handleSort).toHaveBeenCalledWith('asc');
    });

    it('should sort the phone numbers in ascending order', () => {
      expect(component.phoneNumbers).toEqual([2, 3, 4, 5]);
    });
  });

  describe('When user sorts phone numbers in descending order', () => {
    beforeEach(() => {
      spyOn(component, 'handleSort').and.callThrough();
      component.handleSortChanges();
      component.phoneNumbers = [3, 5, 2, 4];
      component.generateNumberForm.patchValue({ sort: 'desc' });
      fixture.detectChanges();
    });

    it('should call the handle sort method with desc', () => {
      expect(component.handleSort).toHaveBeenCalledWith('desc');
    });

    it('should sort the phone numbers in descending order', () => {
      expect(component.phoneNumbers).toEqual([5, 4, 3, 2]);
    });
  });
});
