import { HttpErrorResponse } from "@angular/common/http";

export interface Result<T> {

  data?: T;
  error?: HttpErrorResponse;

}
