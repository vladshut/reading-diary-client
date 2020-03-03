import {ucFirst} from "@app/shared/helpers/functions.helper";
import {toTitleCase} from "codelyzer/util/utils";
import {Constructor} from "@app/mixins/Constructor";

export enum ReportItemType {
  GOAL = 'goal',
  TERM = 'term',
  QUOTE = 'quote',
  REFERENCE = 'reference',
  RESUME = 'resume',
  INFORMATION_EVALUATION = 'information_evaluation',
  QUESTION = 'question',
  FORWARD_RESEARCH = 'forward_research',
  REVIEW = 'review',
  RATING = 'rating',
}

export class ReportItem {
  id: string;
  book_section_id: string;
  order: number;
  type: ReportItemType;
  private _needUpdate: boolean = false;
  private _deleted: boolean = false;
  private _isNew: boolean = false;
  private visibility: boolean = true;

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

  static getTypesWithInfo(): {name: string, icon: string, type: ReportItemType}[] {
    return ReportItem.getTypes().map(t => ({
      type: t,
      name: ReportItem.getNameFromType(t),
      pluralName: ReportItem.getPluralNameFromType(t),
      icon: ReportItem.getIconForType(t),
    }));
  }

  private static getNameFromType(type: ReportItemType) {
    let name = type.toString();
    name = name.replace(/_/g, ' ');

    return toTitleCase(name);
  }

  private static getPluralNameFromType(type: ReportItemType) {
    const singular = this.getNameFromType(type);
    const map = [
      {singular: 'Forward Research', plural: 'Forward Researches'}
    ];

    const mapItem = map.find(i => i.singular === singular);

    return mapItem ? mapItem.plural : singular + 's';
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

  private static getIconForType(t: ReportItemType) {
    return [
      {icon: 'fas fa-list-ul', type: ReportItemType.TERM},
      {icon: 'fas fa-bullseye', type: ReportItemType.GOAL},
      {icon: 'fas fa-quote-right', type: ReportItemType.QUOTE},
      {icon: 'far fa-question-circle', type: ReportItemType.QUESTION},
      {icon: 'far fa-file', type: ReportItemType.RESUME},
      {icon: 'fas fa-link', type: ReportItemType.REFERENCE},
      {icon: 'fas fa-info-circle', type: ReportItemType.INFORMATION_EVALUATION},
      {icon: 'far fa-comment', type: ReportItemType.REVIEW},
      {icon: 'far fa-star', type: ReportItemType.RATING},
      {icon: 'fas fa-flask', type: ReportItemType.FORWARD_RESEARCH},
    ].find(i => i.type === t).icon;
  }


  get asFormattedString() {
    return '';
  }

  switchPrivacy() {
    this.visibility = !this.visibility;
    this.markAsNeedUpdate();
  }

  isPublic() {
    return this.visibility === true;
  }

  isPrivate() {
    return this.visibility === false;
  }

  makePrivate(): void {
    if (this.visibility === true) {
      this.visibility = false;
      this.markAsNeedUpdate();
    }
  }

  makePublic(): void {
    if (this.visibility === false) {
      this.visibility = true;
      this.markAsNeedUpdate()
    }
  }
}

export class ReportItemTerm extends ReportItem {
  term: string = '';
  term_definition: string = '';

  get asFormattedString() {
    return this.term + ' - ' + this.term_definition;
  }
}

export class ReportItemGoal extends ReportItem {
  goal: string = '';
  goal_result: string = '';
  goal_is_reached: boolean = false;


  get asFormattedString() {
    return this.goal + '\nSolution: ' + (this.goal_result ? this.goal_result : '-');
  }
}

export class ReportItemQuote extends ReportItem {
  quote: string = '';
  quote_note: string = '';

  get asFormattedString() {
    return this.quote + '\nNote: ' + (this.quote_note ? this.quote_note : '-');
  }
}

export class ReportItemQuestion extends ReportItem {
  question: string = '';

  get asFormattedString() {
    return this.question;
  }
}

export class ReportItemResume extends ReportItem {
  resume: string = '';

  get asFormattedString() {
    return this.resume;
  }
}

export class ReportItemReference extends ReportItem {
  reference: string = '';

  get asFormattedString() {
    return this.reference;
  }
}

export class ReportItemInformationEvaluation extends ReportItem {
  information_evaluation: string = '';

  get asFormattedString() {
    return this.information_evaluation;
  }
}

export class ReportItemReview extends ReportItem {
  review: string = '';

  get asFormattedString() {
    return this.review;
  }
}

export class ReportItemRating extends ReportItem {
  rating: number;

  get asFormattedString() {
    return '' + this.rating;
  }
}

export class ReportItemForwardResearch extends ReportItem {
  forward_research: string = '';

  get asFormattedString() {
    return this.forward_research;
  }
}
