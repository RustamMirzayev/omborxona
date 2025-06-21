import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [FormsModule, NgFor, NgIf, RouterModule],
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
      title: 'Disk',
      price: 199.99,
      image: 'images/img1.png',
    },
    {
      title: 'Arra',
      price: 49.99,
     image: 'images/img2.png',
    },
    {
      title: "Bolg'a",
      price: 89.99,
      image: 'images/img3.png',
    },
    {
      title: 'Kusachki',
      price: 69.99,
      image: 'images/img4.png',
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
