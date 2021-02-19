import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './application-loader.component.html',
  styleUrls: ['./application-loader.component.scss'],
})
export class ApplicationLoaderComponent implements OnInit {
  loader$: Subject<boolean> = this.loaderService.appLoader;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {}
}
