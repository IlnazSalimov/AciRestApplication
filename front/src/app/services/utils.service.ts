import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable()

export class UtilsService {

    constructor(private location: Location) {

    }

    backToPreviousePage() {
        this.location.back();
    }
}
