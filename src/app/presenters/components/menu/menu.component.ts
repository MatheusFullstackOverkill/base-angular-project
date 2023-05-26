import { AfterViewInit, Component } from '@angular/core';
// import { UsersService } from 'src/app/infrastructure/services/users/users.service';
// import { User } from 'src/app/infrastructure/services/users/users.service.interface';
import { usertypes } from 'src/app/infrastructure/utils/constants';

interface MenuRoute {
  label: string,
  link?: string,
  icon: string,
  usertypes: string[],
  submenu?: {
    height: number,
    routes: MenuRoute[]
  },
  toggled?: boolean
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements AfterViewInit {
  // userData!: User
  routes: MenuRoute[] = [
    {
      label: 'Dashboard',
      link: '/dashboard',
      icon: '../../../../assets/icons/dashboard.svg',
      usertypes: Object.keys(usertypes)
    },
    {
      label: 'Serviços',
      usertypes: Object.keys(usertypes),
      icon: '../../../../assets/icons/dashboard.svg',
      submenu: {
        height: 0,
        routes: [
          {
            label: 'Listar Projetos de Minigerações',
            link: '/projects/minigenerations',
            icon: '../../../../assets/icons/dashboard.svg',
            usertypes: Object.keys(usertypes)
          },
          {
            label: 'Solicitar Projeto de Minigerações',
            link: '/projects/minigenerations/create',
            icon: '../../../../assets/icons/dashboard.svg',
            usertypes: Object.keys(usertypes)
          },
        ]
      }
    },
    {
      label: 'Usuários',
      link: '/users',
      icon: '../../../../assets/icons/dashboard.svg',
      usertypes: ['admin', 'manager', 'bluesun_employee']
    },
    {
      label: 'Concessionárias',
      link: '/dealerships',
      icon: '../../../../assets/icons/dashboard.svg',
      usertypes: ['admin', 'manager', 'employee']
    },
    {
      label: 'Módulos',
      link: '/modules',
      icon: '../../../../assets/icons/dashboard.svg',
      usertypes: ['admin', 'manager', 'employee']
    },
    {
      label: 'Inversores',
      link: '/inverters',
      icon: '../../../../assets/icons/dashboard.svg',
      usertypes: ['admin', 'manager', 'employee']
    },
    {
      label: 'Meu perfil',
      link: '/profile',
      icon: '../../../../assets/icons/dashboard.svg',
      usertypes: Object.keys(usertypes)
    },
    {
      label: 'Dados de Pagamento',
      link: '/payment-data',
      icon: '../../../../assets/icons/dashboard.svg',
      usertypes: Object.keys(usertypes)
    },
    {
      label: 'Contato',
      link: '/contact',
      icon: '../../../../assets/icons/dashboard.svg',
      usertypes: Object.keys(usertypes)
    }
  ]
  selectedRoute = '/dashboard'

  // constructor(private userService: UsersService) {}

  ngAfterViewInit() {
    this.setMenuHeights();
    this.getUserData();
    this.selectedRoute = window.location.pathname;
  }

  setMenuHeights() {
    this.routes.map((x, i) => {
      if(x.submenu) {
        x.submenu.height = ((document.querySelector(`.route-${i}`)?.querySelector('.submenu') as HTMLElement).childNodes[0] as HTMLElement).offsetHeight;
      };
    });
  }

  async getUserData() {
    // const response = await this.userService.retrieve(localStorage.getItem('user_id') as string);
    // this.userData = response;
  }

  toggleSubmenu(index: number) {
    this.routes[index].toggled = !this.routes[index].toggled;
  }

  setCurrentPage(route: string) {
    this.selectedRoute = route;
  }

}
