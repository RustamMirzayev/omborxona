import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  private orderService = inject(OrderService);
  orders$ = this.orderService.orders$; 
}
