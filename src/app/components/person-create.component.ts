import {Component} from "@angular/core";
import {ContactService} from "../services";
import {Router} from "@angular/router";

@Component({
  selector: "person-create",
  templateUrl: "./person-form.html",
})
export class PersonCreateComponent {
  public mode: string = "Create";
  public person: any = {};

  constructor(
    public contacts: ContactService,
    public router:Router
  ) {}

  save() {
    console.log("createContact");
    this.contacts
      .createContact(this.person)
      .subscribe(() => this.router.navigate([""]));
  }
}
