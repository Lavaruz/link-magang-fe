import { Injectable } from '@angular/core';
import moment from 'moment';
import 'moment/locale/id';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatDateMonth(inputDate:any) {
      // Parse tanggal dalam format "YYYY-MM-DD"
      const dateParts = inputDate.split('-');
      const year = dateParts[0];
      const month = dateParts[1];

      // Daftar nama bulan
      const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
          'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
      ];

      // Konversi komponen bulan ke nama bulan
      const formattedMonth = monthNames[parseInt(month, 10) - 1];

      // Gabungkan komponen-komponen dalam format yang diinginkan
      const formattedDate = `${formattedMonth} ${year}`;

      return formattedDate;
  }

  formatIndonesianDateFull(date:any){
    moment.locale('id');  // Atur locale ke Indonesia
    const formattedDate = moment(date).format('D MMMM YYYY');
    return formattedDate;  // Output: '8 September 2024'
  }

  calculateMonthDifference(startDate:any, endDate:any) {
      let start = new Date(startDate);
      let end = new Date(endDate);

      let yearDiff = end.getFullYear() - start.getFullYear();
      let monthDiff = end.getMonth() - start.getMonth();

      if (monthDiff < 0) {
          yearDiff -= 1;
          monthDiff += 12;
      }

      if (yearDiff === 0) {
          return `${monthDiff} Bulan`;
      } else if (yearDiff === 1) {
          return `1 Tahun ${monthDiff} Bulan`;
      } else {
          return `${yearDiff} Tahun ${monthDiff} Bulan`;
      }
  }

  getFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Dapat ditambahkan 1 karena bulan dimulai dari 0.
      const day = String(today.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
  }
}
