import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchuelerDetailComponent } from './schueler-detail'; // 👈 JETZT RICHTIG: Ohne ".component" im Pfad

describe('SchuelerDetailComponent', () => {
  let component: SchuelerDetailComponent;
  let fixture: ComponentFixture<SchuelerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchuelerDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchuelerDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
