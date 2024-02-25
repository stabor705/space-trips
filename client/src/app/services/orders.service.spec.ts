import { TestBed } from '@angular/core/testing';

import { OrdersApiService } from './orders-api.service';

describe('OrdersService', () => {
  let service: OrdersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
