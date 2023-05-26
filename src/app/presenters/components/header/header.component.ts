import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { UsersService } from 'src/app/infrastructure/services/users/users.service';
// import { User } from 'src/app/infrastructure/services/users/users.service.interface';
import { Session } from 'src/app/infrastructure/utils/loggout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('userMenuContainer') userMenuContainer: ElementRef = new ElementRef({})
  // userData!: User
  openMenu = false

  constructor(
    private session: Session,
    // private userService: UsersService
  ) {};

  ngOnInit() {
    this.getUserData();
    document.addEventListener('click', this.toggleMenu, false);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.toggleMenu, false);
  }

  async getUserData() {
    // const userData = await this.userService.retrieve(localStorage.getItem('user_id') as string);
    // this.userData = userData;
  }

  toggleMenu = (e: MouseEvent) => {
    const userMenuContainer: HTMLElement = this.userMenuContainer.nativeElement;
    if(userMenuContainer.contains(e.target as HTMLElement)) {
      this.openMenu = !this.openMenu;
    } else if(this.openMenu) {
      this.openMenu = !this.openMenu;
    }
  }

  logoutUser = () => {
    this.session.loggoutUser();
  }
}
