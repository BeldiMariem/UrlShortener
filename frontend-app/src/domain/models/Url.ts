class Url {
  constructor({ longUrl, shortId, title, userId }: { longUrl: string; shortId: string; title?: string; userId: string }) {
    this.longUrl = longUrl;
    this.shortId = shortId;
    this.title = title;
    this.userId = userId;
  }

  longUrl: string;
  shortId: string;
  title?: string;
  userId: string;
}

export {}; 