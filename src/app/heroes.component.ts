import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { OnInit } from '@angular/core'

import { Hero } from './hero'
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero : Hero;
  gotoDetail(hero: Hero): void {
   this.router.navigate(['/detail',hero.id])
  };
  constructor(
    private router: Router,
    private heroService: HeroService) {};
  getHeroes(): void {
      this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  };
  ngOnInit(): void {
    this.getHeroes();
  };
};