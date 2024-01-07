import {NgTemplateOutlet, TitleCasePipe, UpperCasePipe} from '@angular/common';
import {Component, effect, signal, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import BigNumber from 'bignumber.js';
import {ButtonFlatComponent} from '../../features/button-flat/button-flat.component';
import {ButtonComponent} from '../../features/button/button.component';
import {InputComponent} from '../../features/input/input.component';
import {StepComponent} from '../../features/stepper/components/step/step.component';
import {StepperHeaderComponent} from '../../features/stepper/components/stepper-header/stepper-header.component';
import {StepperComponent} from '../../features/stepper/components/stepper/stepper.component';
import {StepsComponent} from '../../features/stepper/components/steps/steps.component';
import {StepActionsDirective} from '../../features/stepper/directives/step-actions.directive';
import {StepLabelDirective} from '../../features/stepper/directives/step-label.directive';
import {StepperNextDirective} from '../../features/stepper/directives/stepper-next.directive';
import {StepperPreviousDirective} from '../../features/stepper/directives/stepper-previous.directive';
import {DeviceService} from '../../services/device.service';
import {getTrueControlsNames} from '../../utils/forms';
import {TrueControlsPipe} from '../../utils/true-controls.pipe';
import {CustomValidators} from '../../utils/validators';
import {AddOnComponent} from './add-on/add-on.component';
import {PlanComponent} from './plan/plan.component';
import {SwitchComponent} from './switch/switch.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    AddOnComponent,
    ButtonComponent,
    ButtonFlatComponent,
    InputComponent,
    PlanComponent,
    ReactiveFormsModule,
    StepComponent,
    StepLabelDirective,
    StepperComponent,
    StepperHeaderComponent,
    StepperNextDirective,
    StepperPreviousDirective,
    SwitchComponent,
    TitleCasePipe,
    TrueControlsPipe,
    UpperCasePipe,
    StepsComponent,
    NgTemplateOutlet,
    StepActionsDirective
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  form = new FormGroup({
    personalInfo: new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, CustomValidators.phone]),
    }),
    plans: new FormControl('arcade'),
    period: new FormControl(false),
    addOns: new FormGroup({
      'online-services': new FormControl(false),
      'larger-storage': new FormControl(false),
      'customizable-profile': new FormControl(false)
    }),
  });

  personalInfoFormGroup = this.form.controls.personalInfo;
  nameFormControl = this.personalInfoFormGroup.controls.name;
  emailFormControl = this.personalInfoFormGroup.controls.email;
  phoneFormControl = this.personalInfoFormGroup.controls.phone;
  plansFormControl = this.form.controls.plans;
  periodFormControl = this.form.controls.period;
  addOnsFormGroup = this.form.controls.addOns;

  names: {
    [key in string]: string
  } = {
    arcade: 'Arcade',
    advanced: 'Advanced',
    pro: 'Pro',
    'online-services': 'Online Services',
    'larger-storage': 'Larger Storage',
    'customizable-profile': 'Customizable Profile',
  }

  prices: {
    [key in string]: {monthly: string, yearly: string}
  } = {
    arcade: {monthly: '9', yearly: '90'},
    advanced: {monthly: '12', yearly: '120'},
    pro: {monthly: '15', yearly: '150'},
    'online-services': {monthly: '1', yearly: '10'},
    'larger-storage': {monthly: '2', yearly: '20'},
    'customizable-profile': {monthly: '2', yearly: '20'},
  }

  @ViewChild(StepperComponent) stepperComponent!: StepperComponent;

  isVisibleThankYou = signal(false);

  constructor(
    public deviceService: DeviceService
  ) {
    effect(() => {
      this.stepperComponent.step();
      this.isVisibleThankYou.set(false);
    }, {allowSignalWrites: true});

  }

  totalPrice() {
    const pricePeriod = this.periodFormControl.value ? 'yearly' : 'monthly'
    const planPrice = new BigNumber(this.prices[this.plansFormControl.value!][pricePeriod]);

    const addOnsPrice = getTrueControlsNames(this.addOnsFormGroup.controls)
      .map((addOn) => new BigNumber(this.prices[addOn][pricePeriod]))
      .reduce((previousValue: BigNumber, currentValue: BigNumber) => previousValue.plus(currentValue), new BigNumber(0));

    return planPrice.plus(addOnsPrice);
  }
}
