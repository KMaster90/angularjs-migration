import {tap} from "rxjs/operators";
import {Contact} from "./contact.resource";
import { Injectable} from "@angular/core";
import { ToastrService} from "ngx-toastr";

@Injectable()
export class ContactService {
  private page = 1;
  private hasMore = true;
  public isLoading = false;
  public isSaving = false;
  public isDeleting = false;
  private selectedPerson = null;
  public persons = [];

  public search = "";
  public sorting = "name";
  public ordering = "ASC";

  constructor(
    private contact: Contact,
    private toastr: ToastrService
  ) {
    this.loadContacts();
  }

  getPerson(email) {
    console.log(email);
    return this.persons.find(person => person.email === email);
  }

  doSearch() {
    this.hasMore = true;
    this.page = 1;
    this.persons = [];
    this.loadContacts();
  }

  doOrder() {
    this.hasMore = true;
    this.page = 1;
    this.persons = [];
    this.loadContacts();
  }

  loadContacts() {
    if (this.hasMore && !this.isLoading) {
      this.isLoading = true;

      let params = {
        _page: this.page.toString(),
        _sort: this.sorting,
        _order: this.ordering,
        q: this.search,
      };

      this.contact
        .query(params)
        .pipe(
          tap(data => {
            console.debug(data);
            data && !!data.length
              ? data.forEach(person => this.persons.push(person))
              : (this.hasMore = false);
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }

  updateContact(person) {
    this.isSaving = true;
    return this.contact.update(person).pipe(
      tap(() => (this.isSaving = false)),
      tap(() => this.toastr.success( "Updated " + person.name))
    );
  }

  removeContact(person) {
    this.isDeleting = true;
    return this.contact.remove(person).pipe(
      tap(() => (this.isDeleting = false)),
      tap(() => (this.selectedPerson = null)),
      tap(() => {
        let index = this.persons.indexOf(person);
        this.persons.splice(index, 1);
        this.toastr.success( "Deleted " + person.name);
      })
    );
  }

  createContact(person) {
    this.isSaving = true;
    return this.contact.save(person).pipe(
      tap(() => {
        this.isSaving = false;
        this.selectedPerson = null;
        this.hasMore = true;
        this.page = 1;
        this.persons = [];
        this.loadContacts();
        this.toastr.success("success", "Created " + person.name);
      })
    );
  }

  loadMore() {
    if (this.hasMore && !this.isLoading) {
      this.page += 1;
      this.loadContacts();
    }
  }
}
