import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';
import { BaseService } from '@app/core/services/base.service';
import { catchError, map } from 'rxjs/operators';
import { UploadedFile } from '@app/models/uploaded-file';

@Injectable()
export class FileService extends BaseService {
    protected apiUrl = `file`;

    upload(files: File[]): Observable<any[]> {
        const requests = [];
        
        files.forEach(f => {
            const formData = new FormData();
            formData.append(`file`, f);
    
            const request = this.http.post<IdResponse>(`${this.getUrl()}`, formData).pipe(map(r => {
                const uploadedFile = new UploadedFile(f);
                uploadedFile.id = r.id;
                
                return uploadedFile;
            }))
              .pipe(catchError(value => of(new UploadedFile(f))));
            requests.push(request);
        });
        
        return forkJoin(requests);
    }
}
