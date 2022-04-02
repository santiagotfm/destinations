import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from './trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  closeResult = '';

  tripsForm: FormGroup;

  idUpdate: string;
  editMode: boolean;


  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private tripService: TripService
  ) { }

  trips = { data: [] }

  ngOnInit(): void {
    this.idUpdate = "";
    this.editMode = false;
  
    
    this.tripsForm = this.fb.group({
      city: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripService.getTrips().subscribe(resp => {
      this.trips.data = resp.map((e: any) => {
        return {
          city: e.payload.doc.data().city,
          country: e.payload.doc.data().country,
          description: e.payload.doc.data().description,
          id: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error);
      }
    );
  }


  delete(trip: any): void {
    this.tripService.deleteTrip(trip.id);
  }

  storeTrip(): void {
    this.tripService.createTrip(this.tripsForm.value).then(resp => {
      this.tripsForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error)
    })
  }

  updateTrip() {
    if (this.idUpdate!==null) {
      this.tripService.updateTrip(this.idUpdate, this.tripsForm.value).then(resp => {
        this.tripsForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.error(error);
      });
    }
  }


  openUpdate(content, trip: any) {

    this.tripsForm.setValue({
      city: trip.city,
      country: trip.country,
      description: trip.description,
    });
    this.idUpdate = trip.id;
    this.editMode = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.editMode = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
