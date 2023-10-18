import { Component } from '@angular/core';

@Component({
  selector: 'app-action-sheet-example',
  templateUrl: 'actionSheetExample.component.html',
})
export class ActionSheetComponent {
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
}