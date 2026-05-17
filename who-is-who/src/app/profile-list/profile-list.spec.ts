import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileListComponent } from './profile-list'; // Name korrigiert
import { Firestore } from '@angular/fire/firestore'; // Import für den Datenbank-Dummy

describe('ProfileListComponent', () => {
  let component: ProfileListComponent;
  let fixture: ComponentFixture<ProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileListComponent],
      providers: [
        { provide: Firestore, useValue: {} } // Liefert einen Dummy, damit der Test nicht abstürzt
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
