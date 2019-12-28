import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Attachment } from '@app/models/attachment';
import { FileService } from '@app/core/services/file.service';
import { UploadedFile } from '@app/models/uploaded-file';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-control-file',
  templateUrl: './control-file.component.html',
  styleUrls: ['./control-file.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ControlFileComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlFileComponent implements OnInit, ControlValueAccessor {
  @Input() control: FormControl;
  @Input() form: FormGroup;
  @Input() label;
  @Input() id = '';
  @Input() class = '';
  @Input() name = '';
  @Input() attachments: Attachment[] = [];
  @Input() multiple = true;
  @Input() allowedTypes = [];

  @ViewChild('uploadFile', {static: false}) uploadFileEl: ElementRef;

  loading = 0;
  files: UploadedFile[] = [];
  onChangeFn;
  onTouchedFn;
  isDisabled = false;

  constructor(
    private fileService: FileService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
  }

  onChange() {
    const rawFiles = this.uploadFileEl.nativeElement.files;
    const filesArr = (<File[]>Array.from(rawFiles)).filter(f => this.isFileTypeValid(f));

    if (filesArr.length === 0) {
      return;
    }


    this.requestStarted();
    this.fileService.upload(filesArr).pipe(finalize(() => this.requestFinished()))
      .subscribe(files => {
        console.log('here');
        this.files.push(...files);
        this.uploadFileEl.nativeElement.value = null;
        this.emitChange();
      });
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: { files?: File[], attachments?: Attachment[] }): void {
    value = value || {};

    if (this.uploadFileEl) {
      this.uploadFileEl.nativeElement.value = null;
    }

    this.files = [];
    this.attachments = value.attachments || [];
  }

  onRemove(obj: Attachment | UploadedFile) {
    if (obj instanceof Attachment) {
      const index = this.attachments.indexOf(obj);
      this.attachments.splice(index, 1);
    } else if (obj instanceof UploadedFile) {
      const index = this.files.indexOf(obj);
      this.files.splice(index, 1);
    }

    this.emitChange();
  }


  private combineValue() {
    if (this.files.length === 0 && this.attachments.length === 0) {
      return null;
    }

    return {files: this.files, attachments: this.attachments};
  }

  private emitChange() {
    const value = this.combineValue();

    this.onTouchedFn(value);
    this.onChangeFn(value);
    this.cdr.detectChanges();
  }

  private requestStarted() {
    this.loading ++;
    this.cdr.detectChanges();
  }

  private requestFinished() {
    this.loading --;
    this.cdr.detectChanges();
  }

  private isFileTypeValid(file: File): boolean {
    if (this.allowedTypes.length === 0) {
      return true;
    }

    return this.allowedTypes.includes(file['type']);
  }
}
