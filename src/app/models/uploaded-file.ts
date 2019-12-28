export class UploadedFile implements File {
    id?: string;
    
    readonly lastModified: number;
    readonly name: string;
    readonly size: number;
    readonly type: string;
    
    constructor(public file: File) {
        this.lastModified = file.lastModified;
        this.name = file.name;
        this.size = file.size;
        this.type = file.type;
    }
    
    slice(start?: number, end?: number, contentType?: string): Blob {
        return this.file.slice(start, end, contentType);
    }
}
