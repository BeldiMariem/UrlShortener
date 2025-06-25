export interface IUrl {
  shortId: string;
  longUrl: string;
  title?: string;
  userId: string;
  createdAt?: Date;
}

export interface ICreateUrlPayload {
  longUrl: string;
  title?: string;
  userId: string;
}


export interface IUrlRepository {
  create(url: IUrl): Promise<IUrl>;
  findByShortId(shortId: string): Promise<IUrl | null>;
  findByUserId(userId: string): Promise<IUrl[]>;
  deleteByShortId(shortId: string): Promise<void>;
}