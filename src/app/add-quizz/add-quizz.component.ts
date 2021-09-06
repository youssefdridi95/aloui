import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizzSService } from 'app/affichequizz/quizz-s.service';

@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.css']
})
export class AddQuizzComponent implements OnInit {
  quizz: FormGroup;
  selectedFile: File;
  base64Data: any;
  imageName: any;
  imageFile: Blob;
  imgURL: any = "";
  public imagePath;
  image = null;
  qCount = 0;
  bloc = 0;
  constructor(private fb: FormBuilder, private QuizzSService: QuizzSService) { }

  ngOnInit(): void {
    this.quizz = this.fb.group({
      title: new FormControl('', { validators: [Validators.required] }),
      description: new FormControl('', { validators: [Validators.required] }),
      category: new FormControl('', { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
      duration: new FormControl('', { validators: [Validators.required] }),
      questions: this.fb.array([this.newQuestion()])
    });
  }
  questions(): FormArray {
    return this.quizz.get('questions') as FormArray;
  }
  addQuestion() {

    this.questions().push(this.newQuestion());
    this.qCount++;
  }
  removeQuestion(Qindex: number) {

    this.questions().removeAt(Qindex);
    // this.QCount--;
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      questionText: new FormControl('', Validators.required),
      questionOrder: this.qCount,
      valid: new FormControl("Choose the Correct Answer", Validators.required),
      answers: this.fb.array([this.newAnswer(), this.newAnswer(), this.newAnswer(), this.newAnswer()])
    });
  }
  newAnswer(): FormGroup {
    return this.fb.group({
      answerText: new FormControl('', Validators.required),
    });
  }
  answers(Qindex: number): FormArray {
    return this.questions()
      .at(Qindex)
      .get('answers') as FormArray;
  }
  save() {
    let QS = [];
    QS = this.quizz.get('questions').value
    QS.forEach((e, i) => JSON.stringify(this.answers(i).value))
    let QA = JSON.stringify(QS);
    console.log(QA)
    const quizz = new FormData();
    quizz.append('image', this.image, this.image.name);
    quizz.append("title", this.quizz.get('title').value);
    quizz.append("description", this.quizz.get("description").value);
    quizz.append("duration", this.quizz.get("duration").value);
    quizz.append("questions", QA)
    // console.log(uploadImageData.values())
    this.QuizzSService.addQuizz(quizz)
      .subscribe((response) => {
        console.log(response)

      }
      );

    // console.log(JSON.parse(this.quizz.get("questions").value).forEach(element => {console.log(element)
    // }))
    //   }
  }

  ///read image for post 
  public onFileChanged(event: Event) {
    console.log('event trigged');
    console.log(event);
    this.image = (event.target as HTMLInputElement).files[0];
    var reader = new FileReader();
    this.imagePath = (event.target as HTMLInputElement).files;
    reader.readAsDataURL((event.target as HTMLInputElement).files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      console.log(this.imgURL);
    }

  }
  show(i) {
    this.bloc = -1;
    this.bloc = i;
    console.log()


  }
  next() {
    let arr=[];
    arr=this.quizz.get('questions').value;
    console.log(arr.length)
    if(this.bloc==arr.length)
    {
      this.addQuestion();
    }
    this.bloc++;
  
  }
}
