import * as fileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';
import * as contentDisposition from 'content-disposition';

/**
 * Saves a file by opening file-save-as dialog in the browser
 * using file-save library.
 * @param blobContent file content as a Blob
 * @param fileName name file should be saved as
 */
export const saveFile = (blobContent: Blob, fileName: string) => {
  const blob = new Blob([blobContent], {type: 'application/octet-stream'});
  fileSaver.saveAs(blob, fileName);
};

export const saveFileFromResponse = (res: HttpResponse<any>) => {
  const fileName = getFileNameFromResponseContentDisposition(res);
  saveFile(res.body, fileName);
};

/**
 * Derives file name from the http response
 * by looking inside content-disposition
 * @param res http Response
 */
export const getFileNameFromResponseContentDisposition = (res: HttpResponse<any>) => {
  const disposition = res.headers.get('content-disposition') || '';
  const parsedDisposition = contentDisposition.parse(disposition);
  
  return parsedDisposition.parameters.filename;
};
