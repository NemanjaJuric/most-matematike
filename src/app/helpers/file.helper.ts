import { Subject, Observable } from "rxjs";

export class FileHelper {

    static readTextFile(file: any): Observable<string> {
        let subj: Subject<string> = new Subject<string>();
        var reader = new FileReader();
        reader.onload = () => {
            var text = reader.result as string;
            subj.next(text);
        };
        reader.readAsText(file);
        return subj.asObservable();
    }

    static readBinaryFile(file: any): Observable<ArrayBuffer> {
        let subj: Subject<ArrayBuffer> = new Subject<ArrayBuffer>();
        var reader = new FileReader();
        reader.onload = () => {
            var arrayBuffer = reader.result as ArrayBuffer;
            subj.next(arrayBuffer);
        };
        reader.readAsArrayBuffer(file);
        return subj.asObservable();
    }

}