import { HttpErrorResponse } from "@angular/common/http";
import {Observable} from "rxjs";

export interface Result<T> {

  data?: T;
  error?: HttpErrorResponse;

}

export type Response<T> = Observable<Result<T>>;
