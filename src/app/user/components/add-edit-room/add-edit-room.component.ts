import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Amenity } from 'src/app/core/interfaces/amenity.interface';
import { LocationService } from 'src/app/core/services/location.service';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-edit-room',
  templateUrl: './add-edit-room.component.html',
  styleUrls: ['./add-edit-room.component.scss'],
})
export class AddEditRoomComponent implements OnInit {
  @Input() set isEditing(value: boolean) {
    this._isEditing = value;
    if (this._isEditing) {
      const id = this.route.snapshot.paramMap.get('roomId');

      this.roomService.getRoom(String(id)).subscribe((room) => {
        this.addRoomForm.patchValue(room);
        this.fillAmenitiesCheckboxesOnEdit(room.amenities);
        room.photos.forEach((photo) => {
          this.convertBase64ToArrayBuffer(photo, this.files);
        });

        this.convertBase64ToArrayBuffer(room.thumbnail, this.thumbnailFiles);
      });
    }
  }
  locations!: any;
  addRoomForm!: FormGroup;
  _isEditing!: boolean;
  files: File[] = [];
  thumbnailFiles: File[] = [];
  defaultAmenities: Amenity[] = [...this.roomService.amenities];

  constructor(
    private locationService: LocationService,
    public roomService: RoomService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.locationService.getLocations().subscribe((locations) => {
      this.locations = [...locations];
      if (!this._isEditing) {
        this.addRoomForm.patchValue({ address: this.locations[0].name });
      }
    });
  }

  ngOnInit(): void {
    this.addRoomForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      intro: ['', Validators.required],
      amenities: new FormArray(
        [],
        [this.minSelectedCheckboxes(1), Validators.required]
      ),
      description: ['', Validators.required],
      interactionWithGuests: ['', Validators.required],
      price: [null, Validators.required],
      thumbnail: ['', Validators.required],
      photos: [[]],
    });

    if (!this._isEditing) {
      this.fillAmenitiesCheckboxesOnAdd();
    }
  }

  get amentiesFormArray() {
    return this.addRoomForm.controls.amenities as FormArray;
  }

  fillAmenitiesCheckboxesOnAdd() {
    this.roomService.amenities.forEach(() =>
      this.amentiesFormArray.push(new FormControl(false))
    );
  }

  fillAmenitiesCheckboxesOnEdit(amenitiesFromBackend: Amenity[]) {
    this.roomService.amenities.forEach((amenity) => {
      const isChecked = amenitiesFromBackend.some(
        (e) => e.name === amenity.name
      );

      this.amentiesFormArray.push(new FormControl(isChecked));
    });
  }

  onThumbnailSelect(event: any) {
    const file = event.addedFiles[0];
    const reader = new FileReader();

    this.thumbnailFiles = [file];

    reader.onload = () => {
      this.addRoomForm.patchValue({ thumbnail: reader.result as string });
      this.addRoomForm?.controls.thumbnail?.updateValueAndValidity();
    };

    reader.readAsDataURL(this.thumbnailFiles[0]);
  }

  formSubmit() {
    const selectedAmenties = this.addRoomForm.value.amenities
      .map((checkboxForAmenity: boolean, i: number) =>
        checkboxForAmenity ? this.defaultAmenities[i] : null
      )
      .filter((v: boolean | null) => v !== null);

    let foundLocation = { _id: undefined };
    Array.from(this.locations).forEach((element: any) => {
      if (element.name === this.addRoomForm.controls.address.value) {
        foundLocation = element;
      }
    });
    if (!this._isEditing) {
      const room = {
        ...this.addRoomForm.value,
        amenities: selectedAmenties,
        rating: 0,
        hostId: this.userService.currentUser$.getValue()?._id,
        locationId: foundLocation._id,
      };
      this.roomService.postRoom(room).subscribe(() => {
        this.router.navigate(['/user/room/list']);
      });
    } else {
      const id = this.route.snapshot.paramMap.get('roomId');
      const room = {
        ...this.addRoomForm.value,
        amenities: selectedAmenties,
        rating: 0,
        hostId: this.userService.currentUser$.getValue()?._id,
        locationId: foundLocation._id,
      };
      this.roomService.updateRoom(String(id), room).subscribe(() => {
        this.router.navigate(['/user/room/list']);
      });
    }
  }

  onSelect(event: any) {
    const photoResults: string[] = [];
    this.files.push(...event.addedFiles);

    this.files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        photoResults.push(String(reader.result));

        this.addRoomForm.controls.photos?.updateValueAndValidity;
      };
      reader.readAsDataURL(file);
    });
    this.addRoomForm.patchValue({ photos: photoResults });
  }

  onRemove(event: any) {
    const photoResults: string[] = [];

    this.files.splice(this.files.indexOf(event), 1);
    this.files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        photoResults.push(String(reader.result));

        this.addRoomForm.controls.photos?.updateValueAndValidity;
      };
      reader.readAsDataURL(file);
    });
    this.addRoomForm.patchValue({ photos: photoResults });
  }

  onThumbnailRemove(event: any) {
    this.thumbnailFiles.splice(this.thumbnailFiles.indexOf(event), 1);
    this.addRoomForm.patchValue({ thumbnail: '' });
  }

  convertDataURIToBinary(dataURI: string) {
    const BASE64_MARKER = ';base64,';
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  convertBase64ToArrayBuffer(photo: string, filesArray: File[]) {
    const arrayBufferFromBase64 = this.convertDataURIToBinary(photo);
    const imageAsFile = new File([arrayBufferFromBase64], `Room photo`, {
      type: 'image/png',
    });

    filesArray.push(imageAsFile);
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn | any = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);

      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }
}
