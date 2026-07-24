import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {
  currentMenuIsActive = true;
  HomeIconisActive:boolean = false;

  readonly backgroundColor = '#122525';
  readonly activeBackgroundColor = '#336666ff';

  // guarda qual menu está ativo
  activeMenu: string | null = null;

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }

  getMenuStyle(menu: string) {
    return {
      'background-color':
        this.activeMenu === menu
          ? this.activeBackgroundColor
          : this.backgroundColor
    };
  }
}