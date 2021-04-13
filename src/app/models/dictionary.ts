export class Dictionary {
  id: string;
  itemName?: string;
  isSelected?: boolean;

  constructor(public alias: string, public name: string = '') {
    this.id = alias;
    this.itemName = name;
  }
}
