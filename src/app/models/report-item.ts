import {ucFirst} from "@app/shared/helpers/functions.helper";
import {toTitleCase} from "codelyzer/util/utils";
import {Constructor} from "@app/mixins/Constructor";

export enum ReportItemType {
  TERM = 'term',
  GOAL = 'goal',
  QUOTE = 'quote',
  QUESTION = 'question',
  RESUME = 'resume',
  REFERENCE = 'reference',
  INFORMATION_EVALUATION = 'information_evaluation',
  REVIEW = 'review',
  RATING = 'rating',
  FORWARD_RESEARCH = 'forward_research',
}

export class ReportItem {
  id: string;
  book_section_id: string;
  order: number;
  type: ReportItemType;
  private _needUpdate: boolean = false;
  private _deleted: boolean = false;
  private _isNew: boolean = false;

  markAsNeedUpdate() {
    this._needUpdate = true;
  }

  markAsUpdated() {
    this._needUpdate = false;
    this._isNew = false;
  }

  delete(): void {
    this._deleted = true;
  }

  isDeleted(): boolean {
    return this._deleted;
  }

  isNeedUpdate() {
    return this._needUpdate && !this.isDeleted();
  }

  get name(): string {
    return ReportItem.getNameFromType(this.type);
  }

  static getTypes(): ReportItemType[] {
    return Object.values(ReportItemType);
  }

  static getTypesWithNames(): {name: string, type: ReportItemType}[] {
    return ReportItem.getTypes().map(t => ({type: t, name: ReportItem.getNameFromType(t)}));
  }

  private static getNameFromType(type: ReportItemType) {
    let name = type.toString();
    name = name.replace(/_/g, ' ');

    return toTitleCase(name);
  }

  public static getClassNameByType(type: ReportItemType) {
    return this.getClassTypeMap().find(i => i.name === type).value;
  }

  public static getClassTypeMap() {
    return [
      {value: ReportItemTerm, name: ReportItemType.TERM},
      {value: ReportItemGoal, name: ReportItemType.GOAL},
      {value: ReportItemQuote, name: ReportItemType.QUOTE},
      {value: ReportItemQuestion, name: ReportItemType.QUESTION},
      {value: ReportItemResume, name: ReportItemType.RESUME},
      {value: ReportItemReference, name: ReportItemType.REFERENCE},
      {value: ReportItemInformationEvaluation, name: ReportItemType.INFORMATION_EVALUATION},
      {value: ReportItemReview, name: ReportItemType.REVIEW},
      {value: ReportItemRating, name: ReportItemType.RATING},
      {value: ReportItemForwardResearch, name: ReportItemType.FORWARD_RESEARCH},
    ];
  }

  markAsNew() {
    this._isNew = true;
  }

  isNew() {
    return this._isNew;
  }
}

export class ReportItemTerm extends ReportItem {
  term: string;
  term_definition: string;
}

export class ReportItemGoal extends ReportItem {
  goal: string;
  goal_result: string = '';
  goal_is_reached: boolean = false;
}

export class ReportItemQuote extends ReportItem {
  quote: string;
  quote_note: string = '';
}

export class ReportItemQuestion extends ReportItem {
  question: string;
}

export class ReportItemResume extends ReportItem {
  resume: string;
}

export class ReportItemReference extends ReportItem {
  reference: string;
}

export class ReportItemInformationEvaluation extends ReportItem {
  information_evaluation: string;
}

export class ReportItemReview extends ReportItem {
  review: string;
}

export class ReportItemRating extends ReportItem {
  rating: number;
}

export class ReportItemForwardResearch extends ReportItem {
  forward_research: number;
}
