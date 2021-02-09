import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-add-room-second-page',
  templateUrl: './add-room-second-page.component.html',
  styleUrls: ['./add-room-second-page.component.scss'],
})
export class AddRoomSecondPageComponent implements OnInit {
  cities!: any;
  addRoomForm!: FormGroup;
  homeTypes = ['Entire place', 'Private room', 'Shared room'];
  amenities = [
    'Kitchen',
    'Shampoo',
    'Heating',
    'Air conditioning',
    'Washer',
    'Dryer',
    'Wifi',
    'Breakfast',
    'Indoor fireplace',
    'Buzzer/wireless intercom',
    'Doorman',
    'Hangers',
    'Iron',
    'Hair dryer',
    'Laptop friendly workspace',
  ];
  imageSrc!: string;

  constructor(private locationService: LocationService) {
    this.locationService.getLocations().subscribe((cities) => {
      this.cities = [...cities];
    });
  }

  ngOnInit(): void {
    this.addRoomForm = new FormGroup({
      propertyName: new FormControl('', Validators.required),
      homeType: new FormControl(this.homeTypes[0], Validators.required),
      city: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      availability: new FormControl('', Validators.required),
      neighbourhood: new FormControl('', Validators.required),
      beds: new FormControl('1', Validators.required),
      bedrooms: new FormControl('1', Validators.required),
      bathrooms: new FormControl('1', Validators.required),
      amenities: new FormControl('', Validators.required),
      photos: new FormControl(this.imageSrc, Validators.required),
    });
  }

  decrease(input: any) {
    if (+input.value > 0) {
      +input.value--;
    }
  }

  increase(input: any) {
    +input.value++;
  }

  onImagePicked(event: any) {
    const file = event.target.files[0];
    this.addRoomForm.patchValue({ photos: file });
    this.addRoomForm?.get('photos')?.updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  formSubmit() {
    this.addRoomForm.get('amenities')?.value;
    console.log(this.addRoomForm.value);
  }
}
