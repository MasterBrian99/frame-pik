export type CollectionListResponseType = {
  id: number;
  name: string;
  description: string;
  albumCount: number;
  views: number;
  thumbnailAvaliable: boolean;
  thumbnailPath: string | null;
};

export type CollectionResponseType = {
  id: number;
  name: string;
  description: string;
  albumCount: number;
  views: number;
  thumbnailAvaliable: boolean;
  thumbnailPath: string;
};

export type CollectionRequestUpdateType = {
  id: number;
  name: string;
  description: string;
};
