import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {ContactService} from "../services";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: "search",
  template: `
    <form class="navbar-form navbar-left" [formGroup]="myForm">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Search name..."
          formControlName="search"
        />
      </div>

      <div class="form-group">
        <select class="form-control" formControlName="sorting">
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      <div class="form-group">
        <select class="form-control" formControlName="ordering">
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>
    </form>
  `,
})
export class SearchComponent implements OnInit {
  public myForm: FormGroup;
  constructor(private contacts: ContactService) {
    this.myForm = new FormGroup({
      search: new FormControl(),
      sorting: new FormControl("name"),
      ordering: new FormControl("ASC"),
    });
  }
  ngOnInit() {
    this.myForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), tap(console.log))
      .subscribe(({sorting, ordering, search}) => {
        this.contacts.sorting = sorting;
        this.contacts.ordering = ordering;
        this.contacts.search = search;
        this.contacts.doSearch();
      });
  }
}
