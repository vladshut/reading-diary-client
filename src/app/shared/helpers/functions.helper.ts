import { HttpParams } from '@angular/common/http';
import { TransformationType } from 'class-transformer/TransformOperationExecutor';
import { Moment } from 'moment';
import * as moment from 'moment';
import uuidv4 from "uuid/v4";
import {env} from "@env/env";

export function removeFromArray(arr, ...items) {
  const a = items;
  let L = a.length, what, ax;

  while (L > 0 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }

  return arr;
}

/**
 * Creates a map with the data grouped by the user choice of grouping index
 *
 * @param originalArray the original array passed via parameter
 * @param groupBy  the index of the column to group the data by
 */
export function groupArrayBy(originalArray: any, groupBy: any) {
  // create a map to hold groups with their corresponding results
  const map = new Map();

  originalArray.forEach((item: any) => {
    let keys = item[groupBy];

    if (!isArray(keys)) {
      keys = [keys];
    }

    keys.forEach((key: any) => {
      if (!map.has(key)) {
        map.set(key, [item]);
      } else {
        map.get(key).push(item);
      }
    });
  });

  const addGroup = (key: any, value: any) => {
    return {key, value};
  };

  // convert map back to a simple array of objects
  return Array.from(map, x => addGroup(x[0], x[1]));
}

export function filterItems(value: string, filterFields: Array<string|((val: string, item: any) => boolean)>, items: Array<any>) {
  value = value.toLowerCase();

  return items.filter(function (item) {
    const matchedField = filterFields.find((field: (string|((val: string, item: any) => boolean)), index: number) => {
      if (typeof field !== 'string') {
        return field(value, item);
      }

      if (item[field]) {
        return item[field].toLowerCase().indexOf(value) !== -1;
      }

      return false;
    });

    return matchedField !== undefined;
  });
}

export function toHttpParams(data: {[key: string]: any}): HttpParams {
  return appendToHttpParams(new HttpParams(), data);
}

export function appendToHttpParams(params: HttpParams, data: {[key: string]: any}): HttpParams {
  Object.entries(data).forEach(([key, value]) => {
  if (isArray(value)) {
      value.forEach((item) => {
        params = params.append(`${key}[]`, item);
      });
    } else {
        params = params.append(key, value);
    }
  });

  return params;
}

export function momentcmp(a: Moment, b: Moment): number {
  return (a < b ? -1 : (a > b ? 1 : 0));
}

export function strcmp(a: string, b: string): number {
  a = a.toLowerCase();
  b = b.toLowerCase();
  return (a < b ? -1 : (a > b ? 1 : 0));
}

export function numcmp(a: number, b: number): number {
  return (a < b ? -1 : (a > b ? 1 : 0));
}

export function momentTransform(value, obj, type): any {
  const stringFormat = 'YYYY-M-D h:mm:ss';

  if (type === TransformationType.PLAIN_TO_CLASS) {
    return value ? moment(value, stringFormat) : null;
  }

  if (type === TransformationType.CLASS_TO_PLAIN) {
    return (value && value._isAMomentObject) ? (<Moment>value).format(stringFormat) : null;
  }

  return value;
}

export function checkMaximumFileSize(files: FileList | File[], maxFileSize: number) {
  for (let i = 0; i < files.length; i ++) {
    if (files[i].size > maxFileSize) {
      return false;
    }
  }

  return true;
}

export function truncateMiddle (str: string, frontLen: number, backLen?: number, truncateStr: string = '&hellip;') {
  const strLen = str.length;

  if (!backLen) {
    backLen = frontLen;
  }

  if (frontLen === 0 && backLen === 0 || frontLen >= strLen || backLen >= strLen || (frontLen + backLen) >= strLen) {
    return str;
  }

  return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen);
}

declare global {
  interface Number {
    mod(n: number): number;
  }
}

Number.prototype.mod = function (n: number): number {
  return ((this % n) + n) % n;
};

declare global {
  interface String {
    trimCharsLeft(charList: string): string;
    trimCharsRight(charList: string): string;
    trimChars(charList: string): string;
  }
}

String.prototype.trimCharsLeft = function(charList: string = '\s'): string {
  return this.replace(new RegExp('^[' + charList + ']+'), '');
};

String.prototype.trimCharsRight = function(charList: string = '\s'): string {
  return this.replace(new RegExp('[' + charList + ']+$'), '');
};

String.prototype.trimChars = function(charList: string = '\s'): string {
  return this.trimCharsLeft(charList).trimCharsRight(charList);
};

export function ucFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function isUndefined(value) {
  return value === undefined;
}

function isNull(value) {
  return value === null;
}

function isObject(value) {
  return value === Object(value);
}

function isArray(value) {
  return Array.isArray(value);
}

function isDate(value) {
  return value instanceof Date;
}

function isBlob(value) {
  return (
    value &&
    typeof value.size === 'number' &&
    typeof value.type === 'string' &&
    typeof value.slice === 'function'
  );
}

function isFile(value) {
  return (
    isBlob(value) &&
    (typeof value.lastModifiedDate === 'object' ||
      typeof value.lastModified === 'number') &&
    typeof value.name === 'string'
  );
}

function isFormData(value) {
  return value instanceof FormData;
}

export function objectToFormData(obj, cfg?, fd?, pre?) {
  if (isFormData(cfg)) {
    pre = fd;
    fd = cfg;
    cfg = null;
  }

  cfg = cfg || {};
  cfg.indices = isUndefined(cfg.indices) ? false : cfg.indices;
  cfg.nulls = isUndefined(cfg.nulls) ? true : cfg.nulls;
  fd = fd || new FormData();

  if (isUndefined(obj)) {
    return fd;
  } else if (isNull(obj)) {
    if (cfg.nulls) {
      fd.append(pre, '');
    }
  } else if (isArray(obj)) {
    if (!obj.length) {
      const key = pre + '[]';

      fd.append(key, '');
    } else {
      obj.forEach(function(value, index) {
        const key = pre + '[' + (cfg.indices ? index : '') + ']';

        objectToFormData(value, cfg, fd, key);
      });
    }
  } else if (isDate(obj)) {
    fd.append(pre, obj.toISOString());
  } else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
    Object.keys(obj).forEach(function(prop) {
      const value = obj[prop];

      if (isArray(value)) {
        while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
          prop = prop.substring(0, prop.length - 2);
        }
      }

      const key = pre ? pre + '[' + prop + ']' : prop;

      objectToFormData(value, cfg, fd, key);
    });
  } else {
    fd.append(pre, obj);
  }

  return fd;
}

export function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

export function createDataTree(dataset) {
  let hashTable = Object.create(null);
  let dataTree = [];

  dataset.forEach( aData => hashTable[aData.id] = aData );

  dataset.forEach( aData => {
    if (aData.parent_id) {
      hashTable[aData.parent_id].children.push(hashTable[aData.id]);
    } else {
      dataTree.push(hashTable[aData.id])
    }
  } );

  return dataTree
}

export function toTitleCase(str: string): string {
  return str.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

export function copyToClipboard(text: string): void {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = text;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
}

export function contains(a, b){
  return a.contains ?
    a != b && a.contains(b) :
    !!(a.compareDocumentPosition(b) & 16);
}

export function uuid4 () {
  return uuidv4();
}

export function getInputValueByName(name: string) {
  const inputs = document.getElementsByName(name);

  if (inputs.length != 1) {
    return;
  }

  const input = inputs[0];
  const value = input.getAttribute('value');

  if (!value) {
    return;
  }

  return value;
}

export function getFilepondOptions(options) {
  const defaultOptions = {
    name: 'filepond',
    class: 'my-filepond',
    maxFileSize: '1MB',
    multiple: true,
    labelIdle: 'Drop files here',
    server: {
      url: `${env.apiHost}/api/files`,
      process: '/process',
      revert: '/process',
    },
  };

  return {...defaultOptions, ...options};
}
