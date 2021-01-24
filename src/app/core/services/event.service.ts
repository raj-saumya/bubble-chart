import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventService {
  private scrollSubject = new Subject<any>();

  constructor() {}

  getScrollubjectEvent(): Subject<any> {
    return this.scrollSubject;
  }

  sendScrollEvent(newPos: any): void {
    this.scrollSubject.next(newPos);
  }
}
