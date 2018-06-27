# Context Event Client

Framework-agnostic client library for the [Context Event Service](https://github.com/preston/context-event-service)


##Concepts

All URIs associated with this library represent an identification but not necessarily a location. It is recommended that users of the library spend some time analyzing their application in order to uniquely name section and data model. Consistency is key, but `controller_uri` and `model_uri` are open ended fields.

Field | Description
:--- | :---
`topic_uri` | Represents a semantic web operation or resource. Currently the library supports the [ui_detail_level](http://www.ke.tu-darmstadt.de/ontologies/ui_detail_level.owl) ontology, and it is recommended that you use the concepts provided there.
`controller_uri` | Represents a component or module that is responsible for emitting this event.
`model_uri` | Represents an identifier that corresponds to the specific data model used in your controllers and that relates to this event.
`parameters` | This can be any valid JSON or javascript object that contains additional data you may wish to include with the event.

#### By Example

In the example usage below, you can see how you can structure your app's URIs.

Assuming you want to send an event when a user click 'Login' on your app's login screen:
```js
ces.send({
  topic_uri: "mouse-click",
  controller_uri: "app://controllers/login",
  model_uri: "data://app/user/login",
  parameters: { "username" : "jsmith", "login_attempt_time" : new Date() }
});
```

## Usage

1. Ensure you have types installed for EventSource
  
    ```npm install @types/eventsource --save```
  
2. Install Context Event Client
  
    ```npm install context-event-client --save```

3. Use anywhere:
  
    ```js
    import { CES, ActionEvent } from "context-event-client";
  
    let ces = new CES();
    // Send an event
    ces.send({
      topic_uri: "load",
      controller_uri: "protocol://controllers/app",
      model_uri: "data://app/data",
      parameters: {"name" : "CES App" }
    });
    ```
####Custom CES Endpoint
By default, the library uses the CES public event endpoint. However, It is possible to specify a specific CES url for other instances. It is a simple, optional constructor argument you can include when creating the `CES` object.

```js
import { CES, ActionEvent } from "context-event-client";

let ces = new CES('http://any-CES-url.com/');
```

## Use with Angular

#### Attribute Directive
It is possible to use our html attribute directive instead of filling your controller logic with send event method calls.
Using a combination of attributes you can send an event from html. The following attributes are currently supported:

Attribute | Description
:--- | :---
`cesEvent` | Set this equal to the `model_uri` of the event.
`cesParameters` | Set equal to the parameters you want to send with this event.
`cesTopic` | Set this equal to the topic URI. We only support a specific subset of the [ui_detail_level](http://www.ke.tu-darmstadt.de/ontologies/ui_detail_level.owl) ontology at this time.

The `cesTopic` attribute must be one of the supported ui_details_level elements, as this is how Angular knows what element event to send the event on. For example, if you want top send an event when the user clicks a specific element,
you would use an ontology element that is configured to respond with `OnClick` events of the host element. The following table shows which ontology items are valid, and what event they listen for.

Native Event | Acceptable Ontology Items
:--- | :---
`OnClick` | `view`, `mouse-click`, `mouse-single-click`, `mouse-double-click`, `create-information-object`, `selectable-item`
`OnLoad` | `load`
`OnChange` | `file-picker`, `alter-information-object`, `input-information`
`OnTextSelection` | `select-value`, `selectable-data-representation` 
`OnFocus` | `data-input-component` 

Putting this all together, if you wanted to send an event when the user clicks a button, you might do something like this:

```html
<input type="button" 
  class="login-btn" 
  value="Click to Login" 
  [cesEvent]="myapp://login/button"
  [cesTopic]="view"
  [cesParameters]="{username:'username87'}"
/>
```

You might be asking, what about the `controller_uri`? The directive automatically detects which controller handles the html where your attributes reside. It fills this in for you when it sends the event.

#### Injectible Service
This library also comes bundled with an Angular `@Injectible` service for your convenience. Here is an example of using it in your `app.component.ts` and sending an 'Application Started' event to CES.
```typescript
import { Component, OnInit } from '@angular/core';
import { CESService, ActionEvent } from "context-event-client";
@Component({
  selector: 'app',
  template: '<app></app>',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private ces: CESService) {
    console.log("AppComponent has been initialized to establish router element.");
  }
  ngOnInit(){
    this.ces.send(new ActionEvent(
        "load", // topic_uri
        "protocol://controllers/app", // controller_uri
        "data://app/data", // model_uri
        {"name" : "CES App" } //parameters
    ));
  }
}
```

## Receiving Events

As you send events asynchronously to the CES backend, agents will begin to send back events you can use to orchestrate interactivity in your front end. 
To connect to a stream of events, you can easily subscribe using channels. A channel can be a stream of any type of events exposed by agents on the backend, but for 
any client to access this stream of events, you must pass in an array of channels you wish to subscribe to. Channel names are loosely defined and are set by backend agents.
However, for the front end, you can subscribe to channel names that match previously sent topic_uri, model_uri, or controller_uri. Other backend agents may expose additional channels 
you can subscribe to, however, those would be documented by the CES backend.

The following is an example of how to subscribe and filter events with this library:

```js
import { CES, ActionEvent, eventFilter } from "context-event-client";
let ces = new CES();
// Here we subscribe to text selection events from the UI Ontology, and we also subscribe to any events related to the app controller.
ces.initialize(['http://www.ke.tu-darmstadt.de/ontologies/ui_detail_level.owl#select-value', 'application://controller/app']); // Array of channel names
    ces.getEventStream()
      // Here we can use any RxJs operators!
      .filter((event) => {
        // eventFilter is a tool provided by this library that you can use to filter incoming events using glob patterns.
        // Here we filter for any incoming events related to text selection, and any events with a model, controller, or topic URI that starts with 'application'.
        return eventFilter(['application*', 'select-value*'], event);
      })
      .subscribe((event)=>{
        console.info('Event received: ', event);
    });
```

Because the library hands you events in the form of observables, you can manipulate and iterate over events with all of the power of RxJs operators. You can also
assign specific observables that subscribe and filter different channels or keywords. This allows front end developers maximum flexibility for handling incoming events.


[NPM Package](https://www.npmjs.com/package/context-event-client) |
[GitHub](https://github.com/preston/context-event-client) |
[Contributors](https://github.com/preston/context-event-client/graphs/contributors)
