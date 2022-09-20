import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config: any;

  constructor(private http: HttpClient) {}

  load(url: string) {
    return new Promise<void>((resolve) => {
      this.http.get(url).subscribe((config) => {
        this.config = config;

        resolve();
      });
    });
  }

  getConfiguration() {
    return this.config;
  }
}

export function ConfigFactory(config: ConfigService) {
  return () => config.load('assets/environments/config.json');
}

export function init() {
  return {
    provide: APP_INITIALIZER,
    useFactory: ConfigFactory,
    deps: [ConfigService],
    multi: true,
  };
}
const ConfigModule = {
  init: init,
};

export { ConfigModule };
