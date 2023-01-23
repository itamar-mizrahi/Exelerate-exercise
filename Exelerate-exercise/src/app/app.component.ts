import { Component, OnInit } from '@angular/core';
import Data from './data.json';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
interface Data {
  id: Number;
  name: String;
  amount: Number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'Exelerate-exercise';
  Data = Data.sort((a, b) => b.amount - a.amount);
  data: Data[] = Data;
  totalMoney: Number = 0;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  showToaster() {
    this.http.get<any>('https://api.npms.io/v2/invalid-url').subscribe({
      next: (data) => {
        this.totalMoney = data.total;
      },
      error: (error) => {
        this.toastr.error(`error: ${error.status}`, 'Failed');
        console.error('There was an error!', error);
      },
    });
  }

  getRandomNumber() {
    this.http
      .get<any>('http://www.randomnumberapi.com/api/v1.0/randomnumber')
      .subscribe((data) => {
        this.totalMoney = data * 1000000;
        this.toastr.success('Updated', 'Successed', {
          // toastClass: 'toast-top-center',
          timeOut: 1000,
        });
      });
  }

  ngOnInit() {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-center';
    setInterval(() => {
      this.getRandomNumber();
    }, 3000);

    // this.http.get<any>('https://api.npms.io/v2/invalid-url').subscribe({
    //     next: data => {
    //         this.totalAngularPackages = data.total;
    //     },
    //     error: error => {
    //         console.error('There was an error!', error);

    //     }
    // })
  }
}
