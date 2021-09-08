import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { QuizzSService } from './quizz-s.service';

@Component({
  selector: 'app-affichequizz',
  templateUrl: './affichequizz.component.html',
  styleUrls: ['./affichequizz.component.css']
})
export class AffichequizzComponent implements OnInit {

  constructor(private QuizzSService:QuizzSService) { }
quizz:[any];
category:any;
teacher:boolean;
public radioSelected: any = '';
public filterText: any = '';
ngOnInit(): void {
    this.QuizzSService.getAllQuizzUsingGETResponse().subscribe(
      res=>{this.quizz=res;
        
      },err=>{},()=>{
        let allcat=[];
        let uniquecat:any;
        this.quizz.map(e=> allcat.push(e.category))
        uniquecat=new Set(allcat);
        this.category=Array.from(uniquecat)

        }
    )

    sessionStorage.getItem('type')==='T'?this.teacher=true:this.teacher=false     
    
  }

}

