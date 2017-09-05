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
  add(heroName:string): void {
    heroName = heroName.trim()
    if (!heroName) {
      return
    }
    this.heroService.create(heroName)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero:Hero): void{
    this.heroService.delete(hero.id)
      .then(()=> {
        this.heroes = this.heroes.filter(h=> h!= hero)
        if(this.selectedHero == hero){
          this.selectedHero = null
    }})
  };
};