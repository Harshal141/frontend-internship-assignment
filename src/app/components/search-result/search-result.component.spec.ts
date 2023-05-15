import { ComponentFixture, TestBed } from '@angular/core/testing';
import { searchResultComponent } from './search-result.component';

describe('searchResultComponent', () => {
  let component: searchResultComponent;
  let fixture: ComponentFixture<searchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [searchResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(searchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
