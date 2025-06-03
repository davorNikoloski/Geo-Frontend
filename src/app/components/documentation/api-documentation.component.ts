import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { TabsNavigationComponent } from './components/navigation/tabs-navigation.component';
import { GeocodingDocsComponent } from './components/geocoding-docs/geocoding-docs.component';
import { MatrixDocsComponent } from './components/matrix-docs/matrix-docs.component';
import { DirectionsDocsComponent } from './components/directions-docs/directions-docs.component';
import { IsochroneDocsComponent } from './components/isochrone-docs/isochrone-docs.component';

@Component({
  selector: 'app-api-documentation',
  templateUrl: './api-documentation.component.html',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    TabsNavigationComponent,
    GeocodingDocsComponent,
    MatrixDocsComponent,
    DirectionsDocsComponent,
    IsochroneDocsComponent
  ],
})
export class ApiDocumentationComponent {
  activeTab: string = 'geocoding';

  changeTab(tab: string): void {
    this.activeTab = tab;
  }
}