import { Component, OnInit, Input } from '@angular/core'
import { Location } from '@angular/common'

import { ActivatedRoute } from '@angular/router'
import { Hero } from '../Hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero()
  }

  goBack(): void {
    this.location.back()
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.heroService.getHero(id).subscribe(hero => (this.hero = hero))
  }
}
