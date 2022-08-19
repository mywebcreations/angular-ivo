import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RegistrationData } from '../model/registration-data';

@Injectable({
  providedIn: 'root',
})

/*
 * When the RegistrationComponent opens or runs, there is a call to this service to produce
 * the registration forms. These are two empty forms contained in class properties.
 * When the EditRegistrationComponent opens or runs, two major things happens:
 * 1) The EditRegistrationComponent class gets the saved registration data of the user.
 * 2) It navigates to the RegistrationComponent, and changes (or pupulates) the empty registration forms
 *    with the saved user data.
 * The great advantage of this approach is that the RegistrationComponent is both used for new registrations 
 * and also to modify user registration.
 */
export class CreateRegFormService {
  registrationForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', Validators.required],
    gender: ['', Validators.required],
    comingWithOthers: ['', Validators.required],
    howMany: ['0', Validators.required],
    countOnYouYes: [''],
    countOnYouNo: [''],
  });
  registrationForm2: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    telephone: [''],
    email: [''],
    gender: [''],
    comingWithOthers: [''],
    howMany: ['0'],
    countOnYouYes: [''],
    countOnYouNo: [''],
  });
  private editRegistrationForm = new BehaviorSubject(this.registrationForm);
  editRegistrationForm$ = this.editRegistrationForm.asObservable();
  private editRegistrationForm2 = new BehaviorSubject(this.registrationForm2);
  editRegistrationForm2$ = this.editRegistrationForm2.asObservable();

  constructor(private formBuilder: FormBuilder) {}

  updateEditRegistrationForm(formData: RegistrationData): void {
    this.editRegistrationForm.next(
      this.formBuilder.group({
        name: [formData?.name, Validators.required],
        telephone: [formData?.telephone, Validators.required],
        email: [formData?.email, Validators.required],
        gender: [formData?.gender, Validators.required],
        comingWithOthers: [formData?.comingWithOthers, Validators.required],
        howMany: [formData?.howMany, Validators.required],
        countOnYouYes: [formData?.countOnYouYes],
        countOnYouNo: [formData?.countOnYouNo]
      })
    )
  }
  
  updateEditRegistrationForm2(formData: RegistrationData): void {
    this.editRegistrationForm2.next(
      this.formBuilder.group({
        name: [formData?.name, Validators.required],
        telephone: [formData?.telephone],
        email: [formData?.email],
        gender: [formData?.gender],
        comingWithOthers: [formData?.comingWithOthers],
        howMany: [formData?.howMany],
        countOnYouYes: [formData?.countOnYouYes],
        countOnYouNo: [formData?.countOnYouNo],
      })
    )
  }
}
