import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private FormBuilder: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = this.FormBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      material: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.userService.createUser(newUser).subscribe((user) => {
        console.log('User created:', user);
        this.userForm.reset();
      });
    }
  }
}
