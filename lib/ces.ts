export abstract class EventModel {
  person_id: string = '';
  topic_uri: string = '';
  model_uri: string = '';
  agent_uri: string = '';
  parameters: any = {};
}

export abstract class JWTResponse {
  jwt: string = '';
  authorization: string = '';
}
export class CES {
  url: string = 'http://context-event-service.prestonlee.com';
  token: JWTResponse = {jwt:'',authorization:''};
  send (event: EventModel) {
    return new Promise((resolve, reject) => {
      if(!this.token){
        this.getJWT().then((token: JWTResponse) => {
          this.sendRequest(event, token).then((response) => {
            resolve(response);
          });
        });
      } else {
        this.sendRequest(event, this.token).then((response) => {
          resolve(response);
        });
      }
    });
  }
  sendRequest(event: any, token: JWTResponse){
    return new Promise((resolve, reject) => {
      fetch(this.url + '/events', {
        method: 'POST',
        body: JSON.stringify(event),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': token.authorization
        }
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  };
  getJWT(){
    return new Promise<JWTResponse>((resolve, reject) => {
      fetch(this.url + '/sessions', {
        method: 'POST',
        body: JSON.stringify(event),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then((response: Response) => {
        response.json().then((data: JWTResponse) => {
          this.token = data;
          resolve(data);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
