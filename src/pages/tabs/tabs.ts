import { Component } from '@angular/core';

import { SceneryPage } from '../scenery/scenery';
import { HomePage } from '../home/home';
import { MinePage } from '../mine/mine';
import { DiscoverPage } from '../discover/discover';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SceneryPage;
  tab3Root = DiscoverPage;
  tab4Root = MinePage
  constructor() {

  }
}
