import { Injectable } from "@angular/core";
import Talk from "talkjs";
import { UserService } from './user.service';

@Injectable({
  providedIn: "root"
})
export class TalkService {
  userDetails;
  private currentTalkUser: Talk.User;
  constructor(private userService: UserService) {
    
}


find()
{
  
const promise = new Promise((resolve, reject) => {
  this.userService.getUserProfile()
    .toPromise()
    .then((res: any) => {
      // Success
      this.userDetails = res['user']; ;
      resolve();
    },
      err => {
        // Error
        reject(err);
      }
    );
});
return promise;
 
}

  
  async createTalkUser(applicationUser) {
  // await this.douser();
     
    await Talk.ready;
    return new Talk.User({
      id: applicationUser.id,
      name: applicationUser.username,
      photoUrl: applicationUser.profilepic,
      role: "default"
    });
    
  }

  async createCurrentSession() {
    await this.find();
    await Talk.ready;
    const user = {
      id: this.userDetails._id,
      username: this.userDetails.username,
      email: this.userDetails.email,
      photoUrl: this.userDetails.profilepic,
      welcomeMessage: "Hey there! How are you? :-)",
      
    };
    const currentTalkUser = await this.createTalkUser(user);
    const session = new Talk.Session({
      appId: "tm6e08db",
      me: currentTalkUser
    });
    this.currentTalkUser = currentTalkUser;
    return session;
  }

  private async getOrCreateConversation(
    session: Talk.Session,
    otherApplicationUser
  ) {
    const otherTalkUser = await this.createTalkUser(otherApplicationUser);
    const conversationBuilder = session.getOrCreateConversation(
      Talk.oneOnOneId(this.currentTalkUser, otherTalkUser)
    );
    conversationBuilder.setParticipant(this.currentTalkUser);
    conversationBuilder.setParticipant(otherTalkUser);
    return conversationBuilder;
  }

  async createInbox1(session: Talk.Session) {
    const otherApplicationUser = {
      id: 5,
      username: 'Lo',
      email: 'demo@talkjs.com',
      photoUrl: 'https://demo.talkjs.com/img/sebastian.jpg',
      welcomeMessage: 'Hey, how can I help?',
      role: 'booker'
    };

    const conversation = await this.getOrCreateConversation(session, otherApplicationUser);
    return session.createInbox({selected: conversation});
 }


  async createInbox(session: Talk.Session, otheruser) {
   
    const otherApplicationUser = otheruser;
    const conversationBuilder = await this.getOrCreateConversation(
      session,
      otherApplicationUser
    );
    return session.createChatbox(conversationBuilder);
  }
}
