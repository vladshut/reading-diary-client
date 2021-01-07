import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ReportItem} from "@app/models/report-item";
import {copyToClipboard} from "@app/shared/helpers/functions.helper";
import {AlertService} from "@app/core/services/alert.service";
import {DragulaService} from "ng2-dragula";
import {BookSection} from "@app/models/book-section";
import {forkJoin, Subscription} from "rxjs";

@Component({
  selector: 'app-section-report-block',
  templateUrl: './section-report-block.component.html',
  styleUrls: ['./section-report-block.component.css']
})
export class SectionReportBlockComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() icon: string;
  @Input() items: ReportItem[] = [];
  @Input() isSingle: boolean = false;
  @Input() sectionId: string;

  @Output() createItem = new EventEmitter<void>();

  subs = new Subscription();

  constructor(
    private alertService: AlertService,
    private dragulaService: DragulaService,
  ) {
  }

  ngOnInit() {
    this.dragulaService.createGroup(this.dragulaGroup(), {
      moves: function (el, container, handle) {
        return handle.classList.contains('js-report-item-drag-handle');
      }
    });

    this.subs.add(this.dragulaService.dropModel(this.dragulaGroup())
      .subscribe(({ name, el, target, source, sibling , targetModel, sourceModel, item}) => {
        targetModel.forEach((ri: ReportItem, index) => {
          ri.setOrder(index + 1);
          ri.markAsNeedUpdate();
        });
      })
    );
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

  dragulaGroup(): string {
    return 'REPORT_ITEMS_BLOCK_' +  this.sectionId + '_' + this.name.toUpperCase();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
