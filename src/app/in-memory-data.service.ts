import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Izuku Midoriya' },
      { id: 12, name: 'Katsuki Bakugou' },
      { id: 13, name: 'Shouto Todoroki' },
      { id: 14, name: 'Ochako Uraraka' },
      { id: 15, name: 'Tsuyu Asui' },
      { id: 16, name: 'Tenya Iida' },
      { id: 17, name: 'Momo Yaoyorozu' },
      { id: 18, name: 'Fumikage Tokoyami' },
      { id: 19, name: 'Toshinori Yagi' },
      { id: 20, name: 'Shota Aizawa' }
    ];
    return {heroes};
  }
}