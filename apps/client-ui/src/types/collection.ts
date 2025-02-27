export interface CollectionListResponseType {
  id: number;
  name: string;
  description: string;
  albumCount: number;
  views: number;
  thumbnailAvaliable: boolean;
  thumbnailPath: string | null;
}
