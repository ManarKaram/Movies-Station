import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.css']
})
export class FormErrorsComponent implements OnInit {

  @Input() control: AbstractControl;
  emailRegex = this.validation.emailPattern;
  passwordRegex = this.validation.passwordPattern;
  alphaRegex = this.validation.alphaPattern;
  numericalRegex = this.validation.numerical;

  constructor(private validation: ValidationService) { }

  ngOnInit() {
  }

}
