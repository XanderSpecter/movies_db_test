interface Show {
    time: string;
    name: string;
}

export interface Channel {
    name: string;
    shows: Show[];
}
