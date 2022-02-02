// export interface IVideosDataResponse {
//   [propName: string]: string | object | object []
// }

export interface IVideoData {
  [propName: string]: string | object | object [] | undefined
  preview: string, 
  publishedOn: string, 
  videoTitle: string, 
  description: string
}

export interface IErrorData {
  error: string,
}