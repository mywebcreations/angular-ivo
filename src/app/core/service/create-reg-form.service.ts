import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationData } from '../model/registration-data';

@Injectable({
  providedIn: 'root',
})
export class CreateRegFormService {
  registrationForm!: FormGroup;
  registrationForm2!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  getRegistrationForm(comp: string, formData: RegistrationData | null) {
    switch (comp) {
      case 'RegistrationComponent':
        this.registrationForm = this.formBuilder.group({
          name: ['', Validators.required],
          telephone: ['', Validators.required],
          email: ['', Validators.required],
          gender: ['', Validators.required],
          comingWithOthers: ['', Validators.required],
          howMany: ['', Validators.required],
          countOnYouYes: ['', Validators.required],
          countOnYouNo: ['', Validators.required],
        });
        this.registrationForm2 = this.formBuilder.group({
          name: ['', Validators.required],
          telephone: [''],
          email: [''],
          gender: [''],
          comingWithOthers: [''],
          howMany: [''],
          countOnYouYes: ['', Validators.required],
          countOnYouNo: ['', Validators.required],
        });
        break;
      case 'EditRegistrationComponent':
        // console.log(formData?.comingWithOthers);

        this.registrationForm = this.formBuilder.group({
          name: [formData?.name, Validators.required],
          telephone: [formData?.telephone, Validators.required],
          email: [formData?.email, Validators.required],
          gender: [formData?.gender, Validators.required],
          comingWithOthers: [formData?.comingWithOthers, Validators.required],
          howMany: [formData?.howMany, Validators.required],
          countOnYouYes: [formData?.countOnYouYes, Validators.required],
          countOnYouNo: [formData?.countOnYouNo, Validators.required],
        });
        this.registrationForm2 = this.formBuilder.group({
          name: [formData?.name, Validators.required],
          telephone: [formData?.telephone],
          email: [formData?.email],
          gender: [formData?.gender],
          comingWithOthers: [formData?.comingWithOthers],
          howMany: [formData?.howMany],
          countOnYouYes: [formData?.countOnYouYes, Validators.required],
          countOnYouNo: [formData?.countOnYouNo, Validators.required],
        });
        break;
    }
  }
}
