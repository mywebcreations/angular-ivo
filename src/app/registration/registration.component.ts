import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateRegFormService } from '../core/service/create-reg-form.service';
import { RegistrationService } from '../core/service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnChanges, OnInit {
  registrationForm!: FormGroup;
  registrationForm2!: FormGroup;

  // Registration forms for edit-registration component
  
  @Input() EditRegistrationForm!: FormGroup;
  @Input() EditRegistrationForm2!: FormGroup;
  @Input() userId!: string;
  
  comingAlone: Array<string> = [
    'Please select',
    'Just myself',
    "I'm bringing some colleagues",
  ];
  showForm1: boolean = true;
  showForm2: boolean = false;
  showHowManyColleagues: boolean = false;
  selectedOption: string = 'Please select';
  showWhoIsComingWithYou: boolean = true;
  countOnYouYes: string = 'Yes';
  countOnYouNo: string = '';

  // @Input() registration$!: Observable<RegistrationData>;

  constructor(
    private regForm: CreateRegFormService,
    private registrationService: RegistrationService,
  ) {}

  ngOnChanges(): void {
    this.regForm.getRegistrationForm('RegistrationComponent', null);
    if (this.EditRegistrationForm === undefined) {
      this.registrationForm = this.regForm.registrationForm;
    } else {
      this.registrationForm = this.EditRegistrationForm;
    }

    if (this.EditRegistrationForm2 === undefined) {
      this.registrationForm2 = this.regForm.registrationForm2;
    } else {
      this.registrationForm2 = this.EditRegistrationForm2;
    }
    console.log(`EditRegistrationForm: ${this.EditRegistrationForm}`);
    console.log(`EditRegistrationForm2: ${this.EditRegistrationForm2}`);
    console.log(this.userId);
  }

  ngOnInit(): void {
    // alert(
    //   "On the form page, click the 'No' button If you don't see user data displayed; this will be because user chose 'No'"
    // );
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
    this.selectedOption == "I'm bringing some colleagues" ? (this.showHowManyColleagues = true) : (this.showHowManyColleagues = false);
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
    const id = this.userId
      ? this.userId
      : Math.floor(1000 + Math.random() * 9000);
    const formData =
      this.countOnYouYes == 'Yes'
        ? this.registrationForm.value
        : this.registrationForm2.value; //choose form based on Yes/No choice
    formData['id'] = id.toString();
    formData['countOnYouYes'] = this.countOnYouYes;
    formData['countOnYouNo'] = this.countOnYouNo;
    // console.log(formData);
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
}
