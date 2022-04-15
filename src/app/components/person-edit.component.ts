import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactService} from "../services";

@Component({
  selector: "person-edit", // <person-edit>
  templateUrl: "./person-form.html"
})
export class PersonEditComponent {
  public mode: string = "Edit";
  public person: any = <any>{};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public contacts: ContactService
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      if ("email" in params) this.person = this.contacts.getPerson(params.email);
    });
  }

  save() {
    this.contacts
      .updateContact(this.person)
      .subscribe(() => this.router.navigate([""]));
  }

  remove() {
    this.contacts
      .removeContact(this.person)
      .subscribe(() => this.router.navigate([""]));
  }
}
