import { Component } from '@angular/core'

import { Hero } from './hero'
import { HeroService } from './hero.service'

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [HeroService],
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService){};
  getheroes
  ngOnInit() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1,5));
  }

}HeroService