import {Injectable} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {fromEvent, map, startWith} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  screensSize = toSignal(
    fromEvent(window, 'resize').pipe(
      startWith(null),
      map(() => {
        const width = window.innerWidth;

        if (width >= 768) {
          return 'desktop';
        }

        return 'tablet';
      })
    )
  );

  constructor() {
  }
}
