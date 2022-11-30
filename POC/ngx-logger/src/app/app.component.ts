import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  constructor(private logger: NGXLogger) {
    this.logger.trace("Trace message");
    this.logger.debug("Debug message");
    this.logger.info("Info message");
    this.logger.log("Log message");
    this.logger.warn("Warning message");
    this.logger.error("Error message");
    this.logger.fatal("Fatal message");

 }

 

 

}
