import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Hero } from './hero'
import { HEROES } from './mock-hero';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes'
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero [])
            .catch(this.handleError);
  };
  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Hero)
          .catch(this.handleError);
  };
  update(hero:Hero): Promise<Hero>{
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
          .post(url, JSON.stringify(hero), {headers: this.headers})
          .toPromise()
          .then(() => hero)
          .catch(this.handleError);
  }
  private handleError(error:any): Promise<any> {
    console.log('An error has occured', error);
    return Promise.reject(error.message||error)
  };
};