import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToggleStatusComponent } from './toggle-status/toggle-status.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    SharedComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ToggleStatusComponent,
  ],
  imports: [CommonModule, RouterModule, MatSlideToggleModule, MatCardModule],
  exports: [
    SidebarComponent,
    ToggleStatusComponent
  ],
})
export class SharedModule {}
