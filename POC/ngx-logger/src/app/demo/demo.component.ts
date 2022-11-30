import { Component, OnInit } from '@angular/core';
import { NGXLogger } from "ngx-logger";

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(private logger: NGXLogger) {
      this.logger.trace("Trace message");
      this.logger.debug("Debug message");
      this.logger.info("Info message");
      this.logger.log("Log message");
      this.logger.warn("Warning message");
      this.logger.error("Error message");
      this.logger.fatal("Fatal message");
   }

  ngOnInit(): void {
  }

}





