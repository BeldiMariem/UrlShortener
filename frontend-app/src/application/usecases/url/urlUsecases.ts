import { ICreateUrlPayload } from "../../../domain/models/Url";
import * as urlService from "../../../infrastructure/services/urlService";

export const createUrlUsecase = async (data: ICreateUrlPayload, token: string) => {
  const response = await urlService.createUrl(data, token);
  return response.data;
};

export const listUrlsUsecase = async (token: string) => {
  const response = await urlService.getUserUrls(token);
  return response.data;
};

export const deleteUrlUsecase = async (shortId: string, token: string) => {
  await urlService.deleteUrl(shortId, token);
};
