import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const PAGES_WITH_NO_SIDEBAR_AND_FOOTER: string[] = ['login', 'register'];

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'GroundBnB';
  showHeaderAndFooter!: boolean;

  constructor(public authService: AuthService, private router: Router) {
    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeParts: string[] = this.router.url.split('/');
        this.showHeaderAndFooter = !PAGES_WITH_NO_SIDEBAR_AND_FOOTER.some(
          (page) => routeParts.includes(page)
        );
      }
    });

    localStorage.clear();
  }

  ngOnDestroy() {}
}
