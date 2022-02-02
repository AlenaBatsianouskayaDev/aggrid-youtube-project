import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IVideosState } from "./videos.reducers";

const getFeature = createFeatureSelector<IVideosState>('videos');

export const getVideosData = createSelector(
  getFeature, (state: IVideosState) => state.videosData
)