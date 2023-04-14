import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-providers-form',
  templateUrl: './providers-form.component.html',
  styleUrls: ['./providers-form.component.css']
})
export class ProvidersFormComponent implements OnInit{

  providerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.providerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, [Validators.required, Validators.email]),
      identification: new FormControl(null, Validators.required),
    });
  }

  onSubmit(){
    console.log(this.providerForm.value);
    this.providerForm.reset()
  }

}
