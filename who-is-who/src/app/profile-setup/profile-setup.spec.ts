import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileSetupComponent } from './profile-setup'; // Hier auf ...Component geändert

describe('ProfileSetupComponent', () => {
  let component: ProfileSetupComponent;
  let fixture: ComponentFixture<ProfileSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSetupComponent], // Auch hier angepasst
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSetupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
