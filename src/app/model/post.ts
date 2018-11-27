
export class Post {
    public date: number;
    public loveIts: number;

    constructor(
        public title: string,
        public content: string
    ) {
        this.date = new Date().getTime();
        this.loveIts = 0;
    }
}
