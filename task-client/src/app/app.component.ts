/**
 * App Component
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map(() => {
          const child: any = this.activatedRoute.firstChild;
          if (child.snapshot.data.title) {
            return child.snapshot.data.title;
          }
          return appTitle;
        })
      )
      .subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }


}
