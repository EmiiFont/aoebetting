import axios, { AxiosInstance } from "axios";

export class HttpWrapper {
  private _httpClient: AxiosInstance;

  constructor(baseUrl: string) {
    this._httpClient = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get(url: string) {
    const data = await this._httpClient.get(url);
    return data.data;
  }
}
