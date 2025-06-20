import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-products',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private orderService = inject(OrderService);

  searchTerm: string = '';
  cart: any[] = [];
  showCart = false;
  showOrderModal = false;

  userInfo = {
    name: '',
    phone: '',
    comment: '',
  };

  products = [
    {
      title: 'Smart Watch',
      price: 199.99,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    },
    {
      title: 'Backpack',
      price: 49.99,
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    },
    {
      title: 'Headphones',
      price: 89.99,
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    },
    {
      title: 'Running Shoes',
      price: 69.99,
      image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
    },
  ];

  filteredProducts() {
    if (!this.searchTerm.trim()) return this.products;
    return this.products.filter((p) =>
      p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addToCart(product: any) {
    this.cart.push(product);
  }

  submitCart() {
    this.showCart = false;
    this.showOrderModal = true;
  }

  finalSubmit() {
    const orderData = {
      products: this.cart,
      user: this.userInfo,
      date: new Date().toISOString()
    };

    console.log('✅ Buyurtma yuborildi:', orderData);
    this.cart = [];
    this.userInfo = { name: '', phone: '', comment: '' };
    this.showOrderModal = false;
    alert('Buyurtma muvaffaqiyatli qabul qilindi!');

    this.orderService.submitOrder(orderData).subscribe({
      next: () => {
        alert('✅ Buyurtma serverga muvaffaqiyatli yuborildi!');
        this.cart = [];
        this.userInfo = { name: '', phone: '', comment: '' };
        this.showOrderModal = false;
      },
      error: () => {
        alert('❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.');
      }
    });
  }

}
