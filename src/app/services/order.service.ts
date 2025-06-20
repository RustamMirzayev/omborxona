import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/orders';

  private ordersSubject = new BehaviorSubject<any[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadOrders(); // sahifa yuklanganda yuklash
  }

  private loadOrders(): void {
    this.http.get<any[]>(this.baseUrl).subscribe((data) => {
      this.ordersSubject.next(data);
    });
  }

  submitOrder(order: any): Observable<any> {
    return this.http.post(this.baseUrl, order).pipe(
      tap(() => this.loadOrders()) // yangi order qo‘shilganda ro‘yxatni yangilaydi
    );
  }

  getAllOrders(): Observable<any[]> {
    return this.orders$;
  }
}
