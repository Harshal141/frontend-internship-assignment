import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'front-end-internship-assignment-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) { }

  formData = {
    name: '',
    // Add more properties for other form controls
  };

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  onSubmit() {
    // Handle the form submission logic
    console.log(this.formData.name); // Example: Log the form data to the console
    this.router.navigate(['/search-result/' + this.formData.name]);
    // redirect to the search results page
    this.formData = {
      name: '',
    };
  }


}
