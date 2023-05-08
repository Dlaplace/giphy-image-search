import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs';
import { SearchBoxComponent } from '../components/search-box/search-box.component';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private url = 'https://api.giphy.com/v1/gifs';
  private apiKey = 'cVmBrGscUZWFExp7m8FTUo19asbYjjMF';
  private responseLength = '20';

  // api.giphy.com/v1/gifs/search?api_key=cVmBrGscUZWFExp7m8FTUo19asbYjjMF&q=valorant &limit=20

  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
  }

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((t) => t !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage(this._tagHistory);
  }

  private saveLocalStorage(taghistory: string[]): void {
    localStorage.setItem('history', JSON.stringify(taghistory));
  }

  private loadLocalStorage(): void {
    this._tagHistory = JSON.parse(localStorage.getItem('history') || '[]');
    this.onLoadGifs();
  }

  private onLoadGifs(): void {
    if (this._tagHistory.length > 0) {
      this.searchTag(this._tagHistory[0]);
    }
    return;
  }

  searchTag(tag: string): void {
    if (tag.length === 0) {
      return;
    }
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', this.responseLength)
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.url}/search`, { params })
      .subscribe((response) => {
        this.gifList = response.data;
    })

    // fetch(`${this.url}?apiKey=${this.apiKey}&q=${tag}&limit=${this.responseLength}`)
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data);
    // })
  }
}
