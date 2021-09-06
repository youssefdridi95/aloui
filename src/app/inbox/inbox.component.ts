import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TalkService } from '../shared/talk.service';
import Talk from 'talkjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  private inbox: Talk.Inbox;
  private session: Talk.Session;
  constructor( private talkService: TalkService) { }

  ngOnInit() {
    this.createInbox();
  }

  private async createInbox() {
    

    const session = await this.talkService.createCurrentSession();
    const inbox = session.createInbox();
    inbox.mount(document.getElementById("talkjscontainer"));
  }
  
}
