import { Component } from '@angular/core';
import { RowNode, IToolPanelParams } from "ag-grid-community";

interface IToolPanelAngularComp {
  agInit(params: IToolPanelParams): void;
}

@Component({
  selector: 'custom-stats',
  templateUrl: './custom-tool-bar.component.html',
  styleUrls: ['./custom-tool-bar.component.scss']
})

export class CustomStatsToolPanel implements IToolPanelAngularComp  {
  private params: IToolPanelParams;

  public numMedals: number;
  public numGold: number;
  public numSilver: number;
  public numBronze: number;

  agInit(params: IToolPanelParams): void {
    this.params = params;

    this.numMedals = 0;
    this.numGold = 0;
    this.numSilver = 0;
    this.numBronze = 0;

    this.params.api.addEventListener(
      'modelUpdated',
      this.updateTotals.bind(this)
    );
  }

  updateTotals(): void {
    let numGold = 0,
      numSilver = 0,
      numBronze = 0;

    this.params.api.forEachNode((rowNode: RowNode) => {
      const data = rowNode.data;
      if (data.gold) numGold += data.gold;
      if (data.silver) numSilver += data.silver;
      if (data.bronze) numBronze += data.bronze;
    });

    this.numMedals = numGold + numSilver + numBronze;
    this.numGold = numGold;
    this.numSilver = numSilver;
    this.numBronze = numBronze;
  }
}