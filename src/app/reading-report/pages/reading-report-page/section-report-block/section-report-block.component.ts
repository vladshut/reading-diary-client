import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportItem, ReportItemType} from "@app/models/report-item";
import {copyToClipboard} from "@app/shared/helpers/functions.helper";
import {AlertService} from "@app/core/services/alert.service";

@Component({
  selector: 'app-section-report-block',
  templateUrl: './section-report-block.component.html',
  styleUrls: ['./section-report-block.component.css']
})
export class SectionReportBlockComponent implements OnInit {
  @Input() name: string;
  @Input() icon: string;
  @Input() items: ReportItem[] = [];
  @Input() isSingle: boolean = false;

  @Output() createItem = new EventEmitter<void>();

  constructor(
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  onCreate() {
    this.createItem.emit();
  }

  onCopy() {
    const text = this.items.reduce((t, i) => t + i.asFormattedString + '\n\n', '' );
    copyToClipboard(text);
    this.alertService.info('Copied to clipboard');
  }

  makePrivate() {
    this.items.forEach(i => i.makePrivate());
  }

  makePublic() {
    this.items.forEach(i => i.makePublic());
  }

  isPrivate(): boolean {
    return this.items.find(i => i.isPublic()) === undefined;
  }
}
