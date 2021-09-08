import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { QuizzSService } from 'app/affichequizz/quizz-s.service';

@Component({
  selector: 'app-playquizz',
  templateUrl: './playquizz.component.html',
  styleUrls: ['./playquizz.component.css']
})
export class PlayquizzComponent implements OnInit {

  constructor(private QuizzSService: QuizzSService, private route: ActivatedRoute) { }
  quizz;
  questions: [];
  answers = [];
  goodAnswers = [];
  QuestionNumber = 0;
  resultat = 0;
  step = 0;
  progress = "0%"
  loader = true;
  duration = 0;
  mm=0;
  ss=0;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const _id = routeParams.get('quizzId');
    this.QuizzSService.getQuizz(_id).subscribe((res) => {
      this.quizz = res['data'][0];
      this.questions = res['data'][0].questions
      this.duration=res['data'][0].duration*60;
      this.questions.forEach(e => this.goodAnswers.push(parseInt(e['valid'])))

    })
    setTimeout(() => {
      this.loader = false;
      this.timerCountDown()
    }, 2000);
  }
  SaveAnswer(i: number) {
    this.answers.push(i);

    document.getElementById("questionText").classList.add("slide-out-right");
    document.getElementById("answerBody").classList.add("slide-out-right");
    setTimeout(() => {

      this.QuestionNumber++;
    }, 900)
    this.step++;
    this.progress = (this.step / this.questions.length) * 100 + "%"
    console.log(this.QuestionNumber);
    console.log(this.questions.length);

    if (this.QuestionNumber + 1 == this.questions.length) {
      this.countScore()
    }
  }
  countScore() {

    for (let i = 0; i < this.goodAnswers.length; i++) {

      if (this.answers[i] == this.goodAnswers[i]) {
        this.resultat++;
      }

    }
    // console.log("/////////")
    // console.log(this.goodAnswers);
    // console.log(this.answers)
    // console.log(this.resultat/this.questions.length)
  }

  timerCountDown() {
    var countdown = setInterval(
      () => {
        this.duration--;
        console.log(this.duration)
        this.mm= Math.floor(this.duration / 60);
        this.ss=this.duration % 60;
        if (this.duration == 0) {
          clearInterval(countdown);
          this.countScore()
          this.QuestionNumber = this.questions.length
        }
      }, 1000
    )

    

  }


}



