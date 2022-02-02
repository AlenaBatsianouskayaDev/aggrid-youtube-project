// export interface IVideosDataResponse {
//   [propName: string]: string | object | object []
// }

export interface IVideosData {
  [propName: string]: string | object | object [] | undefined,
  etag: string,
  items: object [],
  kind: string,
  nextPageToken: string,
  pageInfo: {
    totalResults: number, 
    resultsPerPage: number
  }
  regionCode: string,
}
