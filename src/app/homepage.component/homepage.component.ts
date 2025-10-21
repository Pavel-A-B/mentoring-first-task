import { NgFor } from "@angular/common";
import { Component } from "@angular/core";

const aboutCompanyFn = (title: string) => title;
const aboutCompanyy:string = aboutCompanyFn('О компании');
const newPages : number[] = [1,2,3,4,5]; 
const menuItems = ['Каталог','Стройматериалы','Инструменты','Электрика','Интерьер и одежда'];
const upperCaseMenuItems = menuItems.map(
  (item) => {
    return item.toUpperCase();
  }
)


@Component ({
   selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    standalone: true,
    styleUrl: './homepage.component.scss',
    imports: [NgFor] 
})

export class HomepageComponent {
  title = 'mentoring-first-project';
  readonly aboutCompany = aboutCompanyy;
  isShowCatalog:boolean = true; 
  readonly headerItem1 = 'Главная';
  readonly headerItem3 ='Католог';
  readonly header2Item1 = upperCaseMenuItems[0];
  isShowImg:boolean = true;
  readonly newPages:number[] = newPages ;
  menuItems = upperCaseMenuItems;
  isUpperCase = true;
  changeMenuText () {
  this.menuItems = upperCaseMenuItems.map(
    item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
  )
  this.isUpperCase = !this.isUpperCase
}
}
   

