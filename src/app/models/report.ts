import {Type} from "class-transformer";
import {
  ReportItem,
  ReportItemForwardResearch,
  ReportItemGoal,
  ReportItemInformationEvaluation,
  ReportItemQuestion,
  ReportItemQuote,
  ReportItemRating,
  ReportItemReference,
  ReportItemResume,
  ReportItemReview,
  ReportItemTerm,
  ReportItemType
} from "@app/models/report-item";
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

  public getItemsToDelete() {
    return this.items.filter(i => i.isDeleted());
  }

  public clearDeletedItems() {
    this.items = this.items.filter(i => !i.isDeleted());
  }

  public markAsUpdated() {
   this.items.forEach(i => i.markAsUpdated());
  }
}

export class SectionReport extends Report {
  bookSectionId: string;

  createItem(type: ReportItemType): ReportItem {
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
}

export class BookReport extends Report {
  userBookId: string;
}
