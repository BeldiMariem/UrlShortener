import axios from "axios";
import * as urlService from "./urlService";
import { ICreateUrlPayload } from "../../../domain/models/Url";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("urlService", () => {
  const token = "test-token";
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new short URL", async () => {
    const payload: ICreateUrlPayload = {
      longUrl: "https://test.com",
      title: "my-link",
      userId: "123456",
    };

    const mockResponse = {
      data: {
        shortId: "my-link",
        longUrl: payload.longUrl,
        createdAt: new Date().toISOString(),
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const response = await urlService.createUrl(payload, token);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:5000/url/createUrl",
      payload,
      headers
    );

    expect(response.data).toEqual(mockResponse.data);
  });

  it("should fetch user URLs", async () => {
    const mockUrls = [
      {
        shortId: "test",
        longUrl: "https://test.com",
      },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockUrls });

    const response = await urlService.getUserUrls(token);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:5000/url/listUrls",
      headers
    );

    expect(response.data).toEqual(mockUrls);
  });

  it("should delete a short URL", async () => {
    const shortId = "test";

    mockedAxios.delete.mockResolvedValue({ data: { message: "URL deleted" } });

    const response = await urlService.deleteUrl(shortId, token);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      `http://localhost:5000/url/deleteUrl/${shortId}`,
      headers
    );

    expect(response.data).toEqual({ message: "URL deleted" });
  });
});
