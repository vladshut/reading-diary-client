import { Pipe, PipeTransform } from '@angular/core';
import { DictionaryService } from '@app/core/services/dictionary.service';

@Pipe({
  name: 'dict'
})
export class DictPipe implements PipeTransform {

  constructor(
    private dictService: DictionaryService,
  ) {}

  transform(alias: string, dictName: string): string {
    return this.dictService.findByAlias(dictName, alias).name;
  }
}
