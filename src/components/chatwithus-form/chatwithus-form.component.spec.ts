import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatwithusFormComponent } from './chatwithus-form.component';

describe('ChatwithusFormComponent', () => {
  let component: ChatwithusFormComponent;
  let fixture: ComponentFixture<ChatwithusFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatwithusFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatwithusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});