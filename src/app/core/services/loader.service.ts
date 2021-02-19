import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  appLoader = new Subject<boolean>();

  showLoader() {
    this.appLoader.next(true);
  }

  hideLoader() {
    this.appLoader.next(false);
  }
  constructor() {}
}
