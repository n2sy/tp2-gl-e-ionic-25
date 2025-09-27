export class Course {
  //   public id: number;
  //   public title: string;

  constructor(
    public id: number,
    public title: string,
    public author: string,
    public logo: string,
    public keywords: string[],
    public images?: string[]
  ) {
    // this.id = id;
    // this.title = title;
  }
}
