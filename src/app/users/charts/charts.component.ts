

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartType } from 'angular-google-charts';
import { HttpClient } from '@angular/common/http';
import { UsuarioDaoService } from '../DAO/usuarioDao.service';
import { UsuarioDTO } from '../DTO/UsuarioDTO';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  cards:any;
  dataUsers:UsuarioDTO[];
  
  mostPopularNames:any;
  mostPopularLengthSurnames:any;

  chartMostPopularNames: {};
  chartMostPopularLengthSurnames:{};

  constructor(private breakpointObserver: BreakpointObserver, private usuarioDaoService:UsuarioDaoService) {
    
    this.dataUsers = [];
    this.chartMostPopularNames = {};
    this.chartMostPopularLengthSurnames={};

  }
  async ngOnInit() {

    this.dataUsers = await this.usuarioDaoService.listUsers();

    this.chartMostPopularNames = {
      title: 'Nombres mas populares',
      cols: 1,
      rows: 1,
      type: ChartType.PieChart,
      data: this.getMostPopularNames(),
      columnNames: ["Nombre", "Valor"],
      width: 600,
      height: 250,
      options:{}
    }

    this.chartMostPopularLengthSurnames = {
      title: 'Apellidos más largos',
      cols: 1,
      rows: 1,
      type: ChartType.BarChart,
      data: this.getMostPopularLengthSurnames(),
      columnNames: ["Apellido", "Tamaño"],
      width: 600,
      height: 250,
      options:{}
    }
    

    
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            this.chartMostPopularNames,
            this.chartMostPopularLengthSurnames,
          ];
        }
  
        return [
          this.chartMostPopularNames,
          this.chartMostPopularLengthSurnames,
        ];
      })
    );
    
  }
  


  getMostPopularNames():any{

    let uniqueNames = new Set(this.dataUsers?.map(data => data.name));
    
    let popularNamesUnordered = new Array;
    
    uniqueNames.forEach((name) => {
        
      let counts = 0;

       for (let i=0; i < this.dataUsers.length; i++){
          if(this.dataUsers[i].name.toLowerCase() === name.toLowerCase()) counts ++;
       }

       popularNamesUnordered = [...popularNamesUnordered, [name, counts]] ;
  
    })
   
    let ordered =popularNamesUnordered.sort(function(a:any,b:any) {
      return b[1]-a[1]
    });

    return this.mostPopularNames = Object.assign(ordered.slice(0,5));

  }

  getMostPopularLengthSurnames():any{

    let uniqueSurnames = this.dataUsers?.map(data => data.surname);
    
    let ordered = uniqueSurnames.sort((a,b) => b.length - a.length)

    let array = ordered.map(surname => [surname, surname.length])


    return this.mostPopularLengthSurnames = Object.assign(array.slice(0,5));

  }


  
}


/*import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
*/
