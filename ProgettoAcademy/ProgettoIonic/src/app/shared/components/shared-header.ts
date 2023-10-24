import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-header',
    templateUrl:'shared-header.html',
})
export class SharedHeader {
    @Input() pageTitle = "";
    @Input() showCreateButton = false;
    @Input() showBackButton = true;

    @Output() clickEvent = new EventEmitter<void>();

    clickEventEmit() {
        this.clickEvent.emit();
    }
}