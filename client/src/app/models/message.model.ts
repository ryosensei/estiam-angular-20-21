export class MessageModel {

    from: string;
    message: string;
    date;
    isMine: boolean = false;

    /**
     * Create a new Message to send
     */
    constructor(from, message, date, isMine = false)
    {
        this.from     = from;
        this.message  = message;
        this.date     = date;
        this.isMine   = isMine;
    }
}
