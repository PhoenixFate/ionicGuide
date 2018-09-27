import { Component } from '@angular/core';

import { SceneryPage } from '../scenery/scenery';
import { ScanPage } from '../scan/scan';
import { HomePage } from '../home/home';
import { MinePage } from '../mine/mine';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SceneryPage;
  tab3Root = ScanPage;
  tab4Root = MinePage
  constructor() {

  }
}
