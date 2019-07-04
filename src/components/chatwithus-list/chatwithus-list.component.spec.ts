import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatwithusListComponent } from './chatwithus-list.component';

describe('ChatwithusList', () => {
  let component: ChatwithusListComponent;
  let fixture: ComponentFixture<ChatwithusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatwithusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatwithusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});