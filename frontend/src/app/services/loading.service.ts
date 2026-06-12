import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = signal(false);
  isLoading = this._loading.asReadonly();

  start() {
    this._loading.set(true);
  }

  stop() {
    // Small timeout to bridge the gap between router end and component data start
    setTimeout(() => {
      this._loading.set(false);
    }, 150);
  }
}
