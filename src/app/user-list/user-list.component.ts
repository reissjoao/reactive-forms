import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users: User[] = [];
  userForm: FormGroup;  
  idEditFormOpen: boolean = false;
  editingUser: User | null = null;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      material: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== user.id);
    });
  }

  openEditForm() {
    this.idEditFormOpen = !this.idEditFormOpen;
  }

  editUser(user: User) {
    this.editingUser = user;
    this.userForm.patchValue({
      name: user.name,
      username: user.username,
      email: user.email,
      material: user.material
    });
    this.idEditFormOpen = true;
  }

  updateUser() {
    if (this.editingUser) {
      const updatedUser: User = { ...this.editingUser, ...this.userForm.value };
      this.userService.updateUser(updatedUser).subscribe((response) => {
        // Atualize a lista de usuários ou faça a lógica necessária após a atualização
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.editingUser = updatedUser; // Atualiza o objeto de edição com os novos dados
        }
  
        this.idEditFormOpen = false;
      });
    }
  }
  
}