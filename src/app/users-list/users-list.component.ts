import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from '../users.service';
import { User } from '../interfaces/users.interface';
import { CreateUser } from '../interfaces/create-user.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    UserCardComponent,
    AsyncPipe,
    MatIcon,
    MatButtonModule,
    MatDialogModule,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.usersService.setUsers(response);
    });
  }

  createUser(formDateUser: CreateUser) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formDateUser.name,
      username: formDateUser.username,
      email: formDateUser.email,
      company: {
        name: formDateUser.company.name,
      },
    });
  }

  editUser(user: User) {
    this.usersService.editUser({...user});
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  openDialogCreateUser(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);
    dialogRef.afterClosed().subscribe((createResult: CreateUser) => {
      if (!createResult) {
        this.snackBar.open('Отмена добавления!', 'ok', { duration: 3000 });
        return;
      }
      if (createResult) {
        this.snackBar.open('Пользователь добавлен!', 'ok', {
          duration: 3000,
        });
        this.createUser(createResult)
      }
        });
      }
    }
  

