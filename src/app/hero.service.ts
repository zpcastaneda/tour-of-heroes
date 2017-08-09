import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    // When the given name is non-blank, the handler delegates 
    // creation of the named hero to the hero service, and then 
    // adds the new hero to the array
    create(name: string): Promise<Hero> {
      return this.http
        .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Hero)
        .catch(this.handleError);
    }

    // To identify which hero the server should update, the hero id is encoded in the URL
    // The put() body is the JSON string encoding of the hero, obtained by calling JSON.stringify
    // The body content type (application/json) is identified in the request header
    update(hero: Hero): Promise<Hero> {
      const url = `${this.heroesUrl}/${hero.id}`;
      return this.http
        .put(url, JSON.stringify(hero), {headers: this.headers})
        .toPromise()
        .then(() => hero)
        .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    // The Angular http.get returns an RxJS Observable.
    // Observables are a powerful way to manage asynchronous data flows
    getHeroes(): Promise<Hero[]> {
      return this.http.get(this.heroesUrl)
                 .toPromise()
                 .then(response => response.json().data as Hero[])
                 .catch(this.handleError);
    }

    // This request is almost the same as getHeroes()
    // The hero id in the URL identifies which hero the server should update
    getHero(id: number): Promise<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Hero)
        .catch(this.handleError);
    }

    // This is a critical step. You must anticipate HTTP failures, as they happen frequently for reasons beyond your control.
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}