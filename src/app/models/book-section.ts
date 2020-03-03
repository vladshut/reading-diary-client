import {ReportItem} from "@app/models/report-item";
import {Type} from "class-transformer";
import {SectionReport} from "@app/models/report";

export class BookSection {
  id: string;
  name: string;
  order: number;
  parent_id: string;

  parent: BookSection = undefined;

  children: BookSection[] = [];
  report: SectionReport;

  isRoot() {
    return !this.parent_id;
  }

  isLeaf() {
    return this.children.length === 0;
  }
}
