import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatwithusItemComponent } from './chatwithus-item.component';

describe('MessageItemComponent', () => {
  let component: ChatwithusItemComponent;
  let fixture: ComponentFixture<ChatwithusItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatwithusItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatwithusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
