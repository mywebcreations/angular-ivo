import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { CreateRegFormService } from '../core/service/create-reg-form.service';
import { RegistrationService } from '../core/service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  registrationForm2!: FormGroup;
  userId!: string;

  // Registration forms for edit-registration component
  editRegistrationForm$ = this.regForm.editRegistrationForm$;
  editRegistrationForm2$ = this.regForm.editRegistrationForm2$;

  userId$ = this.registrationService.userId$;
  
  comingAlone: Array<string> = [
    'Please select',
    'Just myself',
    "I'm bringing some colleagues",
  ];
  showForm1: boolean = true;
  showForm2: boolean = false;
  showHowManyColleagues: boolean = false;
  displayInputField: string = 'displayNone'; //css class to be toggled by controlHowManyColleagesField method.
  selectedOption: string = 'Please select';
  showWhoIsComingWithYou: boolean = true;
  countOnYouYes: string = 'Yes';
  countOnYouNo: string = '';

  subs = new SubSink();

  constructor(
    private regForm: CreateRegFormService,
    private registrationService: RegistrationService,
  ) {}

  // ngOnChanges(): void {
  // }

  ngOnInit(): void {
    // alert(
    //   "On the form page, click the 'No' button If you don't see user data displayed; this will be because user chose 'No'"
    // );
    // this.regForm.getRegistrationForm('RegistrationComponent', null);
    let editRegistrationForm;
    let editRegistrationForm2;
    let userId;
    this.subs.add(
      this.editRegistrationForm$.pipe(
          catchError(async (error) => console.log('Caught Error', error)) 
      ).subscribe(
        (form) => editRegistrationForm = form,
        (error) => console.log(error)
      )
    );
    this.subs.add(
      this.editRegistrationForm2$.pipe(
        catchError(async (error) => console.log('Caught Error', error)) 
      ).subscribe(
        (form) => editRegistrationForm2 = form,
        (error) => console.log(error)
      )
    );
    this.subs.add(
      this.userId$.pipe(
        catchError(async (error) => console.log('Caught Error', error)) 
      ).subscribe(
        (id) => userId = id,
        (error) => console.log(error)
      )
    );

    if (editRegistrationForm === undefined) {
      this.registrationForm = this.regForm.registrationForm;
    } else {
      this.registrationForm = editRegistrationForm;
    }

    if (editRegistrationForm2 === undefined) {
      this.registrationForm2 = this.regForm.registrationForm2;
    } else {
      this.registrationForm2 = editRegistrationForm2;
    }
    this.userId = userId;
    console.log(`EditRegistrationForm: ${editRegistrationForm}`);
    console.log(`EditRegistrationForm2: ${editRegistrationForm2}`);
    console.log(`RegistrationForm: ${this.registrationForm}`);
    console.log(`RegistrationForm2: ${this.registrationForm2}`);
    console.log(this.userId);

  }

  processYesChoice(): void {
    this.showForm1 = true;
    this.showForm2 = false;
    this.countOnYouYes = 'Yes';
    this.countOnYouNo = '';
  }
  processNoChoice(): void {
    this.showForm1 = false;
    this.showForm2 = true;
    this.showWhoIsComingWithYou = false;
    this.countOnYouYes = '';
    this.countOnYouNo = 'No';
  }

  controlHowManyColleagesField() {
    if (this.selectedOption == "I'm bringing some colleagues") {
      this.showHowManyColleagues = true;
      this.displayInputField = 'displayInlineBlock';
    } else {
      this.showHowManyColleagues = false
    }
  }

  // saveData() {
  //   // const valueChanges$ = this.registrationForm.valueChanges;
  //   const formValue$: Observable<RegistrationData> = of(this.registrationForm.value);
  //   console.log(formValue$);
  //   formValue$.pipe(
  //       map((formValue: RegistrationData) => this.registrationService.saveRegistration(formValue)),
  //       catchError(errors => of(errors)),
  //       tap(result=>this.saveSuccess(result))
  //   );
  // }

  saveData() {
    const formSubmitted =
      this.countOnYouYes == 'Yes'
        ? this.registrationForm
        : this.registrationForm2; //choose form based on Yes/No choice

    if (formSubmitted.invalid) {
      formSubmitted.markAllAsTouched();
      return;
    }

    const formData = formSubmitted.value;
    const id = this.userId
      ? this.userId
      : Math.floor(1000 + Math.random() * 9000);
    
    formData['id'] = id.toString();
    formData['countOnYouYes'] = this.countOnYouYes;
    formData['countOnYouNo'] = this.countOnYouNo;

    if(formData['comingWithOthers'] != "I'm bringing some colleagues") {
      formData['howMany'] = 0;
    }

    console.log(formData);
    this.registrationService.saveRegistration(formData, this.userId).subscribe(
      (response) => this.saveSuccess(response, formData['id']),
      (error) => console.log(error)
    );
    // window.location.reload();
  }

  saveSuccess(result: any, id: number) {
    console.log(result);
    alert(
      `Thank you for registring for our event. You can review your registration at this url:
      http://127.0.0.1:4200/registration/${id}.`
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
