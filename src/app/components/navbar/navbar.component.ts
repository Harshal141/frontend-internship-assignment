import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) { }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  formData = {
    name: '',
    // Add more properties for other form controls
  };

  onSubmit() {
    // Handle the form submission logic
    console.log(this.formData.name); // Example: Log the form data to the console
    // redirect to the search results page
    this.router.navigate(['/search-result/' + this.formData.name]);
  }


}
