export class BookSection {
  id: string;
  name: string;
  order: number;
  parent_id: string;
  parent: BookSection = undefined;
  children: BookSection[] = [];

  isRoot() {
    return this.parent === undefined;
  }

  isLeaf() {
    return this.children.length === 0;
  }
}
