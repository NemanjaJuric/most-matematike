declare var katex;

export class TaskHelper{

    static makeMathText(question: any): any {
        let text = question.text;
        for (let prop in question) {
          if (prop !== 'text') {
            let strForReplace = '${' + prop + '}';
            let strToReplace = katex.renderToString(question[prop])
            text = text.replace(strForReplace, `&nbsp;${strToReplace}`);
          }
        }
        return text;
      }

}