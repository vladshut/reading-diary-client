import {Type} from "class-transformer";
import {ReportItem, ReportItemType} from "@app/models/report-item";

const ObjectID = require('bson').ObjectID;

export class Report {
  @Type(() => ReportItem, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: "type",
      subTypes: ReportItem.getClassTypeMap(),
    }
  })
  items: ReportItem[] = [];
  bookSectionId: string;
  userBookId: string;

  public getItemsByType(type: ReportItemType) {
    return this.items.filter(i => i.type === type && !i.isDeleted());
  }

  public isNeededToBeSaved() {
    return this.items.find(i => i.isNeedUpdate() || i.isDeleted()) !== undefined;
  }

  public getItemsToUpdate(): ReportItem[] {
    return this.items.filter(i => i.isNeedUpdate());
  }

  public getItemsToDelete(): ReportItem[] {
    return this.items.filter(i => i.isDeleted());
  }

  public clearDeletedItems() {
    this.items = this.items.filter(i => !i.isDeleted());
  }
}

export class SectionReport extends Report {
  bookSectionId: string;

  singleItemsType: ReportItemType[] = [
    ReportItemType.INFORMATION_EVALUATION,
    ReportItemType.RATING,
    ReportItemType.RESUME,
    ReportItemType.REVIEW,
  ];

  isSingleType(type: ReportItemType) {
    return this.singleItemsType.indexOf(type) !== -1;
  }

  createItem(type: ReportItemType): ReportItem {
    if (!this.canAddItemOfType(type)) {
      return;
    }

    const className: any = ReportItem.getClassNameByType(type);
    const item: ReportItem = new className();
    item.id = new ObjectID().toString();
    item.type = type;
    item.order = this.items.length + 1;
    item.book_section_id = this.bookSectionId;
    item.markAsNew();

    this.items.push(item);

    return item;
  }

  canAddItemOfType(type: ReportItemType): boolean {
    return !this.isSingleType(type) || this.items.find(i => i.type === type) === undefined;
  }
}

export class BookReport extends Report {
  userBookId: string;
}
